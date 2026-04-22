import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { askDeletion } from "@/utils/confirmation-dialog.utils";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";
import { nowUtc, parseUtc } from "@/utils/date-time.utils";
import { TaskApiFactory, TaskResponse } from "@api-server";
import { ManipulateType } from "dayjs";
import { orderBy, uniqBy } from "lodash-es";
import { computed, onMounted, Ref, ref } from "vue";

// === Utilities ===
export const toSortedByDueDate = (tasks: TaskResponse[]) =>
	orderBy(tasks, (t) => (t.dueDate ? parseUtc(t.dueDate).valueOf() : Infinity), "asc");

export const toSortedByCreatedDate = (tasks: TaskResponse[]) =>
	orderBy(tasks, (t) => parseUtc(t.createdAt).valueOf(), "desc");

export const isTaskOverdue = (t: TaskResponse) => t.dueDate && parseUtc(t.dueDate).isBefore(nowUtc());
export const isTaskUnpublished = (t: TaskResponse) => isPublished(t) && !isVisible(t);
export const isTaskDraft = (t: TaskResponse) => t.status.isDraft;

// === Task Status Predicates ===
const hasNoDueDate = (t: TaskResponse) => !t.dueDate;
const isPublished = (t: TaskResponse) => !t.status.isDraft;
const isSubstitution = (t: TaskResponse) => t.status.isSubstitutionTeacher;
const isVisible = (t: TaskResponse) => !t.lessonHidden;

const hasSubmissions = (t: TaskResponse) => t.status.submitted > 0;
const isGraded = (t: TaskResponse) => t.status.graded > 0;
const isFullyGraded = (t: TaskResponse) => t.status.graded === t.status.submitted;

// === Combined Predicates (Student) ===
const isOpenForStudent = (t: TaskResponse) => !hasSubmissions(t) && !isGraded(t) && isVisible(t);
const isSubmittedForStudent = (t: TaskResponse) => hasSubmissions(t);
const isGradedForStudent = isGraded;

// === Combined Predicates (Teacher) ===
const isGradedForTeacher = (t: TaskResponse) => hasSubmissions(t) && isFullyGraded(t);
const isUngradedForTeacher = (t: TaskResponse) => !isGradedForTeacher(t);

type DateRange = {
	from: { amount: number; unit: ManipulateType };
	to: { amount: number; unit: ManipulateType };
};

export enum DueStatus {
	Overdue = "overdue",
	NotOverdue = "not-overdue",
	NoDueDate = "no-due-date",
}
export enum GradeStatus {
	Graded = "graded",
	NotGraded = "not-graded",
}

const PAGE_SIZE = 10;

const fetchAllTasks = async (skip = 0, limit = 100, accumulated: TaskResponse[] = []): Promise<TaskResponse[]> => {
	const tasksApi = TaskApiFactory(undefined, "/v3", $axios);
	const data = await tasksApi.taskControllerFindAll(skip, limit);
	const all = [...accumulated, ...data.data.data];
	return skip + limit < data.data.total ? fetchAllTasks(skip + limit, limit, all) : all;
};

// === Main Tasks Composable ===
export const useTasks = (
	options: {
		range?: DateRange;
		fetchImmediate?: boolean;
	} = {}
) => {
	const tasksApi = TaskApiFactory(undefined, "/v3", $axios);
	const { t } = useI18nGlobal();
	const { execute: executeTasks, isRunning: isLoadingTasks, error, status } = useSafeAxiosTask();
	const { execute: executeFinished, isRunning: isLoadingFinishedTasks, error: errorFinished } = useSafeAxiosTask();

	// === Raw Data ===
	const allTasks = ref<TaskResponse[]>([]);

	// === Finished Tasks State ===
	const finishedTasks = ref<TaskResponse[]>([]);
	const finishedPage = ref(0);
	const finishedTotal = ref<number | undefined>(undefined);

	const hasMoreFinishedTasks = computed(
		() => finishedTotal.value !== undefined && finishedTasks.value.length < finishedTotal.value
	);

	// === Range Filter (stays here) ===
	const range = ref(options.range);

	const tasksFilteredByRange = computed(() => {
		const r = range.value;
		if (!r) return allTasks.value;

		const from = r.from ? nowUtc().subtract(r.from.amount, r.from.unit) : undefined;
		const to = r.to ? nowUtc().add(r.to.amount, r.to.unit) : undefined;

		return allTasks.value.filter((t) => {
			if (!t.dueDate) return true;
			const due = parseUtc(t.dueDate);
			return (!from || due.isAfter(from)) && (!to || due.isBefore(to));
		});
	});

	// === Base Categories (computed from range-filtered tasks) ===
	const drafts = computed(() => toSortedByCreatedDate(tasksFilteredByRange.value.filter(isTaskDraft)));
	const published = computed(() => tasksFilteredByRange.value.filter(isPublished));

	// === Teacher Categories ===
	const gradedForTeacher = computed(() => published.value.filter(isGradedForTeacher));
	const openForTeacher = computed(() => published.value);
	const ungradedForTeacher = computed(() => published.value.filter(isUngradedForTeacher));

	// === Student Categories ===
	const openForStudent = computed(() => published.value.filter(isOpenForStudent));
	const submittedForStudent = computed(() => published.value.filter(isSubmittedForStudent));
	const ungradedForStudent = computed(() =>
		published.value.filter((t) => isSubmittedForStudent(t) && !isGradedForStudent(t))
	);
	const gradedForStudent = computed(() => published.value.filter(isGradedForStudent));

	// === Range Setter ===
	const setRange = (newRange: DateRange) => {
		range.value = newRange;
	};

	const fetchTasks = async () => {
		const { success, result } = await executeTasks(fetchAllTasks);
		if (success) allTasks.value = toSortedByDueDate(result);
	};

	const fetchFinishedTasks = async () => {
		const limit = PAGE_SIZE * Math.max(finishedPage.value, 1);

		const { success, result } = await executeFinished(
			() => tasksApi.taskControllerFindAllFinished(0, limit),
			t("common.notifications.errors.notLoaded", {
				type: t("common.words.tasks"),
			})
		);

		if (success && result) {
			finishedTasks.value = result.data.data;
			finishedTotal.value = result.data.total;
		}
	};

	const loadMoreFinishedTasks = async () => {
		const isUninitialized = finishedTotal.value === undefined;

		if (!isUninitialized && !hasMoreFinishedTasks.value) return;

		const nextPage = isUninitialized ? 0 : finishedPage.value + 1;
		const skip = nextPage * PAGE_SIZE;

		const { success, result } = await executeFinished(
			() => {
				const tasksApi = TaskApiFactory(undefined, "/v3", $axios);
				return tasksApi.taskControllerFindAllFinished(skip, PAGE_SIZE);
			},
			t("common.notifications.errors.notLoaded", { type: t("common.words.tasks") })
		);

		if (success && result) {
			finishedTasks.value = isUninitialized ? result.data.data : [...finishedTasks.value, ...result.data.data];
			finishedTotal.value = result.data.total;
			finishedPage.value = nextPage;
		}
	};

	if (options.fetchImmediate !== false) {
		onMounted(fetchTasks);
	}

	return {
		// Raw Data
		allTasks,
		tasks: tasksFilteredByRange,

		// Base Categories
		drafts,
		published,

		// Teacher Categories
		openForTeacher,
		gradedForTeacher,
		ungradedForTeacher,

		// Student Categories
		openForStudent,
		submittedForStudent,
		ungradedForStudent,
		gradedForStudent,

		// Finished Tasks
		finishedTasks,
		hasMoreFinishedTasks,

		// Range Filter
		range,
		setRange,

		// Data Actions
		fetchTasks,
		fetchFinishedTasks,
		loadMoreFinishedTasks,

		// Status
		isLoadingTasks,
		isLoadingFinishedTasks,
		status,
		error,
		errorFinished,
	};
};

export const useTaskActions = () => {
	const { t } = useI18nGlobal();
	const tasksApi = TaskApiFactory(undefined, "/v3", $axios);
	const { execute, isRunning: isMutating, error, status } = useSafeAxiosTask();

	const deleteTask = async (taskId: string, taskName: string) => {
		const confirmed = await askDeletion(
			"components.molecules.TaskItemMenu.confirmDelete.title",
			t("components.molecules.TaskItemMenu.confirmDelete.text", { taskTitle: taskName }),
			"warning"
		);
		if (confirmed) {
			return await execute(
				() => tasksApi.taskControllerDelete(taskId),
				t("common.notifications.errors.notDeleted", { type: t("common.words.task") })
			);
		}
	};

	const revertPublishedTask = async (taskId: string) =>
		await execute(
			() => tasksApi.taskControllerRevertPublished(taskId),
			t("common.notifications.errors.notReverted", { type: t("common.words.task") })
		);

	const restoreFinishedTask = async (taskId: string) =>
		await execute(
			() => tasksApi.taskControllerRestore(taskId),
			t("common.notifications.errors.notRestored", { type: t("common.words.task") })
		);

	const finishTask = async (taskId: string) =>
		await execute(
			() => tasksApi.taskControllerFinish(taskId),
			t("common.notifications.errors.notFinished", { type: t("common.words.task") })
		);

	return {
		deleteTask,
		revertPublishedTask,
		finishTask,
		restoreFinishedTask,
		isMutating,
		error,
		status,
	};
};

export const useTasksOfOverview = createTestableSharedComposable(() => useTasks({ fetchImmediate: true }));

export type FilterOption<T extends string> = {
	value: T;
	title: string;
	count?: number;
};

// === Task Filter Composable ===
export const useTasksFilter = (
	tasks: Ref<TaskResponse[]>,
	options: {
		courseNames?: string[];
		includeSubstitute?: boolean;
		dueStatus?: DueStatus;
		gradeStatus?: GradeStatus;
	} = {}
) => {
	const { t } = useI18nGlobal();

	// === Filter State ===
	const selectedCourseNames = ref(options.courseNames ?? []);
	const includeSubstitute = ref(options.includeSubstitute ?? false);
	const gradeStatus = ref(options.gradeStatus);
	const dueStatus = ref(options.dueStatus);

	// === Filter Pipeline ===
	const tasksFilteredBySubstitute = computed(() => {
		if (includeSubstitute.value) return tasks.value;
		return tasks.value.filter((t) => !isSubstitution(t));
	});

	const tasksFilteredByCourses = computed(() => {
		if (selectedCourseNames.value.length === 0) return tasksFilteredBySubstitute.value;
		return tasksFilteredBySubstitute.value.filter((t) => selectedCourseNames.value.includes(t.courseName));
	});

	const tasksFilteredByDueStatus = computed(() => {
		if (!dueStatus.value) return tasksFilteredByCourses.value;
		if (dueStatus.value === DueStatus.Overdue) return tasksFilteredByCourses.value.filter(isTaskOverdue);
		if (dueStatus.value === DueStatus.NoDueDate) return tasksFilteredByCourses.value.filter(hasNoDueDate);
		if (dueStatus.value === DueStatus.NotOverdue) return tasksFilteredByCourses.value.filter((t) => !isTaskOverdue(t));
		return tasksFilteredByCourses.value;
	});

	const filteredTasks = computed(() => {
		if (!gradeStatus.value) return tasksFilteredByDueStatus.value;
		if (gradeStatus.value === GradeStatus.Graded) return tasksFilteredByDueStatus.value.filter(isGraded);
		if (gradeStatus.value === GradeStatus.NotGraded) return tasksFilteredByDueStatus.value.filter((t) => !isGraded(t));
		return tasksFilteredByDueStatus.value;
	});

	// === Course Filter Options with Counts ===
	const uniqCourseFilters = computed(() =>
		uniqBy(tasksFilteredBySubstitute.value, (task) => task.courseName).map((task) => ({
			value: task.courseName,
			title: task.courseName || t("pages.tasks.labels.noCourse"),
			isSubstitution: task.status.isSubstitutionTeacher,
		}))
	);

	const sortedCourseFilters = computed(() => orderBy(uniqCourseFilters.value, [(f) => f.title], ["asc"]));

	const courseFilterOptions = computed<FilterOption<string>[]>(() => {
		const baseTasks = tasksFilteredBySubstitute.value;
		return sortedCourseFilters.value.map((filter) => ({
			value: filter.value,
			title: filter.title,
			count: baseTasks.filter((t) => t.courseName === filter.value).length,
		}));
	});

	const gradeStatusOptions = [
		{
			value: GradeStatus.Graded,
			title: t("pages.tasks.graded"),
		},
		{
			value: GradeStatus.NotGraded,
			title: t("pages.tasks.notGraded"),
		},
	];

	const dueStatusOptions = [
		{
			value: DueStatus.Overdue,
			title: t("pages.tasks.overdue"),
		},
		{
			value: DueStatus.NotOverdue,
			title: t("pages.tasks.not.overdue"),
		},
		{
			value: DueStatus.NoDueDate,
			title: t("pages.tasks.no.due"),
		},
	];

	const clearFilters = () => {
		selectedCourseNames.value = [];
		includeSubstitute.value = false;
		dueStatus.value = undefined;
		gradeStatus.value = undefined;
	};

	return {
		// Filtered output
		filteredTasks,

		// Filter State
		selectedCourseNames,
		includeSubstitute,
		dueStatus,
		gradeStatus,

		courseFilterOptions,
		gradeStatusOptions,
		dueStatusOptions,

		// Filter Actions
		clearFilters,
	};
};

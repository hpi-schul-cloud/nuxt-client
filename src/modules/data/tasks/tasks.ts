import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";
import { nowUtc, parseUtc } from "@/utils/date-time.utils";
import { TaskApiFactory, TaskResponse } from "@api-server";
import { ManipulateType } from "dayjs";
import { orderBy, uniqBy } from "lodash-es";
import { computed, onMounted, ref } from "vue";

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
const hasDueDate = (t: TaskResponse) => t.dueDate && !isTaskOverdue(t);
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

const PAGE_SIZE = 10;

const fetchAllTasks = async (skip = 0, limit = 100, accumulated: TaskResponse[] = []): Promise<TaskResponse[]> => {
	const tasksApi = TaskApiFactory(undefined, "/v3", $axios);
	const data = await tasksApi.taskControllerFindAll(skip, limit);
	const all = [...accumulated, ...data.data.data];
	return skip + limit < data.data.total ? fetchAllTasks(skip + limit, limit, all) : all;
};

export const useTasks = (
	options: {
		range?: DateRange;
		courseNames?: string[];
		includeSubstitute?: boolean;
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

	// === Filter State ===
	const range = ref(options.range);
	const selectedCourseNames = ref(options.courseNames ?? []);
	const includeSubstitute = ref(options.includeSubstitute ?? false);

	// === Filter Pipeline ===
	const tasksFilteredBySubstitute = computed(() => {
		if (includeSubstitute.value) return toSortedByDueDate(allTasks.value);
		return toSortedByDueDate(allTasks.value.filter((t) => !isSubstitution(t)));
	});

	const draftsUnfiltered = computed(() => toSortedByCreatedDate(tasksFilteredBySubstitute.value.filter(isTaskDraft)));
	const publishedUnfiltered = computed(() => tasksFilteredBySubstitute.value.filter(isPublished));

	const tasksFilteredByCourses = computed(() => {
		if (selectedCourseNames.value.length === 0) return tasksFilteredBySubstitute.value;
		return tasksFilteredBySubstitute.value.filter((t) => selectedCourseNames.value.includes(t.courseName));
	});

	const tasks = computed(() => {
		const r = range.value;
		if (!r) return tasksFilteredByCourses.value;

		const from = r.from ? nowUtc().subtract(r.from.amount, r.from.unit) : undefined;
		const to = r.to ? nowUtc().add(r.to.amount, r.to.unit) : undefined;

		return tasksFilteredByCourses.value.filter((t) => {
			if (!t.dueDate) return true;
			const due = parseUtc(t.dueDate);
			return (!from || due.isAfter(from)) && (!to || due.isBefore(to));
		});
	});

	// === Base Categories ===
	const drafts = computed(() => toSortedByCreatedDate(tasks.value.filter(isTaskDraft)));
	const published = computed(() => tasks.value.filter(isPublished));

	// Convenience computed for published tasks
	const overdue = computed(() => toSortedByDueDate(published.value.filter(isTaskOverdue)));
	const withDueDate = computed(() => toSortedByDueDate(published.value.filter(hasDueDate)));
	const noDueDate = computed(() => published.value.filter(hasNoDueDate));

	// === Teacher Categories ===
	const gradedForTeacher = computed(() => published.value.filter(isGradedForTeacher));
	const openForTeacher = computed(() => published.value);
	const ungradedForTeacher = computed(() => published.value.filter(isUngradedForTeacher));

	// === Student Categories (filtered) ===
	const openForStudent = computed(() => published.value.filter(isOpenForStudent));
	const submittedForStudent = computed(() => published.value.filter(isSubmittedForStudent));
	const ungradedForStudent = computed(() =>
		published.value.filter((t) => isSubmittedForStudent(t) && !isGradedForStudent(t))
	);
	const gradedForStudent = computed(() => published.value.filter(isGradedForStudent));

	// === Student Categories (unfiltered - for counts) ===
	const openForStudentUnfiltered = computed(() => publishedUnfiltered.value.filter(isOpenForStudent));
	const submittedForStudentUnfiltered = computed(() => publishedUnfiltered.value.filter(isSubmittedForStudent));
	const gradedForStudentUnfiltered = computed(() => publishedUnfiltered.value.filter(isGradedForStudent));

	// === Filter Helpers ===
	const uniqCourseFilters = computed(() =>
		uniqBy(tasksFilteredBySubstitute.value, (t) => t.courseName).map((task) => ({
			value: task.courseName,
			text: task.courseName || t("pages.tasks.labels.noCourse"),
			isSubstitution: task.status.isSubstitutionTeacher,
		}))
	);

	const sortedCourseFilters = computed(() => orderBy(uniqCourseFilters.value, [(f) => f.text], ["asc"]));

	// === Filter Setters ===

	const setRange = (newRange: DateRange) => {
		range.value = newRange;
	};

	const setCourseNames = (names: string[]) => {
		selectedCourseNames.value = names;
	};

	const setIncludeSubstitute = (value: boolean) => {
		includeSubstitute.value = value;
		// if (!value) {
		//     const validCourses = new Set(tasksFilteredBySubstitute.value.map((t) => t.courseName));
		//     selectedCourseNames.value = selectedCourseNames.value.filter((name) => validCourses.has(name));
		// }
	};

	const clearFilters = () => {
		selectedCourseNames.value = [];
		includeSubstitute.value = false;
		range.value = undefined;
	};

	const fetchTasks = async () => {
		const { success, result } = await executeTasks(fetchAllTasks);
		if (success) allTasks.value = result;
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
		// Data
		tasks,
		allTasks,

		// Base Categories
		drafts,
		published,

		draftsUnfiltered,
		publishedUnfiltered,

		// Due Date Grouping
		overdue,
		withDueDate,
		noDueDate,

		// Teacher Categories
		openForTeacher,
		gradedForTeacher,
		ungradedForTeacher,

		// Student Categories
		openForStudent,
		submittedForStudent,
		ungradedForStudent,
		gradedForStudent,

		// Unfiltered Student Categories (for counts)
		openForStudentUnfiltered,
		submittedForStudentUnfiltered,
		gradedForStudentUnfiltered,

		// Finished Tasks
		finishedTasks,
		hasMoreFinishedTasks,

		// Filter State
		range,
		selectedCourseNames,
		includeSubstitute,

		// Filter Helpers
		sortedCourseFilters,

		// Filter Actions
		setRange,
		setCourseNames,
		setIncludeSubstitute,
		clearFilters,

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

	const deleteTask = async (taskId: string) =>
		await execute(
			() => tasksApi.taskControllerDelete(taskId),
			t("common.notifications.errors.notDeleted", { type: t("common.words.task") })
		);

	const revertPublishedTask = async (taskId: string) =>
		await execute(
			() => tasksApi.taskControllerRevertPublished(taskId),
			t("common.notifications.errors.notReverted", { type: t("common.words.task") })
		);

	// For these two, i need to fetch "normal" and "finished" tasks
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

export const useTasksOfOverview = createTestableSharedComposable(() =>
	useTasks({ includeSubstitute: false, fetchImmediate: true })
);

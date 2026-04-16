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

// === Task Status Predicates ===
const hasNoDueDate = (t: TaskResponse) => !t.dueDate;
const hasDueDate = (t: TaskResponse) => t.dueDate && !isTaskOverdue(t);
const isDraft = (t: TaskResponse) => t.status.isDraft;
const isPublished = (t: TaskResponse) => !t.status.isDraft;
const isSubstitution = (t: TaskResponse) => t.status.isSubstitutionTeacher;
const isVisible = (t: TaskResponse) => !t.lessonHidden;
const hasSubmissions = (t: TaskResponse) => t.status.submitted > 0;
const isGraded = (t: TaskResponse) => t.status.graded > 0;
const isFullyGraded = (t: TaskResponse) => t.status.graded === t.status.submitted;

// === Combined Predicates (Student) ===
const isOpenForStudent = (t: TaskResponse) => !hasSubmissions(t) && !isGraded(t) && isVisible(t);
const isSubmittedForStudent = (t: TaskResponse) => hasSubmissions(t) && !isGraded(t);
const isGradedForStudent = isGraded;

// === Combined Predicates (Teacher) ===
const isGradedForTeacher = (t: TaskResponse) => hasSubmissions(t) && isFullyGraded(t);
const isUngradedForTeacher = (t: TaskResponse) => hasSubmissions(t) && !isFullyGraded(t);

type DateRange = {
	from: { amount: number; unit: ManipulateType };
	to: { amount: number; unit: ManipulateType };
};

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
	const { t } = useI18nGlobal();
	const tasksApi = TaskApiFactory(undefined, "/v3", $axios);
	const { execute, isRunning, error, status } = useSafeAxiosTask();

	// === Raw Data ===
	const allTasks = ref<TaskResponse[]>([]);

	// === Filter State ===
	const range = ref(options.range);
	const selectedCourseNames = ref(options.courseNames ?? []);
	const includeSubstitute = ref(options.includeSubstitute ?? false);

	// === Filter Pipeline ===
	const tasksFilteredBySubstitute = computed(() => {
		if (includeSubstitute.value) return allTasks.value;
		return allTasks.value.filter((t) => !isSubstitution(t));
	});

	const draftsUnfiltered = computed(() => toSortedByCreatedDate(tasksFilteredBySubstitute.value.filter(isDraft)));
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
	const drafts = computed(() => toSortedByCreatedDate(tasks.value.filter(isDraft)));
	const published = computed(() => tasks.value.filter(isPublished));

	// === Due Date Grouping helper util ===
	const splitByDueDate = <T extends TaskResponse>(list: T[]) => ({
		overdue: toSortedByDueDate(list.filter(isTaskOverdue)),
		withDueDate: toSortedByDueDate(list.filter(hasDueDate)),
		noDueDate: list.filter(hasNoDueDate),
	});

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
		// 	const validCourses = new Set(tasksFilteredBySubstitute.value.map((t) => t.courseName));
		// 	selectedCourseNames.value = selectedCourseNames.value.filter((name) => validCourses.has(name));
		// }
	};

	const clearFilters = () => {
		selectedCourseNames.value = [];
		includeSubstitute.value = false;
		range.value = undefined;
	};

	const fetch = async () => await execute(fetchAllTasks);

	const deleteTask = async (taskId: string) => {
		const { success } = await execute(
			() => tasksApi.taskControllerDelete(taskId),
			t("common.notifications.errors.notDeleted", { type: t("common.words.task") })
		);
		if (success) await fetch();
		return success;
	};

	const finishTask = async (taskId: string) => {
		const { success } = await execute(
			() => tasksApi.taskControllerFinish(taskId),
			t("common.notifications.errors.notFinished", { type: t("common.words.task") })
		);
		if (success) await fetch();
		return success;
	};

	const revertPublishedTask = async (taskId: string) => {
		const { success } = await execute(
			() => tasksApi.taskControllerRevertPublished(taskId),
			t("common.notifications.errors.notReverted", { type: t("common.words.task") })
		);
		if (success) await fetch();
		return success;
	};

	if (options.fetchImmediate !== false) {
		onMounted(async () => {
			const { success, result } = await fetch();
			if (success && result) allTasks.value = result;
		});
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
		splitByDueDate,

		// Teacher Categories
		openForTeacher,
		gradedForTeacher,
		ungradedForTeacher,

		// Student Categories
		openForStudent,
		submittedForStudent,
		gradedForStudent,

		// Unfiltered Student Categories (for counts)
		openForStudentUnfiltered,
		submittedForStudentUnfiltered,
		gradedForStudentUnfiltered,

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
		fetch,
		deleteTask,
		finishTask,
		revertPublishedTask,

		// Status
		isLoading: isRunning,
		status,
		error,
	};
};

export const useTasksOfOverview = createTestableSharedComposable(useTasks);

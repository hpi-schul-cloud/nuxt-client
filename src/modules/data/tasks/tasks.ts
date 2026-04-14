import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { nowUtc, parseUtc } from "@/utils/date-time.utils";
import { TaskApiFactory, TaskResponse } from "@api-server";
import { ManipulateType } from "dayjs";
import { orderBy } from "lodash-es";
import { computed, onMounted, ref } from "vue";

// === Utilities ===
export const toSortedByDueDate = (tasks: TaskResponse[]) =>
	orderBy(tasks, (t) => (t.dueDate ? parseUtc(t.dueDate).valueOf() : Infinity), "asc");

export const toSortedByCreatedDate = (tasks: TaskResponse[]) =>
	orderBy(tasks, (t) => parseUtc(t.createdAt).valueOf(), "desc");

export const isTaskOverdue = (t: TaskResponse) => t.dueDate && parseUtc(t.dueDate).isBefore(nowUtc());

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

const hasNoDueDate = (t: TaskResponse) => !t.dueDate;
const hasDueDate = (t: TaskResponse) => t.dueDate && !isTaskOverdue(t);

export const useTasks = (
	options: {
		range?: DateRange;
		courseNames?: string[];
		includeSubstitute?: boolean;
		fetchImmediate?: boolean;
	} = {}
) => {
	const { execute, isRunning, error, status } = useSafeAxiosTask();
	const { t } = useI18nGlobal();
	const tasksApi = TaskApiFactory(undefined, "/v3", $axios);

	// === Raw Data ===
	const allTasks = ref<TaskResponse[]>([]);

	// === Filter State ===
	const range = ref(options.range);
	const selectedCourseNames = ref(options.courseNames ?? []);
	const includeSubstitute = ref(options.includeSubstitute ?? false);

	// === Filter Pipeline ===
	const tasksFilteredBySubstitute = computed(() => {
		if (includeSubstitute.value) return allTasks.value;
		return allTasks.value.filter((t) => !t.status.isSubstitutionTeacher);
	});

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
	const drafts = computed(() => toSortedByCreatedDate(tasks.value.filter((t) => t.status.isDraft)));
	const published = computed(() => tasks.value.filter((t) => !t.status.isDraft));

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

	// All submissions graded
	const gradedForTeacher = computed(() =>
		published.value.filter((t) => t.status.submitted > 0 && t.status.graded === t.status.submitted)
	);

	// Not yet finished
	const openForTeacher = computed(() => published.value);

	// Has submissions but not all graded
	const ungradedForTeacher = computed(() =>
		published.value.filter((t) => t.status.submitted > 0 && t.status.graded < t.status.submitted)
	);

	// === Student Categories ===

	// Not yet submitted, not graded, visible
	const openForStudent = computed(() =>
		published.value.filter((t) => t.status.submitted === 0 && t.status.graded === 0 && !t.lessonHidden)
	);

	// Submitted but not graded
	const submittedForStudent = computed(() =>
		published.value.filter((t) => t.status.submitted > 0 && t.status.graded === 0)
	);

	// Has been graded
	const gradedForStudent = computed(() => published.value.filter((t) => t.status.graded > 0));

	// === Filter Helpers ===
	// const courseFilterOptions = computed(() => {
	// 	const taskList = tasksFilteredBySubstitute.value;
	// 	const mapped = taskList.map((t) => ({
	// 		value: t.courseName,
	// 		text: t.courseName,
	// 		isSubstitution: t.status.isSubstitutionTeacher,
	// 	}));
	// 	return [...new Map(mapped.map((item) => [item.value, item])).values()];
	// });

	// const hasFiltersSelected = computed(() => selectedCourseNames.value.length > 0);

	// const countByCourseName = (taskList: TaskResponse[]) => {
	// 	const result: Record<string, number> = {};
	// 	for (const t of taskList) {
	// 		result[t.courseName] = (result[t.courseName] ?? 0) + 1;
	// 	}
	// 	return result;
	// };

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

	// === Data Actions (with auto-refetch) ===
	const fetch = async () => {
		const { success, result } = await execute(fetchAllTasks);
		if (success) allTasks.value = result;
		return result;
	};

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
		onMounted(fetch);
	}

	return {
		// Data
		tasks,
		allTasks,

		// Base Categories
		drafts,
		published,

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

		// Filter State
		range,
		selectedCourseNames,
		includeSubstitute,

		// Filter Helpers
		// courseFilterOptions,
		// hasFiltersSelected,
		// countByCourseName,

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

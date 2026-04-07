import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { nowUtc, parseUtc } from "@/utils/date-time.utils";
import { TaskApiFactory, TaskResponse } from "@api-server";
import { ManipulateType } from "dayjs";
import { orderBy } from "lodash-es";
import { computed, onMounted, ref } from "vue";

const fetchAllTasks = async (skip = 0, limit = 100, accumulated: TaskResponse[] = []): Promise<TaskResponse[]> => {
	const tasksApi = TaskApiFactory(undefined, "/v3", $axios);

	const data = await tasksApi.taskControllerFindAll(skip, limit);

	const all = [...accumulated, ...data.data.data];
	return skip + limit < data.data.total ? fetchAllTasks(skip + limit, limit, all) : all;
};

export const isTaskOverdue = (t: TaskResponse) => !!t.dueDate && parseUtc(t.dueDate).isBefore(nowUtc());
export const isGradedForTeacher = (t: TaskResponse) => t.status.submitted > 0 && t.status.graded === t.status.submitted;
export const isGradedForStudent = (t: TaskResponse) => t.status.graded > 0;

type DateRange = {
	from: { amount: number; unit: ManipulateType };
	to: { amount: number; unit: ManipulateType };
};

export const toSortedByDueDate = (tasks: TaskResponse[]) =>
	orderBy(tasks, (t) => (t.dueDate ? parseUtc(t.dueDate).valueOf() : Infinity), "asc");

export const toSortedByCreatedDate = (tasks: TaskResponse[]) =>
	orderBy(tasks, (t) => parseUtc(t.createdAt).valueOf(), "desc");

export const useTasks = ({ range }: { range?: DateRange } = {}, fetchImmediate = true) => {
	const { execute, isRunning, error, status } = useSafeAxiosTask();
	const allTasks = ref<TaskResponse[]>([]);

	const tasks = computed(() => {
		if (!range) return allTasks.value;

		const from = range.from ? nowUtc().subtract(range.from.amount, range.from.unit) : null;
		const to = range.to ? nowUtc().add(range.to.amount, range.to.unit) : null;

		const filteredByTime = allTasks.value.filter((t) => {
			if (!t.dueDate) return true;
			const due = parseUtc(t.dueDate);
			return (!from || due.isAfter(from)) && (!to || due.isBefore(to));
		});

		return toSortedByDueDate(filteredByTime);
	});

	const draftTasks = computed(() => tasks.value.filter((t) => t.status.isDraft));

	const publishedTasks = computed(() => tasks.value.filter((t) => !t.status.isDraft));
	const overdueTasks = computed(() => publishedTasks.value.filter(isTaskOverdue));

	const openTasksForTeacher = computed(() => publishedTasks.value.filter((t) => !isTaskOverdue(t)));
	const openTasksForStudents = computed(() =>
		publishedTasks.value.filter((t) => t.status.submitted === 0 && !t.lessonHidden)
	);

	const ungradedTasksForTeacher = computed(() => overdueTasks.value.filter((t) => !isGradedForTeacher(t)));
	const ungradedTasksForStudent = computed(() => publishedTasks.value.filter((t) => !isGradedForStudent(t)));

	const gradedTasksForTeacher = computed(() => overdueTasks.value.filter(isGradedForTeacher));
	const gradedTasksForStudent = computed(() => publishedTasks.value.filter(isGradedForStudent));

	const fetch = async () => {
		const { success, result } = await execute(fetchAllTasks);
		if (success) allTasks.value = result;
	};

	if (fetchImmediate) {
		onMounted(fetch);
	}

	return {
		isRunning,
		status,
		error,
		fetch,
		tasks,
		draftTasks,
		publishedTasks,
		overdueTasks,
		openTasksForTeacher,
		openTasksForStudents,
		ungradedTasksForTeacher,
		ungradedTasksForStudent,
		gradedTasksForTeacher,
		gradedTasksForStudent,
	};
};

export const useTaskActions = () => {
	const tasksApi = TaskApiFactory(undefined, "/v3", $axios);
	const { execute, isRunning, error } = useSafeAxiosTask();

	// TODO: add onSuccess ?!
	const deleteTask = async (taskId: string) =>
		await execute(() => tasksApi.taskControllerDelete(taskId), "Fehler beim Löschen");

	// TODO: sample onSuccess
	// const deleteTask = async (taskId: string, onSuccess) =>
	// 	await execute(() => tasksApi.taskControllerDelete(taskId), "Fehler beim Löschen", onSuccess);

	// finishTask, revertPublishedTask analog
	return { deleteTask, isRunning, error };
	// return { deleteTask, finishTask, revertPublishedTask, isRunning, error };
};

const componentSetup = async () => {
	const { fetch } = useTasks();
	const { deleteTask } = useTaskActions();

	const { success } = await deleteTask("task-id");
	if (success) await fetch();

	// TODO: sample onSuccess, optional
	// const { success } = await deleteTask("task-id", fetch);

	// TODO: All from one composable
	// const { tasks, deleteTask, isRunning } = useTasks();
};

// Other options:
// - Have actions also in useTasks() ? --> allows implementing refetching automatically, when e.g. deleting
// - Also allows getting all actions/getters by one instead of two destructs
// - mutating and fetching could, but dont need to share the same transmission state (isRunning) vs (isFetching, isMutating)

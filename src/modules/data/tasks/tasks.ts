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

type DateRange = {
	from: { amount: number; unit: ManipulateType };
	to: { amount: number; unit: ManipulateType };
};

export const TASKS_ONE_YEAR_RANGE: DateRange = {
	from: { amount: 1, unit: "year" },
	to: { amount: 14, unit: "day" },
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

	const draft = computed(() => tasks.value.filter((t) => t.status.isDraft));

	const notDraft = computed(() => tasks.value.filter((t) => !t.status.isDraft));

	const assignedToTeacher = computed(() => notDraft.value.filter((t) => t.status.submitted < t.status.maxSubmissions));

	const assignedToStudent = computed(() =>
		notDraft.value.filter(
			(t) => t.status.submitted === 0 && t.status.graded === 0 && !t.lessonHidden && !isTaskOverdue(t)
		)
	);

	const overdue = computed(() => notDraft.value.filter(isTaskOverdue));

	const feedbackRequired = computed(() =>
		notDraft.value.filter(
			(t) =>
				t.status.maxSubmissions > t.status.graded &&
				((isTaskOverdue(t) && t.status.submitted > t.status.graded) || (!t.dueDate && t.status.submitted > 0))
		)
	);

	const withFeedback = computed(() => notDraft.value.filter((t) => t.status.graded > 0));

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
		draft,
		overdue,
		assignedToTeacher,
		assignedToStudent,
		withFeedback,
		feedbackRequired,
	};
};

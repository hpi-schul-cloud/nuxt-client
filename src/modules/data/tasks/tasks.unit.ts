import {
	DueStatus,
	GradeStatus,
	isTaskOverdue,
	toSortedByCreatedDate,
	toSortedByDueDate,
	useTaskActions,
	useTasks,
	useTasksFilter,
} from "./tasks";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import { dateFromToday } from "@/utils/date-time.utils";
import { mockApi, mockApiResponse, taskResponseFactory } from "@@/tests/test-utils";
import { TaskApiFactory, TaskApiInterface, TaskListResponse, TaskResponse } from "@api-server";
import * as serverApi from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, Mocked, MockedFunction } from "vitest";
import { ref } from "vue";

vi.mock("@api-server");

const tasks = {
	open: { id: "open", lessonHidden: false, status: { submitted: 0, graded: 0, isDraft: false } },

	// Draft vs Published
	draft: taskResponseFactory.build({ id: "draft", status: { isDraft: true } }),
	published: taskResponseFactory.build({ id: "published", status: { isDraft: false } }),

	// Due Date variants
	overdue: taskResponseFactory.build({ id: "overdue", dueDate: dateFromToday(-1, "day") }),
	dueSoon: taskResponseFactory.build({ id: "due-soon", dueDate: dateFromToday(1, "day") }),
	dueLater: taskResponseFactory.build({ id: "due-later", dueDate: dateFromToday(5, "day") }),
	noDueDate: taskResponseFactory.build({ id: "no-due-date", dueDate: undefined }),

	// Submission/Grading variants
	notSubmitted: taskResponseFactory.build({ id: "not-submitted", status: { submitted: 0, graded: 0 } }),
	submittedNotGraded: taskResponseFactory.build({ id: "submitted-not-graded", status: { submitted: 2, graded: 0 } }),
	partiallyGraded: taskResponseFactory.build({ id: "partially-graded", status: { submitted: 5, graded: 2 } }),
	fullyGraded: taskResponseFactory.build({ id: "fully-graded", status: { submitted: 5, graded: 5 } }),

	// Visibility
	visible: taskResponseFactory.build({ id: "visible", lessonHidden: false }),
	hidden: taskResponseFactory.build({ id: "hidden", lessonHidden: true }),

	// Substitution
	regular: taskResponseFactory.build({ id: "regular", status: { isSubstitutionTeacher: false } }),
	substitution: taskResponseFactory.build({ id: "substitution", status: { isSubstitutionTeacher: true } }),

	// Course variants
	mathCourse: taskResponseFactory.build({ id: "math", courseName: "Mathe" }),
	germanCourse: taskResponseFactory.build({ id: "german", courseName: "Deutsch" }),
	englishCourse: taskResponseFactory.build({ id: "english", courseName: "Englisch" }),
};

describe("useTasks", () => {
	let taskApiMock: Mocked<TaskApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		taskApiMock = mockApi<TaskApiInterface>();
		vi.spyOn(serverApi, "TaskApiFactory").mockReturnValue(taskApiMock);
	});

	const setupApiResponse = (tasks: TaskResponse[]) => {
		taskApiMock.taskControllerFindAll.mockResolvedValue(
			mockApiResponse<TaskListResponse>({ data: { data: tasks, total: tasks.length, skip: 0, limit: 100 } })
		);
	};

	const setupFinishedApiResponse = (tasks: TaskResponse[], total?: number) => {
		taskApiMock.taskControllerFindAllFinished.mockResolvedValue(
			mockApiResponse<TaskListResponse>({ data: { data: tasks, total: total ?? tasks.length, skip: 0, limit: 10 } })
		);
	};

	describe("fetchTasks", () => {
		it("should fetch tasks and populate allTasks", async () => {
			setupApiResponse([tasks.dueSoon]);

			const { fetchTasks, allTasks } = useTasks({ fetchImmediate: false });
			await fetchTasks();

			expect(allTasks.value).toHaveLength(1);
			expect(allTasks.value[0].id).toBe("due-soon");
		});

		it("should sort fetched tasks by due date", async () => {
			setupApiResponse([tasks.dueLater, tasks.dueSoon]);

			const { fetchTasks, allTasks } = useTasks({ fetchImmediate: false });
			await fetchTasks();

			expect(allTasks.value[0].id).toBe("due-soon");
			expect(allTasks.value[1].id).toBe("due-later");
		});
	});

	describe("fetchFinishedTasks", () => {
		it("should fetch finished tasks", async () => {
			setupFinishedApiResponse([tasks.fullyGraded]);

			const { fetchFinishedTasks, finishedTasks } = useTasks({ fetchImmediate: false });
			await fetchFinishedTasks();

			expect(finishedTasks.value).toHaveLength(1);
		});
	});

	describe("loadMoreFinishedTasks", () => {
		it("should append more finished tasks", async () => {
			setupFinishedApiResponse([tasks.fullyGraded], 20);

			const { loadMoreFinishedTasks, finishedTasks } = useTasks({ fetchImmediate: false });
			await loadMoreFinishedTasks();

			expect(finishedTasks.value).toHaveLength(1);
			expect(taskApiMock.taskControllerFindAllFinished).toHaveBeenCalled();
		});

		it("should not fetch when no more tasks available", async () => {
			setupFinishedApiResponse([tasks.fullyGraded], 1);

			const { loadMoreFinishedTasks, fetchFinishedTasks } = useTasks({ fetchImmediate: false });
			await fetchFinishedTasks();
			taskApiMock.taskControllerFindAllFinished.mockClear();

			await loadMoreFinishedTasks();

			expect(taskApiMock.taskControllerFindAllFinished).not.toHaveBeenCalled();
		});
	});

	describe("hasMoreFinishedTasks", () => {
		it("should be true when more tasks are available", async () => {
			setupFinishedApiResponse([tasks.fullyGraded], 20);

			const { fetchFinishedTasks, hasMoreFinishedTasks } = useTasks({ fetchImmediate: false });
			await fetchFinishedTasks();

			expect(hasMoreFinishedTasks.value).toBe(true);
		});

		it("should be false when all tasks are loaded", async () => {
			setupFinishedApiResponse([tasks.fullyGraded], 1);

			const { fetchFinishedTasks, hasMoreFinishedTasks } = useTasks({ fetchImmediate: false });
			await fetchFinishedTasks();

			expect(hasMoreFinishedTasks.value).toBe(false);
		});
	});

	describe("drafts", () => {
		it("should filter draft tasks", async () => {
			setupApiResponse([tasks.draft, tasks.published]);

			const { fetchTasks, drafts } = useTasks({ fetchImmediate: false });
			await fetchTasks();

			expect(drafts.value).toHaveLength(1);
			expect(drafts.value[0].id).toBe("draft");
		});
	});

	describe("published", () => {
		it("should filter published tasks", async () => {
			setupApiResponse([tasks.draft, tasks.published]);

			const { fetchTasks, published } = useTasks({ fetchImmediate: false });
			await fetchTasks();

			expect(published.value).toHaveLength(1);
			expect(published.value[0].id).toBe("published");
		});
	});

	describe("openForTeacher", () => {
		it("should return all published tasks", async () => {
			setupApiResponse([tasks.draft, tasks.published, tasks.overdue]);

			const { fetchTasks, openForTeacher } = useTasks({ fetchImmediate: false });
			await fetchTasks();

			expect(openForTeacher.value).toHaveLength(2);
		});
	});

	describe("gradedForTeacher", () => {
		it("should filter fully graded tasks with submissions", async () => {
			setupApiResponse([tasks.fullyGraded, tasks.partiallyGraded, tasks.notSubmitted]);

			const { fetchTasks, gradedForTeacher } = useTasks({ fetchImmediate: false });
			await fetchTasks();

			expect(gradedForTeacher.value).toHaveLength(1);
			expect(gradedForTeacher.value[0].id).toBe("fully-graded");
		});
	});

	describe("ungradedForTeacher", () => {
		it("should filter tasks that are not fully graded", async () => {
			setupApiResponse([tasks.fullyGraded, tasks.partiallyGraded, tasks.notSubmitted]);

			const { fetchTasks, ungradedForTeacher } = useTasks({ fetchImmediate: false });
			await fetchTasks();

			expect(ungradedForTeacher.value).toHaveLength(2);
		});
	});

	describe("openForStudent", () => {
		it("should filter visible, not submitted, not graded tasks", async () => {
			const open = taskResponseFactory.build({
				id: "open",
				lessonHidden: false,
				status: { submitted: 0, graded: 0, isDraft: false },
			});
			const submitted = taskResponseFactory.build({
				id: "submitted",
				status: { submitted: 1, graded: 0, isDraft: false },
			});
			const hidden = taskResponseFactory.build({
				id: "hidden",
				lessonHidden: true,
				status: { submitted: 0, graded: 0, isDraft: false },
			});
			setupApiResponse([open, submitted, hidden]);

			const { fetchTasks, openForStudent } = useTasks({ fetchImmediate: false });
			await fetchTasks();

			expect(openForStudent.value).toHaveLength(1);
			expect(openForStudent.value[0].id).toBe("open");
		});
	});

	describe("submittedForStudent", () => {
		it("should filter tasks with submissions", async () => {
			setupApiResponse([tasks.notSubmitted, tasks.submittedNotGraded]);

			const { fetchTasks, submittedForStudent } = useTasks({ fetchImmediate: false });
			await fetchTasks();

			expect(submittedForStudent.value).toHaveLength(1);
			expect(submittedForStudent.value[0].id).toBe("submitted-not-graded");
		});
	});

	describe("gradedForStudent", () => {
		it("should filter tasks with graded > 0", async () => {
			setupApiResponse([tasks.notSubmitted, tasks.submittedNotGraded, tasks.fullyGraded]);

			const { fetchTasks, gradedForStudent } = useTasks({ fetchImmediate: false });
			await fetchTasks();

			expect(gradedForStudent.value).toHaveLength(1);
			expect(gradedForStudent.value[0].id).toBe("fully-graded");
		});
	});

	describe("ungradedForStudent", () => {
		it("should filter submitted but not graded tasks", async () => {
			setupApiResponse([tasks.notSubmitted, tasks.submittedNotGraded, tasks.fullyGraded]);

			const { fetchTasks, ungradedForStudent } = useTasks({ fetchImmediate: false });
			await fetchTasks();

			expect(ungradedForStudent.value).toHaveLength(1);
			expect(ungradedForStudent.value[0].id).toBe("submitted-not-graded");
		});
	});
});

describe("useTasksFilter", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	describe("filteredTasks", () => {
		it("should return all tasks when no filters are set", () => {
			const tasksRef = ref([tasks.mathCourse, tasks.germanCourse]);

			const { filteredTasks } = useTasksFilter(tasksRef);

			expect(filteredTasks.value).toHaveLength(2);
		});
	});

	describe("substitute filter", () => {
		it("should exclude substitution tasks by default", () => {
			const tasksRef = ref([tasks.regular, tasks.substitution]);

			const { filteredTasks } = useTasksFilter(tasksRef);

			expect(filteredTasks.value).toHaveLength(1);
			expect(filteredTasks.value[0].id).toBe("regular");
		});

		it("should include substitution tasks when includeSubstitute is true", () => {
			const tasksRef = ref([tasks.regular, tasks.substitution]);

			const { filteredTasks, includeSubstitute } = useTasksFilter(tasksRef);
			includeSubstitute.value = true;

			expect(filteredTasks.value).toHaveLength(2);
		});
	});

	describe("course filter", () => {
		it("should filter by selected course names", () => {
			const tasksRef = ref([tasks.mathCourse, tasks.germanCourse, tasks.englishCourse]);

			const { filteredTasks, selectedCourseNames } = useTasksFilter(tasksRef);
			selectedCourseNames.value = ["Mathe"];

			expect(filteredTasks.value).toHaveLength(1);
			expect(filteredTasks.value[0].id).toBe("math");
		});

		it("should allow multiple course selection", () => {
			const tasksRef = ref([tasks.mathCourse, tasks.germanCourse, tasks.englishCourse]);

			const { filteredTasks, selectedCourseNames } = useTasksFilter(tasksRef);
			selectedCourseNames.value = ["Mathe", "Deutsch"];

			expect(filteredTasks.value).toHaveLength(2);
		});
	});

	describe("dueStatus filter", () => {
		it("should filter overdue tasks", () => {
			const tasksRef = ref([tasks.overdue, tasks.dueSoon, tasks.noDueDate]);

			const { filteredTasks, dueStatus } = useTasksFilter(tasksRef);
			dueStatus.value = DueStatus.Overdue;

			expect(filteredTasks.value).toHaveLength(1);
			expect(filteredTasks.value[0].id).toBe("overdue");
		});

		it("should filter not overdue tasks", () => {
			const tasksRef = ref([tasks.overdue, tasks.dueSoon, tasks.noDueDate]);

			const { filteredTasks, dueStatus } = useTasksFilter(tasksRef);
			dueStatus.value = DueStatus.NotOverdue;

			expect(filteredTasks.value).toHaveLength(2);
		});

		it("should filter tasks with no due date", () => {
			const tasksRef = ref([tasks.overdue, tasks.dueSoon, tasks.noDueDate]);

			const { filteredTasks, dueStatus } = useTasksFilter(tasksRef);
			dueStatus.value = DueStatus.NoDueDate;

			expect(filteredTasks.value).toHaveLength(1);
			expect(filteredTasks.value[0].id).toBe("no-due-date");
		});
	});

	describe("gradeStatus filter", () => {
		it("should filter graded tasks", () => {
			const tasksRef = ref([tasks.fullyGraded, tasks.notSubmitted]);

			const { filteredTasks, gradeStatus } = useTasksFilter(tasksRef);
			gradeStatus.value = GradeStatus.Graded;

			expect(filteredTasks.value).toHaveLength(1);
			expect(filteredTasks.value[0].id).toBe("fully-graded");
		});

		it("should filter not graded tasks", () => {
			const tasksRef = ref([tasks.fullyGraded, tasks.notSubmitted]);

			const { filteredTasks, gradeStatus } = useTasksFilter(tasksRef);
			gradeStatus.value = GradeStatus.NotGraded;

			expect(filteredTasks.value).toHaveLength(1);
			expect(filteredTasks.value[0].id).toBe("not-submitted");
		});
	});

	describe("courseFilterOptions", () => {
		it("should generate unique course options with counts", () => {
			const math1 = taskResponseFactory.build({ id: "m1", courseName: "Mathe" });
			const math2 = taskResponseFactory.build({ id: "m2", courseName: "Mathe" });
			const german = taskResponseFactory.build({ id: "g1", courseName: "Deutsch" });
			const tasksRef = ref([math1, math2, german]);

			const { courseFilterOptions } = useTasksFilter(tasksRef);

			expect(courseFilterOptions.value).toHaveLength(2);
			const mathOption = courseFilterOptions.value.find((o) => o.value === "Mathe");
			expect(mathOption?.count).toBe(2);
		});

		it("should sort course options alphabetically", () => {
			const tasksRef = ref([tasks.mathCourse, tasks.germanCourse, tasks.englishCourse]);

			const { courseFilterOptions } = useTasksFilter(tasksRef);

			expect(courseFilterOptions.value[0].value).toBe("Deutsch");
			expect(courseFilterOptions.value[1].value).toBe("Englisch");
			expect(courseFilterOptions.value[2].value).toBe("Mathe");
		});
	});

	describe("clearFilters", () => {
		it("should reset all filter state", () => {
			const tasksRef = ref([tasks.mathCourse]);

			const { selectedCourseNames, includeSubstitute, dueStatus, gradeStatus, clearFilters } = useTasksFilter(tasksRef);

			selectedCourseNames.value = ["Mathe"];
			includeSubstitute.value = true;
			dueStatus.value = DueStatus.Overdue;
			gradeStatus.value = GradeStatus.Graded;

			clearFilters();

			expect(selectedCourseNames.value).toEqual([]);
			expect(includeSubstitute.value).toBe(false);
			expect(dueStatus.value).toBeUndefined();
			expect(gradeStatus.value).toBeUndefined();
		});
	});
});

describe("useTaskActions", () => {
	let taskApiMock: Mocked<TaskApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		taskApiMock = mockApi<TaskApiInterface>();
		(TaskApiFactory as MockedFunction<typeof TaskApiFactory>).mockReturnValue(taskApiMock);
	});

	describe("deleteTask", () => {
		it("should call API when deletion is confirmed", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletion").mockResolvedValue(true);
			taskApiMock.taskControllerDelete.mockResolvedValue(mockApiResponse({ data: true }));

			const { deleteTask } = useTaskActions();
			await deleteTask("task-123", "Test Task");

			expect(confirmDialogUtils.askDeletion).toHaveBeenCalled();
			expect(taskApiMock.taskControllerDelete).toHaveBeenCalledWith("task-123");
		});

		it("should not call API when deletion is cancelled", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletion").mockResolvedValue(false);

			const { deleteTask } = useTaskActions();
			await deleteTask("task-123", "Test Task");

			expect(taskApiMock.taskControllerDelete).not.toHaveBeenCalled();
		});
	});

	describe("revertPublishedTask", () => {
		it("should call API to revert task", async () => {
			taskApiMock.taskControllerRevertPublished.mockResolvedValue(mockApiResponse({ data: {} }));

			const { revertPublishedTask } = useTaskActions();
			await revertPublishedTask("task-123");

			expect(taskApiMock.taskControllerRevertPublished).toHaveBeenCalledWith("task-123");
		});
	});

	describe("finishTask", () => {
		it("should call API to finish task", async () => {
			taskApiMock.taskControllerFinish.mockResolvedValue(mockApiResponse({ data: {} }));

			const { finishTask } = useTaskActions();
			await finishTask("task-123");

			expect(taskApiMock.taskControllerFinish).toHaveBeenCalledWith("task-123");
		});
	});

	describe("restoreFinishedTask", () => {
		it("should call API to restore task", async () => {
			taskApiMock.taskControllerRestore.mockResolvedValue(mockApiResponse({ data: {} }));

			const { restoreFinishedTask } = useTaskActions();
			await restoreFinishedTask("task-123");

			expect(taskApiMock.taskControllerRestore).toHaveBeenCalledWith("task-123");
		});
	});
});

describe("isTaskOverdue", () => {
	it("returns false when task has no dueDate", () => {
		expect(isTaskOverdue(tasks.noDueDate)).toBe(false);
	});

	it("returns true when dueDate is in the past", () => {
		expect(isTaskOverdue(tasks.overdue)).toBe(true);
	});

	it("returns false when dueDate is in the future", () => {
		expect(isTaskOverdue(tasks.dueSoon)).toBe(false);
	});
});

describe("toSortedByDueDate", () => {
	it("sorts tasks ascending by dueDate", () => {
		const sorted = toSortedByDueDate([tasks.dueLater, tasks.dueSoon]);

		expect(sorted[0].id).toBe("due-soon");
		expect(sorted[1].id).toBe("due-later");
	});

	it("places tasks without dueDate at the end", () => {
		const sorted = toSortedByDueDate([tasks.noDueDate, tasks.dueSoon]);

		expect(sorted[0].id).toBe("due-soon");
		expect(sorted[1].id).toBe("no-due-date");
	});
});

describe("toSortedByCreatedDate", () => {
	it("sorts tasks descending by createdAt", () => {
		const older = taskResponseFactory.build({ id: "older", createdAt: dateFromToday(-2, "day") });
		const newer = taskResponseFactory.build({ id: "newer", createdAt: dateFromToday(-1, "day") });

		const sorted = toSortedByCreatedDate([older, newer]);

		expect(sorted[0].id).toBe("newer");
		expect(sorted[1].id).toBe("older");
	});
});

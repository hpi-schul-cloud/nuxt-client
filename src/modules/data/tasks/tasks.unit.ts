import { isTaskOverdue, toSortedByCreatedDate, toSortedByDueDate, useTasks } from "./tasks";
import { dateFromToday } from "@/utils/date-time.utils";
import { mockApi, mockApiResponse, taskResponseFactory } from "@@/tests/test-utils";
import { TaskApiFactory, TaskApiInterface, TaskListResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, Mocked, MockedFunction } from "vitest";

vi.mock("@api-server", async (importOriginal) => {
	const original = await importOriginal<typeof import("@api-server")>();
	return { ...original, TaskApiFactory: vi.fn() };
});

describe("useTasks", () => {
	let taskApiMock: Mocked<TaskApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		taskApiMock = mockApi<TaskApiInterface>();
		(TaskApiFactory as MockedFunction<typeof TaskApiFactory>).mockReturnValue(taskApiMock);
	});

	const setupApiResponse = (tasks: ReturnType<typeof taskResponseFactory.build>[]) => {
		taskApiMock.taskControllerFindAll.mockResolvedValue(
			mockApiResponse<TaskListResponse>({
				data: { data: tasks, total: tasks.length, skip: 0, limit: 100 },
			})
		);
	};

	describe("fetch", () => {
		it("should fetch tasks and populate computed properties", async () => {
			const openTask = taskResponseFactory.build({
				id: "open",
				dueDate: dateFromToday(5, "day"),
			});
			setupApiResponse([openTask]);

			const { fetch, tasks, isRunning } = useTasks({}, false);
			expect(isRunning.value).toBe(false);

			await fetch();
			await flushPromises();

			expect(tasks.value).toHaveLength(1);
			expect(tasks.value[0].id).toBe("open");
		});
	});

	describe("computed filters", () => {
		it("should separate draft from non-draft tasks", async () => {
			const draftTask = taskResponseFactory.build({
				id: "draft",
				status: { isDraft: true },
			});
			const publishedTask = taskResponseFactory.build({
				id: "published",
				status: { isDraft: false },
			});
			setupApiResponse([draftTask, publishedTask]);

			const { fetch, draftTasks, publishedTasks } = useTasks({}, false);
			await fetch();

			expect(draftTasks.value).toHaveLength(1);
			expect(draftTasks.value[0].id).toBe("draft");
			expect(publishedTasks.value).toHaveLength(1);
			expect(publishedTasks.value[0].id).toBe("published");
		});

		it("should identify overdue tasks", async () => {
			const overdueTask = taskResponseFactory.build({
				id: "overdue",
				dueDate: dateFromToday(-2, "day"),
			});
			const futureTask = taskResponseFactory.build({
				id: "future",
				dueDate: dateFromToday(2, "day"),
			});
			setupApiResponse([overdueTask, futureTask]);

			const { fetch, overdueTasks } = useTasks({}, false);
			await fetch();

			expect(overdueTasks.value).toHaveLength(1);
			expect(overdueTasks.value[0].id).toBe("overdue");
		});

		it("should filter openTasksForTeacher (published and not overdue)", async () => {
			const open = taskResponseFactory.build({
				id: "open",
				dueDate: dateFromToday(5, "day"),
				status: { isDraft: false },
			});
			const overdueTask = taskResponseFactory.build({
				id: "overdue",
				dueDate: dateFromToday(-1, "day"),
				status: { isDraft: false },
			});
			setupApiResponse([open, overdueTask]);

			const { fetch, openTasksForTeacher } = useTasks({}, false);
			await fetch();

			expect(openTasksForTeacher.value).toHaveLength(1);
			expect(openTasksForTeacher.value[0].id).toBe("open");
		});

		it("should filter openTasksForStudents (published, not hidden, not submitted)", async () => {
			const validTask = taskResponseFactory.build({
				id: "valid",
				lessonHidden: false,
				status: { submitted: 0, graded: 0 },
			});
			const alreadySubmitted = taskResponseFactory.build({
				id: "submitted",
				status: { submitted: 1, graded: 0 },
			});
			const hiddenLesson = taskResponseFactory.build({
				id: "hidden",
				lessonHidden: true,
				status: { submitted: 0, graded: 0 },
			});
			setupApiResponse([validTask, alreadySubmitted, hiddenLesson]);

			const { fetch, openTasksForStudents } = useTasks({}, false);
			await fetch();

			expect(openTasksForStudents.value).toHaveLength(1);
			expect(openTasksForStudents.value[0].id).toBe("valid");
		});

		it("should filter gradedForStudent (published with graded > 0)", async () => {
			const gradedTask = taskResponseFactory.build({
				id: "graded",
				status: { graded: 1 },
			});
			const notGradedTask = taskResponseFactory.build({
				id: "not-graded",
				status: { graded: 0 },
			});
			setupApiResponse([gradedTask, notGradedTask]);

			const { fetch, gradedTasksForStudent } = useTasks({}, false);
			await fetch();

			expect(gradedTasksForStudent.value).toHaveLength(1);
			expect(gradedTasksForStudent.value[0].id).toBe("graded");
		});

		it("should filter ungradedForTeacher and gradedForTeacher based on overdue and graded==submitted", async () => {
			const needsGrading = taskResponseFactory.build({
				id: "needs-grading",
				dueDate: dateFromToday(-1, "day"),
				status: { graded: 2, submitted: 5 },
			});
			const alreadyGraded = taskResponseFactory.build({
				id: "already-graded",
				dueDate: dateFromToday(-1, "day"),
				status: { graded: 5, submitted: 5 },
			});
			setupApiResponse([needsGrading, alreadyGraded]);

			const { fetch, ungradedTasksForTeacher, gradedTasksForTeacher } = useTasks({}, false);
			await fetch();

			expect(ungradedTasksForTeacher.value).toHaveLength(1);
			expect(ungradedTasksForTeacher.value[0].id).toBe("needs-grading");

			expect(gradedTasksForTeacher.value).toHaveLength(1);
			expect(gradedTasksForTeacher.value[0].id).toBe("already-graded");
		});

		it("should filter ungradedForStudent (published, submitted > 0, not graded)", async () => {
			const submittedNotGraded = taskResponseFactory.build({
				id: "submitted-not-graded",
				status: { submitted: 1, graded: 0 },
			});
			const notSubmitted = taskResponseFactory.build({
				id: "not-submitted",
				status: { submitted: 0, graded: 0 },
			});
			const graded = taskResponseFactory.build({
				id: "graded",
				status: { submitted: 1, graded: 1 },
			});
			setupApiResponse([submittedNotGraded, notSubmitted, graded]);

			const { fetch, ungradedTasksForStudent } = useTasks({}, false);
			await fetch();

			expect(ungradedTasksForStudent.value).toHaveLength(1);
			expect(ungradedTasksForStudent.value[0].id).toBe("submitted-not-graded");
		});
	});
});

describe("isTaskOverdue", () => {
	it("returns false when task has no dueDate", () => {
		expect(isTaskOverdue(taskResponseFactory.build({ dueDate: undefined }))).toBe(false);
	});

	it("returns true when dueDate is in the past", () => {
		const past = dateFromToday(-1, "day");
		expect(isTaskOverdue(taskResponseFactory.build({ dueDate: past }))).toBe(true);
	});

	it("returns false when dueDate is in the future", () => {
		const future = dateFromToday(1, "day");
		expect(isTaskOverdue(taskResponseFactory.build({ dueDate: future }))).toBe(false);
	});
});

describe("toSortedByDueDate", () => {
	it("sorts tasks ascending by dueDate", () => {
		const tasks = [
			taskResponseFactory.build({ id: "b", dueDate: dateFromToday(2, "day") }),
			taskResponseFactory.build({ id: "a", dueDate: dateFromToday(1, "day") }),
		];
		const sorted = toSortedByDueDate(tasks);
		expect(sorted.map((t) => t.id)).toEqual(["a", "b"]);
	});

	it("places tasks without dueDate at the end", () => {
		const tasks = [
			taskResponseFactory.build({ id: "no-date", dueDate: undefined }),
			taskResponseFactory.build({
				id: "with-date",
				dueDate: dateFromToday(1, "day"),
			}),
		];
		const sorted = toSortedByDueDate(tasks);
		expect(sorted[0].id).toBe("with-date");
		expect(sorted[1].id).toBe("no-date");
	});
});

describe("toSortedByCreatedDate", () => {
	it("sorts tasks descending by createdAt", () => {
		const tasks = [
			taskResponseFactory.build({
				id: "older",
				createdAt: dateFromToday(-2, "day"),
			}),
			taskResponseFactory.build({
				id: "newer",
				createdAt: dateFromToday(-1, "day"),
			}),
		];
		const sorted = toSortedByCreatedDate(tasks);
		expect(sorted.map((t) => t.id)).toEqual(["newer", "older"]);
	});
});

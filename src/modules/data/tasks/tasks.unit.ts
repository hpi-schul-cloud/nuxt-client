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

			const { fetch, draft, notDraft } = useTasks({}, false);
			await fetch();

			expect(draft.value).toHaveLength(1);
			expect(draft.value[0].id).toBe("draft");
			expect(notDraft.value).toHaveLength(1);
			expect(notDraft.value[0].id).toBe("published");
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

			const { fetch, overdue } = useTasks({}, false);
			await fetch();

			expect(overdue.value).toHaveLength(1);
			expect(overdue.value[0].id).toBe("overdue");
		});

		it("should filter assignedToTeacher tasks", async () => {
			const assignedTask = taskResponseFactory.build({
				id: "assigned",
				status: { submitted: 3, maxSubmissions: 10 },
			});
			const fullySubmittedTask = taskResponseFactory.build({
				id: "full",
				status: { submitted: 10, maxSubmissions: 10 },
			});
			setupApiResponse([assignedTask, fullySubmittedTask]);

			const { fetch, assignedToTeacher } = useTasks({}, false);
			await fetch();

			expect(assignedToTeacher.value).toHaveLength(1);
			expect(assignedToTeacher.value[0].id).toBe("assigned");
		});

		it("should filter assignedToStudent tasks", async () => {
			const validTask = taskResponseFactory.build({
				id: "valid",
				dueDate: dateFromToday(5, "day"),
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
			const overdueTask = taskResponseFactory.build({
				id: "overdue",
				dueDate: dateFromToday(-1, "day"),
				status: { submitted: 0, graded: 0 },
			});
			setupApiResponse([validTask, alreadySubmitted, hiddenLesson, overdueTask]);

			const { fetch, assignedToStudent } = useTasks({}, false);
			await fetch();

			expect(assignedToStudent.value).toHaveLength(1);
			expect(assignedToStudent.value[0].id).toBe("valid");
		});

		it("should filter withFeedback tasks", async () => {
			const gradedTask = taskResponseFactory.build({
				id: "graded",
				status: { graded: 1 },
			});
			const notGradedTask = taskResponseFactory.build({
				id: "not-graded",
				status: { graded: 0 },
			});
			setupApiResponse([gradedTask, notGradedTask]);

			const { fetch, withFeedback } = useTasks({}, false);
			await fetch();

			expect(withFeedback.value).toHaveLength(1);
			expect(withFeedback.value[0].id).toBe("graded");
		});

		it("should filter feedbackRequired - overdue with submissions", async () => {
			const needsFeedback = taskResponseFactory.build({
				id: "needs-feedback",
				dueDate: dateFromToday(-1, "day"),
				status: { maxSubmissions: 10, graded: 2, submitted: 5 },
			});
			const alreadyGraded = taskResponseFactory.build({
				id: "already-graded",
				dueDate: dateFromToday(-1, "day"),
				status: { maxSubmissions: 10, graded: 5, submitted: 5 },
			});
			setupApiResponse([needsFeedback, alreadyGraded]);

			const { fetch, feedbackRequired } = useTasks({}, false);
			await fetch();

			expect(feedbackRequired.value).toHaveLength(1);
			expect(feedbackRequired.value[0].id).toBe("needs-feedback");
		});

		it("should filter feedbackRequired - no dueDate with submissions", async () => {
			const needsFeedback = taskResponseFactory.build({
				id: "needs-feedback",
				dueDate: undefined,
				status: { maxSubmissions: 10, graded: 0, submitted: 3 },
			});
			const noSubmissions = taskResponseFactory.build({
				id: "no-submissions",
				dueDate: undefined,
				status: { maxSubmissions: 10, graded: 0, submitted: 0 },
			});
			setupApiResponse([needsFeedback, noSubmissions]);

			const { fetch, feedbackRequired } = useTasks({}, false);
			await fetch();

			expect(feedbackRequired.value).toHaveLength(1);
			expect(feedbackRequired.value[0].id).toBe("needs-feedback");
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

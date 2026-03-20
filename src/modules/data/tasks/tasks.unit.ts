import { isTaskOverdue, TASKS_ONE_YEAR_RANGE, toSortedByCreatedDate, toSortedByDueDate, useTasks } from "./tasks";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { mockComposable } from "@/test-utils/mock-composable";
import { nowUtc } from "@/utils/date-time.utils";
import { TaskResponse } from "@api-server";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock("@/composables/async-tasks.composable");
vi.mock("@/utils/api", () => ({ $axios: {} }));
vi.mock("@api-server", () => ({
	TaskApiFactory: vi.fn(() => ({
		taskControllerFindAll: vi.fn().mockResolvedValue({
			data: { data: [], total: 0 },
		}),
	})),
}));

const mockUseSafeAxiosTask = vi.mocked(useSafeAxiosTask);

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

const makeTask = (overrides: Partial<TaskResponse> = {}): TaskResponse =>
	({
		id: "task-1",
		createdAt: nowUtc().toISOString(),
		dueDate: null,
		lessonHidden: false,
		status: {
			isDraft: false,
			submitted: 0,
			graded: 0,
			maxSubmissions: 1,
		},
		...overrides,
	}) as TaskResponse;

// Mounts a minimal wrapper component so Vue lifecycle hooks (onMounted) run.
const mountComposable = (args: Parameters<typeof useTasks>) => {
	let result!: ReturnType<typeof useTasks>;

	const Wrapper = defineComponent({
		setup() {
			result = useTasks(...args);
			return {};
		},
		template: "<div/>",
	});

	mount(Wrapper);
	return result;
};

// ---------------------------------------------------------------------------
// Default safe-axios-task mock (no-op execute by default)
// ---------------------------------------------------------------------------

const makeExecuteMock = (tasks: TaskResponse[] = []) => vi.fn().mockResolvedValue({ success: true, result: tasks });

const setupSafeAxiosMock = (tasks: TaskResponse[] = []) => {
	const execute = makeExecuteMock(tasks);
	mockUseSafeAxiosTask.mockReturnValue(
		mockComposable(useSafeAxiosTask, {
			execute,
			isRunning: false,
			error: null,
			status: "idle",
		})
	);
	return { execute };
};

// ===========================================================================
// isTaskOverdue
// ===========================================================================

describe("isTaskOverdue", () => {
	it("returns false when task has no dueDate", () => {
		expect(isTaskOverdue(makeTask({ dueDate: null }))).toBe(false);
	});

	it("returns true when dueDate is in the past", () => {
		const past = nowUtc().subtract(1, "day").toISOString();
		expect(isTaskOverdue(makeTask({ dueDate: past }))).toBe(true);
	});

	it("returns false when dueDate is in the future", () => {
		const future = nowUtc().add(1, "day").toISOString();
		expect(isTaskOverdue(makeTask({ dueDate: future }))).toBe(false);
	});
});

// ===========================================================================
// toSortedByDueDate
// ===========================================================================

describe("toSortedByDueDate", () => {
	it("sorts tasks ascending by dueDate", () => {
		const tasks = [
			makeTask({ id: "b", dueDate: nowUtc().add(2, "day").toISOString() }),
			makeTask({ id: "a", dueDate: nowUtc().add(1, "day").toISOString() }),
		];
		const sorted = toSortedByDueDate(tasks);
		expect(sorted.map((t) => t.id)).toEqual(["a", "b"]);
	});

	it("places tasks without dueDate at the end", () => {
		const tasks = [
			makeTask({ id: "no-date", dueDate: null }),
			makeTask({ id: "with-date", dueDate: nowUtc().add(1, "day").toISOString() }),
		];
		const sorted = toSortedByDueDate(tasks);
		expect(sorted[0].id).toBe("with-date");
		expect(sorted[1].id).toBe("no-date");
	});
});

// ===========================================================================
// toSortedByCreatedDate
// ===========================================================================

describe("toSortedByCreatedDate", () => {
	it("sorts tasks descending by createdAt", () => {
		const tasks = [
			makeTask({ id: "older", createdAt: nowUtc().subtract(2, "day").toISOString() }),
			makeTask({ id: "newer", createdAt: nowUtc().subtract(1, "day").toISOString() }),
		];
		const sorted = toSortedByCreatedDate(tasks);
		expect(sorted.map((t) => t.id)).toEqual(["newer", "older"]);
	});
});

// ===========================================================================
// TASKS_ONE_YEAR_RANGE
// ===========================================================================

describe("TASKS_ONE_YEAR_RANGE", () => {
	it("has the expected shape", () => {
		expect(TASKS_ONE_YEAR_RANGE.from).toEqual({ amount: 1, unit: "year" });
		expect(TASKS_ONE_YEAR_RANGE.to).toEqual({ amount: 14, unit: "day" });
	});
});

// ===========================================================================
// useTasks
// ===========================================================================

describe("useTasks", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	// -------------------------------------------------------------------------
	// Initialisation
	// -------------------------------------------------------------------------

	describe("initialisation", () => {
		it("exposes the expected API surface", () => {
			setupSafeAxiosMock();
			const composable = mountComposable([]);

			expect(composable).toMatchObject({
				isRunning: expect.anything(),
				status: expect.anything(),
				error: expect.anything(),
				fetch: expect.any(Function),
				tasks: expect.anything(),
				draft: expect.anything(),
				overdue: expect.anything(),
				assignedToTeacher: expect.anything(),
				assignedToStudent: expect.anything(),
				withFeedback: expect.anything(),
				feedbackRequired: expect.anything(),
			});
		});

		it("starts with an empty task list", () => {
			setupSafeAxiosMock();
			const { tasks } = mountComposable([{}, false]);
			expect(tasks.value).toEqual([]);
		});
	});

	// -------------------------------------------------------------------------
	// fetch
	// -------------------------------------------------------------------------

	describe("fetch", () => {
		it("populates tasks on successful fetch", async () => {
			const task = makeTask({ id: "t1" });
			const { execute } = setupSafeAxiosMock([task]);

			const { tasks, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(execute).toHaveBeenCalledOnce();
			expect(tasks.value).toHaveLength(1);
			expect(tasks.value[0].id).toBe("t1");
		});

		it("does not update tasks when execute returns success=false", async () => {
			const execute = vi.fn().mockResolvedValue({ success: false, result: undefined });
			mockUseSafeAxiosTask.mockReturnValue(
				mockComposable(useSafeAxiosTask, { execute, isRunning: false, error: null, status: "idle" })
			);

			const { tasks, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(tasks.value).toEqual([]);
		});

		it("calls fetch automatically on mount when fetchImmediate=true", async () => {
			const task = makeTask({ id: "auto" });
			const { execute } = setupSafeAxiosMock([task]);

			// Mount triggers onMounted → fetch
			mountComposable([{}]); // fetchImmediate defaults to true

			// Let microtasks flush
			await vi.waitFor(() => expect(execute).toHaveBeenCalledOnce());
		});

		it("does NOT auto-fetch when fetchImmediate=false", () => {
			const { execute } = setupSafeAxiosMock();
			mountComposable([{}, false]);
			expect(execute).not.toHaveBeenCalled();
		});
	});

	// -------------------------------------------------------------------------
	// tasks (range filtering)
	// -------------------------------------------------------------------------

	describe("tasks computed – range filtering", () => {
		const futureTask = makeTask({ id: "future", dueDate: nowUtc().add(5, "day").toISOString() });
		const pastTask = makeTask({ id: "past", dueDate: nowUtc().subtract(2, "year").toISOString() });
		const farFutureTask = makeTask({ id: "far-future", dueDate: nowUtc().add(1, "year").toISOString() });
		const noDueDate = makeTask({ id: "no-due" });

		it("returns all tasks when no range is provided", async () => {
			setupSafeAxiosMock([futureTask, pastTask, noDueDate]);
			const { tasks, fetch } = mountComposable([{}, false]);
			await fetch();
			expect(tasks.value).toHaveLength(3);
		});

		it("filters tasks outside the range window", async () => {
			setupSafeAxiosMock([futureTask, pastTask, farFutureTask, noDueDate]);
			const { tasks, fetch } = mountComposable([{ range: TASKS_ONE_YEAR_RANGE }, false]);
			await fetch();

			const ids = tasks.value.map((t) => t.id);
			expect(ids).toContain("future");
			expect(ids).toContain("no-due"); // tasks without dueDate pass through
			expect(ids).not.toContain("past");
			expect(ids).not.toContain("far-future");
		});

		it("sorts filtered tasks by dueDate ascending", async () => {
			const t1 = makeTask({ id: "t1", dueDate: nowUtc().add(3, "day").toISOString() });
			const t2 = makeTask({ id: "t2", dueDate: nowUtc().add(1, "day").toISOString() });
			setupSafeAxiosMock([t1, t2]);

			const { tasks, fetch } = mountComposable([{ range: TASKS_ONE_YEAR_RANGE }, false]);
			await fetch();

			expect(tasks.value.map((t) => t.id)).toEqual(["t2", "t1"]);
		});
	});

	// -------------------------------------------------------------------------
	// draft / notDraft
	// -------------------------------------------------------------------------

	describe("draft", () => {
		it("contains only draft tasks", async () => {
			const draftTask = makeTask({
				id: "draft",
				status: { isDraft: true, submitted: 0, graded: 0, maxSubmissions: 1 },
			});
			const liveTask = makeTask({ id: "live" });
			setupSafeAxiosMock([draftTask, liveTask]);

			const { draft, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(draft.value.map((t) => t.id)).toEqual(["draft"]);
		});
	});

	// -------------------------------------------------------------------------
	// assignedToTeacher
	// -------------------------------------------------------------------------

	describe("assignedToTeacher", () => {
		it("includes tasks where submitted < maxSubmissions", async () => {
			const task = makeTask({ status: { isDraft: false, submitted: 0, graded: 0, maxSubmissions: 3 } });
			setupSafeAxiosMock([task]);

			const { assignedToTeacher, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(assignedToTeacher.value).toHaveLength(1);
		});

		it("excludes tasks where submitted equals maxSubmissions", async () => {
			const task = makeTask({ status: { isDraft: false, submitted: 2, graded: 0, maxSubmissions: 2 } });
			setupSafeAxiosMock([task]);

			const { assignedToTeacher, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(assignedToTeacher.value).toHaveLength(0);
		});

		it("excludes draft tasks", async () => {
			const task = makeTask({ status: { isDraft: true, submitted: 0, graded: 0, maxSubmissions: 1 } });
			setupSafeAxiosMock([task]);

			const { assignedToTeacher, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(assignedToTeacher.value).toHaveLength(0);
		});
	});

	// -------------------------------------------------------------------------
	// assignedToStudent
	// -------------------------------------------------------------------------

	describe("assignedToStudent", () => {
		it("includes non-draft, non-hidden, non-overdue tasks with 0 submissions and 0 graded", async () => {
			const task = makeTask({
				dueDate: nowUtc().add(1, "day").toISOString(),
				lessonHidden: false,
				status: { isDraft: false, submitted: 0, graded: 0, maxSubmissions: 1 },
			});
			setupSafeAxiosMock([task]);

			const { assignedToStudent, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(assignedToStudent.value).toHaveLength(1);
		});

		it("excludes overdue tasks", async () => {
			const task = makeTask({
				dueDate: nowUtc().subtract(1, "day").toISOString(),
				status: { isDraft: false, submitted: 0, graded: 0, maxSubmissions: 1 },
			});
			setupSafeAxiosMock([task]);

			const { assignedToStudent, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(assignedToStudent.value).toHaveLength(0);
		});

		it("excludes tasks with lessonHidden=true", async () => {
			const task = makeTask({
				dueDate: nowUtc().add(1, "day").toISOString(),
				lessonHidden: true,
				status: { isDraft: false, submitted: 0, graded: 0, maxSubmissions: 1 },
			});
			setupSafeAxiosMock([task]);

			const { assignedToStudent, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(assignedToStudent.value).toHaveLength(0);
		});

		it("excludes tasks that already have submissions", async () => {
			const task = makeTask({
				dueDate: nowUtc().add(1, "day").toISOString(),
				status: { isDraft: false, submitted: 1, graded: 0, maxSubmissions: 2 },
			});
			setupSafeAxiosMock([task]);

			const { assignedToStudent, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(assignedToStudent.value).toHaveLength(0);
		});
	});

	// -------------------------------------------------------------------------
	// overdue
	// -------------------------------------------------------------------------

	describe("overdue", () => {
		it("contains non-draft tasks past their dueDate", async () => {
			const overdueTask = makeTask({ dueDate: nowUtc().subtract(1, "day").toISOString() });
			const futureTask = makeTask({ id: "future", dueDate: nowUtc().add(1, "day").toISOString() });
			setupSafeAxiosMock([overdueTask, futureTask]);

			const { overdue, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(overdue.value).toHaveLength(1);
			expect(overdue.value[0].id).toBe("task-1");
		});

		it("excludes draft tasks even if overdue", async () => {
			const task = makeTask({
				dueDate: nowUtc().subtract(1, "day").toISOString(),
				status: { isDraft: true, submitted: 0, graded: 0, maxSubmissions: 1 },
			});
			setupSafeAxiosMock([task]);

			const { overdue, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(overdue.value).toHaveLength(0);
		});
	});

	// -------------------------------------------------------------------------
	// feedbackRequired
	// -------------------------------------------------------------------------

	describe("feedbackRequired", () => {
		it("includes overdue tasks where submitted > graded and graded < maxSubmissions", async () => {
			const task = makeTask({
				dueDate: nowUtc().subtract(1, "day").toISOString(),
				status: { isDraft: false, submitted: 2, graded: 1, maxSubmissions: 3 },
			});
			setupSafeAxiosMock([task]);

			const { feedbackRequired, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(feedbackRequired.value).toHaveLength(1);
		});

		it("includes tasks without dueDate where submitted > 0 and graded < maxSubmissions", async () => {
			const task = makeTask({
				dueDate: null,
				status: { isDraft: false, submitted: 1, graded: 0, maxSubmissions: 2 },
			});
			setupSafeAxiosMock([task]);

			const { feedbackRequired, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(feedbackRequired.value).toHaveLength(1);
		});

		it("excludes tasks where graded equals maxSubmissions", async () => {
			const task = makeTask({
				dueDate: nowUtc().subtract(1, "day").toISOString(),
				status: { isDraft: false, submitted: 2, graded: 2, maxSubmissions: 2 },
			});
			setupSafeAxiosMock([task]);

			const { feedbackRequired, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(feedbackRequired.value).toHaveLength(0);
		});

		it("excludes overdue tasks where submitted equals graded", async () => {
			const task = makeTask({
				dueDate: nowUtc().subtract(1, "day").toISOString(),
				status: { isDraft: false, submitted: 1, graded: 1, maxSubmissions: 2 },
			});
			setupSafeAxiosMock([task]);

			const { feedbackRequired, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(feedbackRequired.value).toHaveLength(0);
		});
	});

	// -------------------------------------------------------------------------
	// withFeedback
	// -------------------------------------------------------------------------

	describe("withFeedback", () => {
		it("includes non-draft tasks where graded > 0", async () => {
			const task = makeTask({ status: { isDraft: false, submitted: 1, graded: 1, maxSubmissions: 1 } });
			setupSafeAxiosMock([task]);

			const { withFeedback, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(withFeedback.value).toHaveLength(1);
		});

		it("excludes tasks where graded is 0", async () => {
			const task = makeTask({ status: { isDraft: false, submitted: 0, graded: 0, maxSubmissions: 1 } });
			setupSafeAxiosMock([task]);

			const { withFeedback, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(withFeedback.value).toHaveLength(0);
		});

		it("excludes draft tasks even if graded > 0", async () => {
			const task = makeTask({ status: { isDraft: true, submitted: 1, graded: 1, maxSubmissions: 1 } });
			setupSafeAxiosMock([task]);

			const { withFeedback, fetch } = mountComposable([{}, false]);
			await fetch();

			expect(withFeedback.value).toHaveLength(0);
		});
	});
});

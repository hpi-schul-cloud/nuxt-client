import TasksOverviewListItemStudent from "./TasksOverviewListItemStudent.vue";
import { createTestAppStore, mockComposable, taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { TaskResponse } from "@api-server";
import { useTaskActions, useTasksOfOverview } from "@data-tasks";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed } from "vue";

vi.mock("@data-tasks");

describe("TasksOverviewListItemStudent", () => {
	let useTasksOfOverviewMock: Mocked<ReturnType<typeof useTasksOfOverview>>;
	let useTaskActionsMock: Mocked<ReturnType<typeof useTaskActions>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();

		useTasksOfOverviewMock = mockComposable(useTasksOfOverview, {
			fetchTasks: vi.fn(),
			fetchFinishedTasks: vi.fn(),
		});
		useTaskActionsMock = mockComposable(useTaskActions, {
			isMutating: computed(() => false),
			finishTask: vi.fn(),
			restoreFinishedTask: vi.fn(),
		});

		vi.mocked(useTasksOfOverview).mockReturnValue(useTasksOfOverviewMock);
		vi.mocked(useTaskActions).mockReturnValue(useTaskActionsMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (props: { task: TaskResponse } = { task: taskResponseFactory.build() }) =>
		mount(TasksOverviewListItemStudent, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

	describe("due date label", () => {
		it("should not display due date label if task has no dueDate", () => {
			const task = taskResponseFactory.build({ dueDate: undefined });
			const wrapper = setup({ task });

			const dueDateLabel = wrapper.find("[data-testid='due-date-label']");
			expect(dueDateLabel.text()).toBe("");
		});

		it("should display due date label if task has dueDate", () => {
			const task = taskResponseFactory.build({ dueDate: "2024-04-20T14:00:00.000Z" });
			const wrapper = setup({ task });

			const dueDateLabel = wrapper.find("[data-testid='due-date-label']");
			expect(dueDateLabel.text()).toContain("pages.tasks.labels.due");
		});
	});

	describe("topic", () => {
		it("should display topic when task has lessonName", () => {
			const lessonName = "Painting";
			const task = taskResponseFactory.build({ lessonName });
			const wrapper = setup({ task });

			expect(wrapper.text()).toContain("common.words.topic");
			expect(wrapper.text()).toContain(lessonName);
		});

		it("should not display topic when task has no lessonName", () => {
			const task = taskResponseFactory.build({ lessonName: undefined });
			const wrapper = setup({ task });

			expect(wrapper.text()).not.toContain("common.words.topic");
		});
	});

	describe("task label", () => {
		it("should display course name as task label", () => {
			const courseName = "Art";
			const task = taskResponseFactory.build({ courseName });
			const wrapper = setup({ task });

			const taskSubtitle = wrapper.find("[data-testid='task-subtitle']");
			expect(taskSubtitle.text()).toBe(courseName);
		});
	});

	describe("task title", () => {
		it("should display task name", () => {
			const taskName = "Draw a picture";
			const task = taskResponseFactory.build({ name: taskName });
			const wrapper = setup({ task });

			const taskTitle = wrapper.find("[data-testid='taskTitle']");
			expect(taskTitle.text()).toBe(taskName);
		});
	});
});

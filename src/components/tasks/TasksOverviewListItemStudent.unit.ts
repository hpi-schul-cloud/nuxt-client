import TasksOverviewListItemStudent from "./TasksOverviewListItemStudent.vue";
import { createTestAppStore, taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { TaskResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeAll } from "vitest";

describe("TasksOverviewListItemStudent", () => {
	beforeAll(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
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

			const dueDateLabel = wrapper.find("[data-test-id='dueDateLabel']");
			expect(dueDateLabel.text()).toBe("");
		});

		it("should display due date label if task has dueDate", () => {
			const task = taskResponseFactory.build({ dueDate: "2024-04-20T14:00:00.000Z" });
			const wrapper = setup({ task });

			const dueDateLabel = wrapper.find("[data-test-id='dueDateLabel']");
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

			const task-subtitle = wrapper.find("[data-testid='task-subtitle']");
			expect(task-subtitle.text()).toBe(courseName);
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

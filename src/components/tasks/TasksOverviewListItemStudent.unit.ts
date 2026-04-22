import TasksOverviewListItemStudent from "./TasksOverviewListItemStudent.vue";
import { createTestAppStore, taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { TaskResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeAll } from "vitest";

// TODO: WRITE TASK TESTS

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

	it("Should display no due date label if task has no dueDate", () => {
		// Test due date label is not displayed
		// const dueDateLabel = wrapper.find("[data-test-id='dueDateLabel']");
		// expect(dueDateLabel.text()).toBe("");
	});

	it("Should display due date label if task has dueDate", () => {
		// Test due date label is displayed
	});

	it("should display topic", () => {
		// Test topic is displayed
		const wrapper = setup();

		expect(wrapper.text()).toContain("offencommon.words.topic Malen nach Zahlen");
	});
});

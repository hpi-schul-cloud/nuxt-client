import DashboardTasksAssigned from "./DashboardTasksAssigned.vue";
import { taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("DashboardTasksAssigned", () => {
	const setup = (tasks = [taskResponseFactory.build()]) => {
		const wrapper = shallowMount(DashboardTasksAssigned, {
			props: { tasks, title: "Any Title", emptyMsg: "Any Empty Message" },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});
		return { wrapper };
	};

	it("shows empty state when no tasks", () => {
		const { wrapper } = setup([]);

		expect(wrapper.find("[data-testid='empty-state-tasks']").exists()).toBe(true);
		expect(wrapper.find("[data-testid='assigned-tasks']").exists()).toBe(false);
	});

	it("shows tasks section when tasks exist", () => {
		const tasks = [taskResponseFactory.build({ id: "1" })];
		const { wrapper } = setup(tasks);

		expect(wrapper.find("[data-testid='assigned-tasks']").exists()).toBe(true);
		expect(wrapper.find("[data-testid='empty-state-tasks']").exists()).toBe(false);
	});
});

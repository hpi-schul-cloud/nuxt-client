import DashboardTasksSection from "./DashboardTasksSection.vue";
import { dateFromToday } from "@/utils/date-time.utils";
import { taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("DashboardTasksSection", () => {
	const setup = (tasks = [taskResponseFactory.build()]) => {
		const wrapper = shallowMount(DashboardTasksSection, {
			props: { title: "My Tasks", tasks },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});
		return { wrapper };
	};

	it("renders the title", () => {
		const { wrapper } = setup();
		expect(wrapper.find("[data-testid='dashboard-tasks-title']").text()).toBe("My Tasks");
	});

	it("renders task cards for each task", () => {
		const tasks = [
			taskResponseFactory.build({ id: "1", name: "Task 1" }),
			taskResponseFactory.build({ id: "2", name: "Task 2" }),
		];
		const { wrapper } = setup(tasks);

		const taskNames = wrapper.findAll("[data-testid='task-name']");
		expect(taskNames).toHaveLength(2);
		expect(taskNames[0].text()).toBe("Task 1");
		expect(taskNames[1].text()).toBe("Task 2");
	});

	it("shows overdue chip for overdue tasks", () => {
		const overdueTask = taskResponseFactory.build({
			dueDate: dateFromToday(-1, "day"),
		});
		const { wrapper } = setup([overdueTask]);

		expect(wrapper.find("[data-testid='task-overdue']").exists()).toBe(true);
	});

	it("does not show overdue chip for future tasks", () => {
		const futureTask = taskResponseFactory.build({
			dueDate: dateFromToday(5, "day"),
		});
		const { wrapper } = setup([futureTask]);

		expect(wrapper.find("[data-testid='task-overdue']").exists()).toBe(false);
	});

	it("shows submitted and graded chips when maxSubmissions exists", () => {
		const taskWithSubmissions = taskResponseFactory.build({
			status: { maxSubmissions: 10, submitted: 5, graded: 2 },
		});
		const { wrapper } = setup([taskWithSubmissions]);

		expect(wrapper.find("[data-testid='task-submitted']").exists()).toBe(true);
		expect(wrapper.find("[data-testid='task-graded']").exists()).toBe(true);
	});

	it("does not show submission chips when maxSubmissions is 0", () => {
		const taskWithoutSubmissions = taskResponseFactory.build({
			status: { maxSubmissions: 0 },
		});
		const { wrapper } = setup([taskWithoutSubmissions]);

		expect(wrapper.find("[data-testid='task-submitted']").exists()).toBe(false);
		expect(wrapper.find("[data-testid='task-graded']").exists()).toBe(false);
	});
});

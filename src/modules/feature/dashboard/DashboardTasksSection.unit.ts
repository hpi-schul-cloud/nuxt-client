import DashboardTasksSection from "./DashboardTasksSection.vue";
import TaskChipsStudent from "@/components/tasks/task-chips/TaskChipsStudent.vue";
import TaskChipsTeacher from "@/components/tasks/task-chips/TaskChipsTeacher.vue";
import { createTestAppStoreWithRole, taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoleName } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { describe, expect, it } from "vitest";

describe("DashboardTasksSection", () => {
	const setup = (tasks = [taskResponseFactory.build()], role: RoleName = RoleName.TEACHER) => {
		setActivePinia(createTestingPinia());
		createTestAppStoreWithRole(role);

		const wrapper = shallowMount(DashboardTasksSection, {
			props: { title: "My Tasks", tasks },
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
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

	it("renders TaskChipsTeacher for teacher role", () => {
		const { wrapper } = setup([taskResponseFactory.build()], RoleName.TEACHER);

		expect(wrapper.findComponent(TaskChipsTeacher).exists()).toBe(true);
		expect(wrapper.findComponent(TaskChipsStudent).exists()).toBe(false);
	});

	it("renders TaskChipsStudent for student role", () => {
		const { wrapper } = setup([taskResponseFactory.build()], RoleName.STUDENT);

		expect(wrapper.findComponent(TaskChipsStudent).exists()).toBe(true);
		expect(wrapper.findComponent(TaskChipsTeacher).exists()).toBe(false);
	});
});

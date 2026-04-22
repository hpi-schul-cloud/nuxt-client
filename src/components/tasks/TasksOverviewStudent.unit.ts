import TasksOverviewList from "./TasksOverviewList.vue";
import TasksOverviewStudent from "./TasksOverviewStudent.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";

describe("TasksOverviewStudent", () => {
	// TODO: WRITE TASK TESTS

	const mountComponent = (options = {}) =>
		shallowMount(TasksOverviewStudent, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});

	it("Should render tasks list component", () => {
		const wrapper = mountComponent();

		expect(wrapper.findComponent(TasksOverviewList).exists()).toBe(true);
	});
});

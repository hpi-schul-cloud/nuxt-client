import TasksOverviewList from "./TasksOverviewList.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeAll } from "vitest";

// TODO: WRITE TASK TESTS

describe("TasksOverviewList", () => {
	// Put it the correct input props (tasks)
	const setup = (tasks = {}) =>
		mount(TasksOverviewList, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	it("Should render an empty list, if there are no tasks", () => {
		// Test empty list and empty container
		// expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	it("should passthrough copy-task event", () => {
		// Test emits !
		// const oneTaskItemTeacher = wrapper.findComponent(TasksOverviewListItemTeacher);
		// oneTaskItemTeacher.vm.$emit("copy-task", payload);
		//
		// expect(wrapper.emitted()["copy-task"]?.[0]).toEqual(expect.arrayContaining([payload]));
	});
});

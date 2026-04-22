import TasksOverviewListItemMenu from "./TasksOverviewListItemMenu.vue";
import { createTestEnvStore, taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { TaskResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

// TODO: WRITE TASK TESTS

describe("TasksListItemMenu", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore();
	});

	const setup = (props: { task: TaskResponse } = { task: taskResponseFactory.build() }) =>
		mount(TasksOverviewListItemMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

	describe("computed properties", () => {
		it("should compute correct edit link", () => {
			// Test if edit link href is correct
		});

		it("should compute correct copy link", () => {
			// test copylink
			// expect(wrapper.vm.copyLink).toStrictEqual(`/homework/${task.id}/copy?returnUrl=/tasks`);
		});
	});

	// Test EMITS

	// Test if menu btns are not displayed, when the conditions arent met
});

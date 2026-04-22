import TasksOverviewListItemMenu from "./TasksOverviewListItemMenu.vue";
import TasksOverviewListItemTeacher from "./TasksOverviewListItemTeacher.vue";
import { CopyParamsTypeEnum } from "@/store/copy";
import { createTestAppStore, taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { TaskResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeAll } from "vitest";

describe("TasksOverviewListItemTeacher", () => {
	// TODO: WRITE TASK TESTS
	beforeAll(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
	});

	const setup = (props: { task: TaskResponse } = { task: taskResponseFactory.build() }) =>
		mount(TasksOverviewListItemTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: props,
		});

	it("should passthrough copy-task event", () => {
		const wrapper = setup();
		const payload = {
			id: "123",
			courseId: "c789",
			type: CopyParamsTypeEnum.Task,
		};

		const oneTaskItemMenu = wrapper.findComponent(TasksOverviewListItemMenu);
		oneTaskItemMenu.vm.$emit("copy-task", payload);

		expect(wrapper.emitted()["copy-task"]?.[0]).toStrictEqual(expect.arrayContaining([payload]));
	});

	describe("when task is a draft task", () => {
		describe("when task has no course", () => {
			it("should set course name to 'no course assigned'", () => {
				// test tasklabel includes pages.tasks.labels.noCourse
			});

			it("should show createdAt date in label", () => {
				// test tasklabel includes createAt date
			});

			describe("when teacher is a subtitution teacher", () => {
				it("should add 'substitution' to the course label", () => {
					// test tasklabel includes substituion
				});
			});
		});
	});

	describe("when task is not a draft task", () => {
		it("should set course name correctly", () => {
			// test course name is correct when its not a draft
		});
	});

	describe("when a task is planned", () => {
		it("should set isPlanned to true", () => {
			// test course name is correct when its planned
		});

		it("should show planned label", () => {
			// test task label is correct when  its planned
		});
	});

	describe("when a task is without due date", () => {
		it("should show correct due date label", () => {
			// test task label is correct when there is no due date
		});
	});

	describe("when a task has a due date", () => {
		it("should show correct due date label", () => {
			// test task label is correct when there is a due date
		});
	});

	describe("when a task has a topic", () => {
		it("should show correct topic label", () => {
			// test topic label when task has a topic
		});
	});

	describe("when a task has no topic", () => {
		it("should show correct topic label", () => {
			// test topic label when task has no topic
		});
	});
});

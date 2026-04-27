import TaskChipsStudent from "./TaskChipsStudent.vue";
import { taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { TaskResponse } from "@api-server";
import { ChipTimeRemaining } from "@ui-chip";
import { mount } from "@vue/test-utils";

describe("TaskChipsStudent", () => {
	const setup = (task: TaskResponse) =>
		mount(TaskChipsStudent, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { task },
		});

	describe("due soon chip", () => {
		it("should show due soon chip when task is due within 24 hours and not submitted", () => {
			const dueSoonDate = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(); // 12 hours
			const task = taskResponseFactory.build({
				dueDate: dueSoonDate,
				status: { isDraft: false },
			});
			const wrapper = setup(task);

			expect(wrapper.findComponent(ChipTimeRemaining).exists()).toBe(true);
		});

		it("should not show due soon chip when task is already submitted", () => {
			const dueSoonDate = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
			const task = taskResponseFactory.build({
				dueDate: dueSoonDate,
				status: {
					isDraft: false,
					submitted: 1,
				},
			});
			const wrapper = setup(task);

			expect(wrapper.findComponent(ChipTimeRemaining).exists()).toBe(false);
		});

		it("should not show due soon chip when task is due in more than 24 hours", () => {
			const laterDate = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(); // 48 hours
			const task = taskResponseFactory.build({
				dueDate: laterDate,
				status: { isDraft: false },
			});
			const wrapper = setup(task);

			expect(wrapper.findComponent(ChipTimeRemaining).exists()).toBe(false);
		});

		it("should not show due soon chip when task has no due date", () => {
			const task = taskResponseFactory.build({ dueDate: undefined });
			const wrapper = setup(task);

			expect(wrapper.findComponent(ChipTimeRemaining).exists()).toBe(false);
		});
	});

	describe("submitted chip", () => {
		it("should show submitted chip when task is submitted", () => {
			const task = taskResponseFactory.build({
				status: {
					isDraft: false,
					submitted: 1,
					graded: 0,
				},
			});
			const wrapper = setup(task);

			const submittedChip = wrapper.find("[data-testid='task-submitted-student']");
			expect(submittedChip.exists()).toBe(true);
		});

		it("should not show submitted chip when task is not submitted", () => {
			const task = taskResponseFactory.build({
				status: {
					submitted: 0,
					graded: 0,
				},
			});
			const wrapper = setup(task);

			expect(wrapper.find("[data-testid='task-submitted-student']").exists()).toBe(false);
		});
	});

	describe("graded chip", () => {
		it("should show graded chip when task is graded", () => {
			const task = taskResponseFactory.build({
				status: {
					submitted: 1,
					graded: 1,
				},
			});
			const wrapper = setup(task);

			const gradedChip = wrapper.find("[data-testid='task-graded-student']");
			expect(gradedChip.exists()).toBe(true);
		});

		it("should not show graded chip when task is not graded", () => {
			const task = taskResponseFactory.build({
				status: {
					submitted: 1,
					graded: 0,
				},
			});
			const wrapper = setup(task);

			expect(wrapper.find("[data-testid='task-graded-student']").exists()).toBe(false);
		});
	});

	describe("overdue chip", () => {
		it("should show overdue chip when task is overdue and not submitted", () => {
			const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
			const task = taskResponseFactory.build({
				dueDate: pastDate,
				status: {
					submitted: 0,
					graded: 0,
				},
			});
			const wrapper = setup(task);

			const overdueChip = wrapper.find("[data-testid='task-overdue-student']");
			expect(overdueChip.exists()).toBe(true);
		});

		it("should not show overdue chip when task is overdue but already submitted", () => {
			const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
			const task = taskResponseFactory.build({
				dueDate: pastDate,
				status: {
					submitted: 1,
					graded: 0,
				},
			});
			const wrapper = setup(task);

			expect(wrapper.find("[data-testid='task-overdue-student']").exists()).toBe(false);
		});

		it("should not show overdue chip when task is not overdue", () => {
			const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
			const task = taskResponseFactory.build({
				dueDate: futureDate,
				status: {
					submitted: 0,
					graded: 0,
				},
			});
			const wrapper = setup(task);

			expect(wrapper.find("[data-testid='task-overdue-student']").exists()).toBe(false);
		});

		it("should not show overdue chip when task has no due date", () => {
			const task = taskResponseFactory.build({ dueDate: undefined });
			const wrapper = setup(task);

			expect(wrapper.find("[data-testid='task-overdue-student']").exists()).toBe(false);
		});
	});
});

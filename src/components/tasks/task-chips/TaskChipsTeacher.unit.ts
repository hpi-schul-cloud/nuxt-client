import TaskChipsTeacher from "./TaskChipsTeacher.vue";
import { taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { TaskResponse } from "@api-server";
import { mount } from "@vue/test-utils";

describe("TaskChipsTeacher", () => {
	const setup = (task: TaskResponse) =>
		mount(TaskChipsTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { task },
		});

	describe("when task is a draft", () => {
		it("should not show any status chips", () => {
			const task = taskResponseFactory.build({
				status: { isDraft: true },
			});
			const wrapper = setup(task);

			expect(wrapper.find("[data-testid='task-done-teacher']").exists()).toBe(false);
			expect(wrapper.find("[data-testid='task-submitted-teacher']").exists()).toBe(false);
			expect(wrapper.find("[data-testid='task-graded-teacher']").exists()).toBe(false);
		});
	});

	describe("when task is published", () => {
		describe("done chip", () => {
			it("should show done chip when all submitted tasks are graded", () => {
				const task = taskResponseFactory.build({
					status: {
						isDraft: false,
						submitted: 5,
						graded: 5,
					},
				});
				const wrapper = setup(task);

				const doneChip = wrapper.find("[data-testid='task-done-teacher']");
				expect(doneChip.exists()).toBe(true);
			});

			it("should not show done chip when not all submitted tasks are graded", () => {
				const task = taskResponseFactory.build({
					status: {
						isDraft: false,
						submitted: 5,
						graded: 3,
					},
				});
				const wrapper = setup(task);

				expect(wrapper.find("[data-testid='task-done-teacher']").exists()).toBe(false);
			});

			it("should not show done chip when no submissions", () => {
				const task = taskResponseFactory.build({
					status: {
						isDraft: false,
						submitted: 0,
						graded: 0,
					},
				});
				const wrapper = setup(task);

				expect(wrapper.find("[data-testid='task-done-teacher']").exists()).toBe(false);
			});
		});

		describe("submitted chip", () => {
			it("should show submitted chip when maxSubmissions is set", () => {
				const task = taskResponseFactory.build({
					status: {
						isDraft: false,
						submitted: 3,
						maxSubmissions: 10,
						graded: 0,
					},
				});
				const wrapper = setup(task);

				const submittedChip = wrapper.find("[data-testid='task-submitted-teacher']");
				expect(submittedChip.exists()).toBe(true);
				expect(submittedChip.text()).toContain("3/10");
			});

			it("should not show submitted chip when maxSubmissions is 0", () => {
				const task = taskResponseFactory.build({
					status: {
						isDraft: false,
						isSubstitutionTeacher: false,
						isFinished: false,
						submitted: 0,
						maxSubmissions: 0,
						graded: 0,
					},
				});
				const wrapper = setup(task);

				expect(wrapper.find("[data-testid='task-submitted-teacher']").exists()).toBe(false);
			});
		});

		describe("graded chip", () => {
			it("should show graded chip when there are submissions", () => {
				const task = taskResponseFactory.build({
					status: {
						isDraft: false,
						submitted: 5,
						maxSubmissions: 10,
						graded: 2,
					},
				});
				const wrapper = setup(task);

				const gradedChip = wrapper.find("[data-testid='task-graded-teacher']");
				expect(gradedChip.exists()).toBe(true);
				expect(gradedChip.text()).toContain("2/5");
			});

			it("should not show graded chip when no submissions", () => {
				const task = taskResponseFactory.build({
					status: {
						isDraft: false,
						submitted: 0,
						maxSubmissions: 10,
						graded: 0,
					},
				});
				const wrapper = setup(task);

				expect(wrapper.find("[data-testid='task-graded-teacher']").exists()).toBe(false);
			});
		});
	});

	describe("overdue chip", () => {
		it("should show overdue chip when task is overdue", () => {
			const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
			const task = taskResponseFactory.build({
				dueDate: pastDate,
				status: { isDraft: false },
			});
			const wrapper = setup(task);

			const overdueChip = wrapper.find("[data-testid='task-overdue-teacher']");
			expect(overdueChip.exists()).toBe(true);
			expect(overdueChip.text()).toContain("pages.tasks.overdue");
		});

		it("should not show overdue chip when task is not overdue", () => {
			const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
			const task = taskResponseFactory.build({
				dueDate: futureDate,
				status: { isDraft: false },
			});
			const wrapper = setup(task);

			expect(wrapper.find("[data-testid='task-overdue-teacher']").exists()).toBe(false);
		});

		it("should not show overdue chip when task has no due date", () => {
			const task = taskResponseFactory.build({
				dueDate: undefined,
				status: { isDraft: false },
			});
			const wrapper = setup(task);

			expect(wrapper.find("[data-testid='task-overdue-teacher']").exists()).toBe(false);
		});
	});

	describe("unpublished lesson chip", () => {
		it("should show unpublished lesson chip when lesson is hidden", () => {
			const task = taskResponseFactory.build({
				lessonHidden: true,
				status: { isDraft: false },
			});
			const wrapper = setup(task);

			const lessonChip = wrapper.find("[data-testid='task-lesson-chip-large']");
			expect(lessonChip.exists()).toBe(true);
			expect(lessonChip.text()).toContain("components.molecules.TaskItemTeacher.lessonIsNotPublished");
		});

		it("should not show unpublished lesson chip when lesson is visible", () => {
			const task = taskResponseFactory.build({
				lessonHidden: false,
				status: { isDraft: false },
			});
			const wrapper = setup(task);

			expect(wrapper.find("[data-testid='task-lesson-chip-large']").exists()).toBe(false);
		});

		it("should not show unpublished lesson chip when task is a draft", () => {
			const task = taskResponseFactory.build({
				lessonHidden: true,
				status: { isDraft: true },
			});
			const wrapper = setup(task);

			expect(wrapper.find("[data-testid='task-lesson-chip-large']").exists()).toBe(false);
		});
	});
});

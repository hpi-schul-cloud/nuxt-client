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
				const task = taskResponseFactory.build({ courseName: undefined });
				const wrapper = setup({ task });

				const taskLabel = wrapper.find("[data-testid='task-label']");
				expect(taskLabel.text()).toContain("pages.tasks.labels.noCourse");
			});

			it("should show createdAt date in label", () => {
				const task = taskResponseFactory.build({
					createdAt: "2024-03-15T10:30:00.000Z",
					status: {
						isDraft: true,
					},
				});
				const wrapper = setup({ task });

				const taskLabel = wrapper.find("[data-testid='task-label']");
				expect(taskLabel.text()).toContain("components.molecules.TaskItemMenu.labels.createdAt");
			});

			describe("when teacher is a substitution teacher", () => {
				it("should add 'substitution' to the course label", () => {
					const task = taskResponseFactory.build({
						courseName: undefined,
						status: { isSubstitutionTeacher: true },
					});
					const wrapper = setup({ task });

					const taskLabel = wrapper.find("[data-testid='task-label']");
					expect(taskLabel.text()).toContain("common.words.substitute");
					expect(taskLabel.text()).toContain("pages.tasks.labels.noCourse");
				});
			});
		});
	});

	describe("when task is not a draft task", () => {
		it("should set course name correctly", () => {
			const courseName = "Mathematik Grundkurs";
			const task = taskResponseFactory.build({
				courseName,
				status: { isDraft: false },
			});
			const wrapper = setup({ task });

			const taskLabel = wrapper.find("[data-testid='task-label']");
			expect(taskLabel.text()).toContain(courseName);
		});
	});

	describe("when a task is planned", () => {
		const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

		it("should show planned label", () => {
			const task = taskResponseFactory.build({
				availableDate: futureDate,
				status: { isDraft: false },
			});
			const wrapper = setup({ task });

			const taskLabel = wrapper.find("[data-testid='task-label']");
			expect(taskLabel.text()).toContain("pages.tasks.labels.planned");
		});
	});

	describe("when a task is without due date", () => {
		it("should show correct due date label", () => {
			const task = taskResponseFactory.build({
				dueDate: undefined,
				availableDate: undefined,
				status: { isDraft: false },
			});
			const wrapper = setup({ task });

			const taskLabel = wrapper.find("[data-testid='task-label']");
			expect(taskLabel.text()).not.toContain("pages.tasks.labels.due");
			expect(taskLabel.text()).not.toContain("pages.tasks.labels.planned");
		});
	});

	describe("when a task has a due date", () => {
		it("should show correct due date label", () => {
			const dueDate = "2024-04-20T14:00:00.000Z";
			const task = taskResponseFactory.build({
				dueDate,
				status: { isDraft: false },
			});
			const wrapper = setup({ task });

			const taskLabel = wrapper.find("[data-testid='task-label']");
			expect(taskLabel.text()).toContain("pages.tasks.labels.due");
		});
	});

	describe("when a task has a topic", () => {
		it("should show correct topic label", () => {
			const lessonName = "Algebra Basics";
			const task = taskResponseFactory.build({ lessonName });
			const wrapper = setup({ task });

			const topicLabel = wrapper.find("[data-testid='task-topic']");
			expect(topicLabel.exists()).toBe(true);
			expect(topicLabel.text()).toContain("common.words.topic");
			expect(topicLabel.text()).toContain(lessonName);
		});
	});

	describe("when a task has no topic", () => {
		it("should not show topic label", () => {
			const task = taskResponseFactory.build({
				lessonName: undefined,
			});
			const wrapper = setup({ task });

			const topicLabel = wrapper.find("[data-testid='task-topic']");
			expect(topicLabel.exists()).toBe(false);
		});
	});
});

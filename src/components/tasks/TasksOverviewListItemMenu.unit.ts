import TasksOverviewListItemMenu from "./TasksOverviewListItemMenu.vue";
import { CopyParamsTypeEnum } from "@/store/copy";
import { createTestAppStoreWithRole, createTestEnvStore, taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoleName, TaskResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

describe("TasksListItemMenu", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (
		props: { task: TaskResponse } = { task: taskResponseFactory.build() },
		options: {
			role?: RoleName;
			copyServiceEnabled?: boolean;
			shareTaskEnabled?: boolean;
		} = {}
	) => {
		const { role = RoleName.TEACHER, copyServiceEnabled = false, shareTaskEnabled = false } = options;

		createTestAppStoreWithRole(role);
		createTestEnvStore({
			FEATURE_COPY_SERVICE_ENABLED: copyServiceEnabled,
			FEATURE_TASK_SHARE: shareTaskEnabled,
		});

		return mount(TasksOverviewListItemMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					KebabMenu: {
						template: "<div><slot /></div>",
					},
				},
			},
			props,
		});
	};

	describe("computed properties", () => {
		it("should compute correct edit link", async () => {
			const task = taskResponseFactory.build({ id: "task-123" });
			const wrapper = setup({ task });

			await wrapper.find("[data-testid='task-menu']").trigger("click");
			const editItem = wrapper.find("[data-testId='task-edit']");

			expect(editItem.attributes("href")).toBe(`/homework/${task.id}/edit`);
		});
	});

	describe("emits", () => {
		it("should emit copy-task when copy button is clicked and copy service is enabled", async () => {
			const task = taskResponseFactory.build({
				id: "task-123",
				courseId: "course-456",
			});
			const wrapper = setup({ task }, { copyServiceEnabled: true });

			await wrapper.find("[data-testid='task-menu']").trigger("click");
			const copyItem = wrapper.find("[data-testId='task-copy']");
			await copyItem.trigger("click");

			expect(wrapper.emitted("copy-task")).toEqual([
				[
					{
						id: task.id,
						courseId: task.courseId,
						type: CopyParamsTypeEnum.Task,
					},
				],
			]);
		});

		it("should emit share-task when share button is clicked", async () => {
			const task = taskResponseFactory.build({ id: "task-123" });
			const wrapper = setup({ task }, { shareTaskEnabled: true });

			await wrapper.find("[data-testid='task-menu']").trigger("click");
			const shareItem = wrapper.find("[data-testId='task-share']");
			await shareItem.trigger("click");

			expect(wrapper.emitted("share-task")).toEqual([[task.id]]);
		});

		it("should emit delete-task when delete button is clicked", async () => {
			const task = taskResponseFactory.build({ id: "task-123" });
			const wrapper = setup({ task });

			await wrapper.find("[data-testid='task-menu']").trigger("click");
			const deleteItem = wrapper.find("[data-testId='task-delete']");
			await deleteItem.trigger("click");

			expect(wrapper.emitted("delete-task")).toEqual([[task.id]]);
		});

		it("should emit finish-task when finish button is clicked and task is not finished", async () => {
			const task = taskResponseFactory.build({
				id: "task-123",
				status: {
					isFinished: false,
					isDraft: false,
					isSubstitutionTeacher: false,
					submitted: 0,
					maxSubmissions: 0,
					graded: 0,
				},
			});
			const wrapper = setup({ task });

			await wrapper.find("[data-testid='task-menu']").trigger("click");
			const finishItem = wrapper.find("[data-testId='task-finish']");
			await finishItem.trigger("click");

			expect(wrapper.emitted("finish-task")).toEqual([[task.id]]);
		});

		it("should emit restore-task when restore button is clicked and task is finished", async () => {
			const task = taskResponseFactory.build({
				id: "task-123",
				status: {
					isFinished: true,
					isDraft: false,
					isSubstitutionTeacher: false,
					submitted: 0,
					maxSubmissions: 0,
					graded: 0,
				},
			});
			const wrapper = setup({ task });

			await wrapper.find("[data-testid='task-menu']").trigger("click");
			const restoreItem = wrapper.find("[data-testId='task-finish']");
			await restoreItem.trigger("click");

			expect(wrapper.emitted("restore-task")).toEqual([[task.id]]);
		});

		it("should emit revert-task when revert button is clicked", async () => {
			const task = taskResponseFactory.build({
				id: "task-123",
				status: {
					isDraft: false,
					isFinished: false,
					isSubstitutionTeacher: false,
					submitted: 0,
					maxSubmissions: 0,
					graded: 0,
				},
			});
			const wrapper = setup({ task });

			await wrapper.find("[data-testid='task-menu']").trigger("click");
			const revertItem = wrapper.find("[data-testId='task-revert']");
			await revertItem.trigger("click");

			expect(wrapper.emitted("revert-task")).toEqual([[task.id]]);
		});
	});

	describe("menu items visibility", () => {
		describe("for teachers", () => {
			it("should show edit button", async () => {
				const wrapper = setup({ task: taskResponseFactory.build() }, { role: RoleName.TEACHER });

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-edit']").exists()).toBe(true);
			});

			it("should show delete button", async () => {
				const wrapper = setup({ task: taskResponseFactory.build() }, { role: RoleName.TEACHER });

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-delete']").exists()).toBe(true);
			});

			it("should show copy button when copy service is enabled", async () => {
				const wrapper = setup(
					{ task: taskResponseFactory.build() },
					{
						role: RoleName.TEACHER,
						copyServiceEnabled: true,
					}
				);

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-copy']").exists()).toBe(true);
			});

			it("should not show copy button when copy service is disabled", async () => {
				const wrapper = setup(
					{ task: taskResponseFactory.build() },
					{
						role: RoleName.TEACHER,
						copyServiceEnabled: false,
					}
				);

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-copy']").exists()).toBe(false);
			});

			it("should show share button when share task is enabled", async () => {
				const wrapper = setup(
					{ task: taskResponseFactory.build() },
					{
						role: RoleName.TEACHER,
						shareTaskEnabled: true,
					}
				);

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-share']").exists()).toBe(true);
			});

			it("should not show share button when share task is disabled", async () => {
				const wrapper = setup(
					{ task: taskResponseFactory.build() },
					{
						role: RoleName.TEACHER,
						shareTaskEnabled: false,
					}
				);

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-share']").exists()).toBe(false);
			});

			it("should show revert button when task is published and not finished", async () => {
				const task = taskResponseFactory.build({
					status: {
						isDraft: false,
						isFinished: false,
						isSubstitutionTeacher: false,
						submitted: 0,
						maxSubmissions: 0,
						graded: 0,
					},
				});
				const wrapper = setup({ task }, { role: RoleName.TEACHER });

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-revert']").exists()).toBe(true);
			});

			it("should not show revert button when task is a draft", async () => {
				const task = taskResponseFactory.build({
					status: {
						isDraft: true,
						isFinished: false,
						isSubstitutionTeacher: false,
						submitted: 0,
						maxSubmissions: 0,
						graded: 0,
					},
				});
				const wrapper = setup({ task }, { role: RoleName.TEACHER });

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-revert']").exists()).toBe(false);
			});

			it("should not show revert button when task is finished", async () => {
				const task = taskResponseFactory.build({
					status: {
						isDraft: false,
						isFinished: true,
						isSubstitutionTeacher: false,
						submitted: 0,
						maxSubmissions: 0,
						graded: 0,
					},
				});
				const wrapper = setup({ task }, { role: RoleName.TEACHER });

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-revert']").exists()).toBe(false);
			});
		});

		describe("for students", () => {
			it("should not show edit button", async () => {
				const wrapper = setup({ task: taskResponseFactory.build() }, { role: RoleName.STUDENT });

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-edit']").exists()).toBe(false);
			});

			it("should not show delete button", async () => {
				const wrapper = setup({ task: taskResponseFactory.build() }, { role: RoleName.STUDENT });

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-delete']").exists()).toBe(false);
			});

			it("should not show copy button", async () => {
				const wrapper = setup(
					{ task: taskResponseFactory.build() },
					{
						role: RoleName.STUDENT,
						copyServiceEnabled: true,
					}
				);

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-copy']").exists()).toBe(false);
			});

			it("should not show share button", async () => {
				const wrapper = setup(
					{ task: taskResponseFactory.build() },
					{
						role: RoleName.STUDENT,
						shareTaskEnabled: true,
					}
				);

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-share']").exists()).toBe(false);
			});

			it("should show finish button", async () => {
				const wrapper = setup({ task: taskResponseFactory.build() }, { role: RoleName.STUDENT });

				await wrapper.find("[data-testid='task-menu']").trigger("click");

				expect(wrapper.find("[data-testId='task-finish']").exists()).toBe(true);
			});
		});

		describe("finish/restore button", () => {
			it("should show finish button when task is not finished", async () => {
				const task = taskResponseFactory.build({
					status: {
						isFinished: false,
						isDraft: false,
						isSubstitutionTeacher: false,
						submitted: 0,
						maxSubmissions: 0,
						graded: 0,
					},
				});
				const wrapper = setup({ task });

				await wrapper.find("[data-testid='task-menu']").trigger("click");
				const finishItem = wrapper.find("[data-testId='task-finish']");

				expect(finishItem.text()).toContain("components.molecules.TaskItemMenu.finish");
			});

			it("should show restore button when task is finished", async () => {
				const task = taskResponseFactory.build({
					status: {
						isFinished: true,
						isDraft: false,
						isSubstitutionTeacher: false,
						submitted: 0,
						maxSubmissions: 0,
						graded: 0,
					},
				});
				const wrapper = setup({ task });

				await wrapper.find("[data-testid='task-menu']").trigger("click");
				const restoreItem = wrapper.find("[data-testId='task-finish']");

				expect(restoreItem.text()).toContain("common.labels.restore");
			});
		});
	});
});

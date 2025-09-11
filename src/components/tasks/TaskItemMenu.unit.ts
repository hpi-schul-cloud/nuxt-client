import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { envConfigModule, finishedTasksModule } from "@/store";
import CopyModule, { CopyParamsTypeEnum } from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import FinishedTasksModule from "@/store/finished-tasks";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import TasksModule from "@/store/tasks";
import { COPY_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { envsFactory } from "@@/tests/test-utils";
import mocks from "@@/tests/test-utils/mockDataTasks";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import { VBtn } from "vuetify/lib/components/index";
import TaskItemMenu from "./TaskItemMenu.vue";

const { tasksTeacher } = mocks;

let tasksModuleMock: TasksModule;
let copyModuleMock: CopyModule;
let loadingStateModuleMock: LoadingStateModule;
let notifierModuleMock: NotifierModule;

const getWrapper = (
	props: {
		taskId: string;
		taskIsFinished: boolean;
		taskIsPublished: boolean;
		userRole: string;
		courseId?: string;
	},
	options = {}
) => {
	return mount(TaskItemMenu, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				tasksModule: tasksModuleMock,
				[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
				loadingStateModule: loadingStateModuleMock,
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
			},
		},
		props,
		...options,
	});
};

describe("@/components/molecules/TaskItemMenu", () => {
	const defineWindowWidth = (width: number) => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: width,
		});
		window.dispatchEvent(new Event("resize"));
	};

	beforeEach(() => {
		setupStores({
			finishedTasksModule: FinishedTasksModule,
			envConfigModule: EnvConfigModule,
		});
		tasksModuleMock = createModuleMocks(TasksModule);
		copyModuleMock = createModuleMocks(CopyModule);
		loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		notifierModuleMock = createModuleMocks(NotifierModule);
	});

	defineWindowWidth(1264);

	describe("props", () => {
		it("should accept valid userRole prop", () => {
			const { validator } = TaskItemMenu.props.userRole;
			const validRoles = ["student", "teacher"];

			validRoles.forEach((task) => {
				expect(validator(task)).toBe(true);
			});
		});

		it("should reject invalid userRole prop", () => {
			const { validator } = TaskItemMenu.props.userRole;
			const invalidRoles = ["admin", "tomato"];

			invalidRoles.forEach((task) => {
				expect(validator(task)).toBe(false);
			});
		});
	});

	describe("computed properties", () => {
		it("should compute correct edit link", () => {
			const task = tasksTeacher[0];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				taskIsPublished: !task.status.isFinished && !task.status.isDraft,
				userRole: "teacher",
			});

			expect(wrapper.vm.editLink).toStrictEqual(`/homework/${task.id}/edit`);
		});

		it("should compute correct copy link", () => {
			const task = tasksTeacher[0];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				taskIsPublished: !task.status.isFinished && !task.status.isDraft,
				userRole: "teacher",
			});

			expect(wrapper.vm.copyLink).toStrictEqual(
				`/homework/${task.id}/copy?returnUrl=/tasks`
			);
		});

		it("should set isTeacher correctly", () => {
			const task = tasksTeacher[0];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				taskIsPublished: !task.status.isFinished && !task.status.isDraft,
				userRole: "teacher",
			});

			expect(wrapper.vm.isTeacher).toBe(true);
		});
	});

	describe("when reverting a published task", () => {
		it("should call revertPublishedTask of TasksModule", async () => {
			const task = tasksTeacher[0];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				taskIsPublished: !task.status.isFinished && !task.status.isDraft,
				userRole: "teacher",
			});

			const menuBtn = wrapper.findComponent(VBtn);
			await menuBtn.trigger("click");

			const finishBtn = wrapper.findComponent("[data-testId=task-revert]");
			await finishBtn.trigger("click");

			expect(tasksModuleMock.revertPublishedTask).toHaveBeenCalled();
		});
	});

	describe("when finishing a task", () => {
		it("should call finishTask of TasksModule", async () => {
			const task = tasksTeacher[0];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				taskIsPublished: !task.status.isFinished && !task.status.isDraft,
				userRole: "teacher",
			});

			const menuBtn = wrapper.findComponent(VBtn);
			await menuBtn.trigger("click");

			const finishBtn = wrapper.findComponent("[data-testId=task-finish]");
			await finishBtn.trigger("click");

			expect(tasksModuleMock.finishTask).toHaveBeenCalled();
		});
	});

	describe("when restoring a task", () => {
		it("should call restoreTask of FinishedTasksModule", async () => {
			const restoreTaskMock = vi
				.spyOn(finishedTasksModule, "restoreTask")
				.mockImplementation(vi.fn());
			const task = tasksTeacher[1];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				taskIsPublished: !task.status.isFinished && !task.status.isDraft,
				userRole: "teacher",
			});

			const menuBtn = wrapper.findComponent(VBtn);
			await menuBtn.trigger("click");

			const finishBtn = wrapper.findComponent("[data-testId=task-finish]");
			await finishBtn.trigger("click");

			expect(restoreTaskMock).toHaveBeenCalled();
		});
	});

	describe("when deleting a task", () => {
		it("should call deleteTask of TasksModule", async () => {
			const task = tasksTeacher[1];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				taskIsPublished: !task.status.isFinished && !task.status.isDraft,
				userRole: "teacher",
			});

			const menuBtn = wrapper.findComponent(VBtn);
			await menuBtn.trigger("click");

			const deleteBtn = wrapper.findComponent("[data-testId=task-delete]");
			await deleteBtn.trigger("click");

			const confirmBtn = wrapper.findComponent(vCustomDialog);
			await confirmBtn.vm.$emit("dialog-confirmed");

			expect(tasksModuleMock.deleteTask).toHaveBeenCalled();
		});
	});

	describe("when copying a task", () => {
		describe("should call copy store method if 'FEATURE_COPY_SERVICE_ENABLED' flag is set to true", () => {
			it("should emit 'copy-task' event with courseId if present", async () => {
				const task = tasksTeacher[1];
				const wrapper = getWrapper({
					taskId: task.id,
					taskIsFinished: task.status.isFinished,
					taskIsPublished: !task.status.isFinished && !task.status.isDraft,
					userRole: "teacher",
					courseId: "18",
				});
				const envs = envsFactory.build({
					FEATURE_COPY_SERVICE_ENABLED: true,
				});
				envConfigModule.setEnvs(envs);

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				const copyBtn = wrapper.findComponent("[data-testId=task-copy]");
				await copyBtn.trigger("click");

				expect(wrapper.emitted("copy-task")).toStrictEqual([
					[
						{
							id: "59cce2c61113d1132c98dc06",
							courseId: "18",
							type: CopyParamsTypeEnum.Task,
						},
					],
				]);
			});

			it("should emit 'copy-task' event without courseId if NOT present", async () => {
				const task = tasksTeacher[1];
				const wrapper = getWrapper({
					taskId: task.id,
					taskIsFinished: task.status.isFinished,
					taskIsPublished: !task.status.isFinished && !task.status.isDraft,
					userRole: "teacher",
				});
				const envs = envsFactory.build({
					FEATURE_COPY_SERVICE_ENABLED: true,
				});
				envConfigModule.setEnvs(envs);

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				const copyBtn = wrapper.findComponent("[data-testId=task-copy]");
				await copyBtn.trigger("click");

				expect(wrapper.emitted("copy-task")).toStrictEqual([
					[
						{
							courseId: undefined,
							id: "59cce2c61113d1132c98dc06",
							type: CopyParamsTypeEnum.Task,
						},
					],
				]);
			});
		});

		it("should not find copy option if 'FEATURE_COPY_SERVICE_ENABLED' flag is set to false", async () => {
			const task = tasksTeacher[1];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				taskIsPublished: !task.status.isFinished && !task.status.isDraft,
				userRole: "teacher",
			});
			const envs = envsFactory.build({
				FEATURE_COPY_SERVICE_ENABLED: false,
			});
			envConfigModule.setEnvs(envs);

			const menuBtn = wrapper.findComponent(VBtn);
			await menuBtn.trigger("click");

			const copyBtn = wrapper.findAllComponents("[data-testId=task-copy]");

			expect(copyBtn).toHaveLength(0);
		});
	});
});

import { envConfigModule, finishedTasksModule } from "@/store";
import CopyModule, { CopyParamsTypeEnum } from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import FinishedTasksModule from "@/store/finished-tasks";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import TasksModule from "@/store/tasks";
import { createModuleMocks } from "@/utils/mock-store-module";
import mocks from "@@/tests/test-utils/mockDataTasks";
import setupStores from "@@/tests/test-utils/setupStores";
import TaskItemMenu from "./TaskItemMenu";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";

const { tasksTeacher } = mocks;

const defineWindowWidth = (width) => {
	Object.defineProperty(window, "innerWidth", {
		writable: true,
		configurable: true,
		value: width,
	});
	window.dispatchEvent(new Event("resize"));
};

let tasksModuleMock;
let copyModuleMock;
let loadingStateModuleMock;
let notifierModuleMock;

const getWrapper = (props, options = {}) => {
	return mount(TaskItemMenu, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		attachTo: document.body,
		provide: {
			tasksModule: tasksModuleMock,
			copyModule: copyModuleMock,
			loadingStateModule: loadingStateModuleMock,
			[NOTIFIER_MODULE_KEY]: notifierModuleMock,
			[I18N_KEY]: { t: (key) => key },
		},
		...options,
	});
};

describe("@/components/molecules/TaskItemMenu", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
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

			const menuBtn = wrapper.find("#task-menu-btn");
			await menuBtn.trigger("click");

			const finishBtn = wrapper.find("#task-action-revert");
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

			const menuBtn = wrapper.find("#task-menu-btn");
			await menuBtn.trigger("click");

			const finishBtn = wrapper.find("#task-action-finish");
			await finishBtn.trigger("click");

			expect(tasksModuleMock.finishTask).toHaveBeenCalled();
		});
	});

	describe("when restoring a task", () => {
		it("should call restoreTask of FinishedTasksModule", async () => {
			const restoreTaskMock = jest.spyOn(finishedTasksModule, "restoreTask");
			const task = tasksTeacher[1];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				taskIsPublished: !task.status.isFinished && !task.status.isDraft,
				userRole: "teacher",
			});

			const menuBtn = wrapper.find("#task-menu-btn");
			await menuBtn.trigger("click");

			const restoreBtn = wrapper.find("#task-action-finish");
			await restoreBtn.trigger("click");

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

			const menuBtn = wrapper.find("#task-menu-btn");
			await menuBtn.trigger("click");

			const deleteBtn = wrapper.find("#task-action-delete");
			await deleteBtn.trigger("click");

			const confirmBtn = wrapper.find(".dialog-confirmed");
			await confirmBtn.trigger("click");

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
				envConfigModule.setEnvs({ FEATURE_COPY_SERVICE_ENABLED: true });

				const menuBtn = wrapper.find("#task-menu-btn");
				await menuBtn.trigger("click");

				const copyBtn = wrapper.find("#task-action-copy");
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
				envConfigModule.setEnvs({ FEATURE_COPY_SERVICE_ENABLED: true });

				const menuBtn = wrapper.find("#task-menu-btn");
				await menuBtn.trigger("click");

				const copyBtn = wrapper.find("#task-action-copy");
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
			envConfigModule.setEnvs({ FEATURE_COPY_SERVICE_ENABLED: false });

			const menuBtn = wrapper.find("#task-menu-btn");
			await menuBtn.trigger("click");

			const copyBtn = wrapper.findAll("#task-action-copy");

			expect(copyBtn).toHaveLength(0);
		});
	});
});

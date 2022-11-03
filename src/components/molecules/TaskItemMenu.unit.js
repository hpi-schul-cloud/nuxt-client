import { envConfigModule, finishedTaskModule } from "@/store";
import CopyModule from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import FinishedTaskModule from "@/store/finished-tasks";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import TaskModule from "@/store/tasks";
import { createModuleMocks } from "@/utils/mock-store-module";
import mocks from "@@/tests/test-utils/mockDataTasks";
import setupStores from "@@/tests/test-utils/setupStores";
import { provide } from "vue";
import TaskItemMenu from "./TaskItemMenu";

const { tasksTeacher } = mocks;

const defineWindowWidth = (width) => {
	Object.defineProperty(window, "innerWidth", {
		writable: true,
		configurable: true,
		value: width,
	});
	window.dispatchEvent(new Event("resize"));
};

let taskModuleMock;
let copyModuleMock;
let loadingStateModuleMock;
let notifierModuleMock;

const getWrapper = (props, options) => {
	return mount(TaskItemMenu, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		attachTo: document.body,
		setup() {
			provide("taskModule", taskModuleMock);
			provide("copyModule", copyModuleMock);
			provide("loadingStateModule", loadingStateModuleMock);
			provide("notifierModule", notifierModuleMock);
			provide("i18n", { t: (key) => key });
		},
		...options,
	});
};

describe("@/components/molecules/TaskItemMenu", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
		setupStores({
			finishedTasksModule: FinishedTaskModule,
			envConfigModule: EnvConfigModule,
		});
		taskModuleMock = createModuleMocks(TaskModule);
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
				userRole: "teacher",
			});

			expect(wrapper.vm.editLink).toStrictEqual(`/homework/${task.id}/edit`);
		});

		it("should compute correct copy link", () => {
			const task = tasksTeacher[0];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
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
				userRole: "teacher",
			});

			expect(wrapper.vm.isTeacher).toBe(true);
		});
	});

	describe("when finishing a task", () => {
		it("should call finishTask of TaskModule", async () => {
			const task = tasksTeacher[0];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				userRole: "teacher",
			});

			const menuBtn = wrapper.find("#task-menu-btn");
			await menuBtn.trigger("click");

			const finishBtn = wrapper.find("#task-action-finish");
			await finishBtn.trigger("click");

			expect(taskModuleMock.finishTask).toHaveBeenCalled();
		});
	});

	describe("when restoring a task", () => {
		it("should call restoreTask of FinishedTaskModule", async () => {
			const restoreTaskMock = jest.spyOn(finishedTaskModule, "restoreTask");
			const task = tasksTeacher[1];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
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
		it("should call deleteTask of TaskModule", async () => {
			const task = tasksTeacher[1];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				userRole: "teacher",
			});

			const menuBtn = wrapper.find("#task-menu-btn");
			await menuBtn.trigger("click");

			const deleteBtn = wrapper.find("#task-action-delete");
			await deleteBtn.trigger("click");

			const confirmBtn = wrapper.find(".dialog-confirmed");
			await confirmBtn.trigger("click");

			expect(taskModuleMock.deleteTask).toHaveBeenCalled();
		});
	});

	describe("when copying a task", () => {
		describe("should call copy store method if 'FEATURE_COPY_SERVICE_ENABLED' flag is set to true", () => {
			it("should emit 'copy-task' event with courseId if present", async () => {
				const task = tasksTeacher[1];
				const wrapper = getWrapper({
					taskId: task.id,
					taskIsFinished: task.status.isFinished,
					userRole: "teacher",
					courseId: "18",
				});
				// @ts-ignore
				envConfigModule.setEnvs({ FEATURE_COPY_SERVICE_ENABLED: true });

				const menuBtn = wrapper.find("#task-menu-btn");
				await menuBtn.trigger("click");

				const copyBtn = wrapper.find("#task-action-copy");
				await copyBtn.trigger("click");

				console.log(wrapper.emitted("copy-task"));

				expect(wrapper.emitted("copy-task")).toStrictEqual([
					[
						{
							id: "59cce2c61113d1132c98dc06",
							courseId: "18",
							type: "task",
						},
					],
				]);
			});
			it("should emit 'copy-task' event without courseId if NOT present", async () => {
				const task = tasksTeacher[1];
				const wrapper = getWrapper({
					taskId: task.id,
					taskIsFinished: task.status.isFinished,
					userRole: "teacher",
				});
				// @ts-ignore
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
							type: "task",
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
				userRole: "teacher",
			});
			// @ts-ignore
			envConfigModule.setEnvs({ FEATURE_COPY_SERVICE_ENABLED: false });

			const menuBtn = wrapper.find("#task-menu-btn");
			await menuBtn.trigger("click");

			const copyBtn = wrapper.findAll("#task-action-copy");

			expect(copyBtn).toHaveLength(0);
		});
	});
});

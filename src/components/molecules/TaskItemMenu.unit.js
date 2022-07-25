import {
	finishedTaskModule,
	taskModule,
	envConfigModule,
	copyModule,
} from "@/store";
import EnvConfigModule from "@/store/env-config";
import FinishedTaskModule from "@/store/finished-tasks";
import TaskModule from "@/store/tasks";
import CopyModule from "@/store/copy-process";
import mocks from "@@/tests/test-utils/mockDataTasks";
import setupStores from "@@/tests/test-utils/setupStores";
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

const getWrapper = (props, options) => {
	return mount(TaskItemMenu, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		attachTo: document.body,
		...options,
	});
};

describe("@components/molecules/TaskItemMenu", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
		setupStores({
			tasks: TaskModule,
			"finished-tasks": FinishedTaskModule,
			"env-config": EnvConfigModule,
			"copy-process": CopyModule,
		});
	});

	defineWindowWidth(1264);

	it(...isValidComponent(TaskItemMenu));

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
			const finishTaskMock = jest.spyOn(taskModule, "finishTask");
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

			expect(finishTaskMock).toHaveBeenCalled();
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
			const deleteTaskMock = jest.spyOn(taskModule, "deleteTask");
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

			expect(deleteTaskMock).toHaveBeenCalled();
		});
	});

	describe("when copying a task", () => {
		it("should call copyTask store method if 'FEATURE_TASK_COPY_ENABLED' flag is set to true", async () => {
			const copyTaskStoreMock = jest.spyOn(copyModule, "copyTask");
			const task = tasksTeacher[1];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				userRole: "teacher",
			});
			// @ts-ignore
			envConfigModule.setEnvs({ FEATURE_TASK_COPY_ENABLED: true });

			const menuBtn = wrapper.find("#task-menu-btn");
			await menuBtn.trigger("click");

			const copyBtn = wrapper.find("#task-action-copy");
			await copyBtn.trigger("click");

			expect(copyTaskStoreMock).toHaveBeenCalled();
			expect(copyTaskStoreMock.mock.calls[0][0]).toStrictEqual({
				id: "59cce2c61113d1132c98dc06",
				courseId: "",
			});
		});

		it("should call 'fetchAllTasks' store action when 'CopyProcess' modal is closed ", async () => {
			const copyTaskStoreMock = jest.spyOn(copyModule, "copyTask");
			const fetchAllTasksMock = jest.spyOn(taskModule, "fetchAllTasks");
			const task = tasksTeacher[1];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				userRole: "teacher",
			});
			// @ts-ignore
			envConfigModule.setEnvs({ FEATURE_TASK_COPY_ENABLED: true });

			const menuBtn = wrapper.find("#task-menu-btn");
			await menuBtn.trigger("click");

			const copyBtn = wrapper.find("#task-action-copy");
			await copyBtn.trigger("click");

			expect(copyTaskStoreMock).toHaveBeenCalled();

			const copyProcessModal = wrapper.find("[data-testid='copy-process']");
			copyProcessModal.vm.$emit("dialog-closed", false);

			expect(wrapper.vm.copyProcess.isOpen).toBe(false);
			expect(wrapper.vm.copyProcess.id).toBe("");
			expect(fetchAllTasksMock).toHaveBeenCalled();
		});

		it("should redirect to the legacy client if 'FEATURE_TASK_COPY_ENABLED' flag is set to false", async () => {
			const copyTaskStoreMock = jest.spyOn(copyModule, "copyTask");
			const { location } = window;
			const task = tasksTeacher[1];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				userRole: "teacher",
			});
			// @ts-ignore
			envConfigModule.setEnvs({ FEATURE_TASK_COPY_ENABLED: false });

			const menuBtn = wrapper.find("#task-menu-btn");
			await menuBtn.trigger("click");

			const copyBtn = wrapper.find("#task-action-copy");
			await copyBtn.trigger("click");

			expect(location.href).toStrictEqual(
				"/homework/59cce2c61113d1132c98dc06/copy?returnUrl=/tasks"
			);

			expect(copyTaskStoreMock).not.toHaveBeenCalled();
		});
	});
});

import TasksModule from "@/store/tasks";
import FinishedTasksModule from "@/store/finished-tasks";
import mocks from "@@/tests/test-utils/mockDataTasks";
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
				show: false,
				userRole: "teacher",
			});

			expect(wrapper.vm.editLink).toStrictEqual(`/homework/${task.id}/edit`);
		});

		it("should set isTeacher correctly", () => {
			const task = tasksTeacher[0];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				show: true,
				userRole: "teacher",
			});

			expect(wrapper.vm.isTeacher).toBe(true);
		});
	});

	describe("when finishing a task", () => {
		it("should call finishTask of TaskModule", async () => {
			const finishTaskMock = jest.spyOn(TasksModule, "finishTask");
			const task = tasksTeacher[0];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				show: false,
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
			const restoreTaskMock = jest.spyOn(FinishedTasksModule, "restoreTask");
			const task = tasksTeacher[1];
			const wrapper = getWrapper({
				taskId: task.id,
				taskIsFinished: task.status.isFinished,
				show: false,
				userRole: "teacher",
			});

			const menuBtn = wrapper.find("#task-menu-btn");
			await menuBtn.trigger("click");

			const restoreBtn = wrapper.find("#task-action-finish");
			await restoreBtn.trigger("click");

			expect(restoreTaskMock).toHaveBeenCalled();
		});
	});
});

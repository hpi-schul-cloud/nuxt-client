import TasksDashboardStudent from "./TasksDashboardStudent";
import TasksList from "@components/organisms/TasksList";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import { TaskModule } from "@/store/tasks";
import mocks from "@@/tests/test-utils/mockDataTasks";
import Vuetify from "vuetify";
import tasksEmptyStateImage from "@assets/img/empty-state/Task_Empty_State.svg";
import { createModuleMocks } from "@/utils/mock-store-module";

const { overDueTasks, openTasksWithoutDueDate, openTasksWithDueDate } = mocks;

const mockTaskModule = jest.fn();
jest.mock("@store/tasks", () => ({
	...jest.requireActual("@store/tasks"),
	__esModule: true,
	get default() {
		return mockTaskModule();
	},
}));

describe("@components/templates/TasksDashboardStudent", () => {
	let taskModuleMock;
	let vuetify;

	const emptyState = {
		title: "Lorem ipsum",
		image: tasksEmptyStateImage,
		subtitle: undefined,
	};

	beforeEach(() => {
		vuetify = new Vuetify();

		taskModuleMock = {
			...createModuleMocks(TaskModule),
			getOpenTasksForStudent: {
				overdue: overDueTasks,
				withDueDate: openTasksWithDueDate,
				noDueDate: openTasksWithoutDueDate,
			},
			getStatus: "completed",
			hasTasks: true,
			getCompletedTasksForStudent: { submitted: [], graded: [] },
			openTasksForStudentIsEmpty: false,
			completedTasksForStudentIsEmpty: true,
		};
		mockTaskModule.mockReturnValue(taskModuleMock);
	});

	it(...isValidComponent(TasksDashboardStudent));

	it("Should render tasks list component", () => {
		const wrapper = mount(TasksDashboardStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				tab: 0,
				emptyState,
			},
		});

		expect(wrapper.findComponent(TasksList).exists()).toBe(true);
	});

	it("Should render empty state", () => {
		const wrapper = mount(TasksDashboardStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				tab: 1,
				emptyState,
			},
		});

		const emptyStateComponent = wrapper.findComponent(vCustomEmptyState);
		expect(emptyStateComponent.exists()).toBe(true);
	});

	it("Should trigger event to update tab property", async () => {
		const wrapper = mount(TasksDashboardStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				tab: 1,
				emptyState,
			},
		});

		await wrapper.setData({ currentTab: 0 });

		expect(wrapper.emitted("update:tab")).toHaveLength(1);
		expect(wrapper.emitted("update:tab")[0]).toStrictEqual([0]);
	});
});

import TasksDashboardTeacher from "./TasksDashboardTeacher";
import TasksList from "@components/organisms/TasksList";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import { TaskModule } from "@/store/tasks";
import mocks from "@@/tests/test-utils/mockDataTasks";
import Vuetify from "vuetify";
import tasksEmptyStateImage from "@assets/img/empty-state/Task_Empty_State.svg";
import { createModuleMocks } from "@/utils/mock-store-module";

const { overDueTasksTeacher, dueDateTasksTeacher, noDueDateTasksTeacher } =
	mocks;

const mockTaskModule = jest.fn();
jest.mock("@store/tasks", () => ({
	...jest.requireActual("@store/tasks"),
	__esModule: true,
	get default() {
		return mockTaskModule();
	},
}));

describe("@components/templates/TasksDashboardTeacher", () => {
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
			getStatus: "completed",
			hasTasks: true,
			openTasksForTeacherIsEmpty: false,
			draftsForTeacherIsEmpty: true,
			getOpenTasksForTeacher: {
				overdue: overDueTasksTeacher,
				withDueDate: dueDateTasksTeacher,
				noDueDate: noDueDateTasksTeacher,
			},
			getDraftTasksForTeacher: [],
		};
		mockTaskModule.mockReturnValue(taskModuleMock);
	});

	it(...isValidComponent(TasksDashboardTeacher));

	it("Should render tasks list component, with second panel expanded per default", () => {
		const wrapper = mount(TasksDashboardTeacher, {
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

		const expansionPanels = wrapper.findAll(".v-expansion-panel");

		expect(wrapper.findComponent(TasksList).exists()).toBe(true);
		expect(expansionPanels.exists()).toBe(true);
		expect(expansionPanels.at(0).classes()).not.toContain(
			"v-expansion-panel--active"
		);
		expect(expansionPanels.at(1).classes()).toContain(
			"v-expansion-panel--active"
		);
	});

	it("Should render empty state", () => {
		taskModuleMock = {
			...taskModuleMock,
			draftsForTeacherIsEmpty: true,
		};
		mockTaskModule.mockReturnValue(taskModuleMock);

		const wrapper = mount(TasksDashboardTeacher, {
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
		const wrapper = mount(TasksDashboardTeacher, {
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

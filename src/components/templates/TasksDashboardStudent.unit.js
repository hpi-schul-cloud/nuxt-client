import TasksDashboardStudent from "./TasksDashboardStudent";
import TasksList from "@components/organisms/TasksList";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import TaskModule from "@/store/tasks";
import mocks from "@@/tests/test-utils/mockDataTasks";
import Vuetify from "vuetify";
import tasksEmptyStateImage from "@assets/img/empty-state/Task_Empty_State.svg";

const { overDueTasks, openTasksWithoutDueDate, openTasksWithDueDate } = mocks;

describe("@components/templates/TasksDashboardStudent", () => {
	const mockStore = {
		tasks: {
			getters: {
				getOpenTasksForStudent: () => ({
					overdue: overDueTasks,
					withDueDate: openTasksWithDueDate,
					noDueDate: openTasksWithoutDueDate,
				}),
				getStatus: () => "completed",
				hasTasks: () => true,
				getCompletedTasksForStudent: () => ({ submitted: [], graded: [] }),
				openTasksForStudentIsEmpty: () => false,
				completedTasksForStudentIsEmpty: () => true,
			},
		},
	};

	const emptyState = {
		title: "Lorem ipsum",
		image: tasksEmptyStateImage,
		subtitle: undefined,
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(TasksDashboardStudent));

	it("Should render tasks list component", () => {
		const wrapper = mount(TasksDashboardStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
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
		const spy = jest
			.spyOn(TaskModule, "completedTasksForStudentIsEmpty", "get")
			.mockReturnValue(true);

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

		spy.mockRestore();
	});

	it("Should trigger event to update tab property", async () => {
		const wrapper = mount(TasksDashboardStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
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

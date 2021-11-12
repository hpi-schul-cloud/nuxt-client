import TasksDashboardStudent from "./TasksDashboardStudent";
import TasksList from "@components/organisms/TasksList";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import mocks from "@@/stories/mockData/Tasks";
import Vuetify from "vuetify";

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
				hasOpenTasksStudent: () => true,
				hasCompletedTasks: () => false,
				hasFilterSelected: () => false,
			},
		},
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
			},
		});

		expect(wrapper.findComponent(TasksList).exists()).toBe(true);
	});

	it("Should render empty state when there are no completed tasks", () => {
		const wrapper = mount(TasksDashboardStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
			propsData: {
				tab: 1,
			},
		});

		expect(wrapper.findComponent(vCustomEmptyState).exists()).toBe(true);
	});

	it("Should render empty state when there are no completed tasks due to filter", () => {
		const wrapper = mount(TasksDashboardStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
			propsData: {
				tab: 1,
				hasFilterSelected: true,
			},
		});

		expect(wrapper.findComponent(vCustomEmptyState).exists()).toBe(true);
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
			},
		});

		await wrapper.setData({ currentTab: 0 });

		expect(wrapper.emitted("update:tab")).toHaveLength(1);
		expect(wrapper.emitted("update:tab")[0]).toStrictEqual([0]);
	});
});

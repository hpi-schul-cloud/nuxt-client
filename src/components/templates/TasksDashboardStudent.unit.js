import TasksDashboardStudent from "./TasksDashboardStudent";
import TasksList from "@components/organisms/TasksList";
import {
	overDueTasks,
	openTasksWithoutDueDate,
	openTasksWithDueDate,
} from "@@/stories/mockData/Tasks";
import Vuetify from "vuetify";

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
				hasNoTasks: () => false,
				getCompletedTasksForStudent: () => ({ submitted: [], graded: [] }),
				hasNoOpenTasks: () => false,
				hasNoCompletedTasks: () => true,
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
});

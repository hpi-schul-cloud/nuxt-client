import TasksDashboardTeacher from "./TasksDashboardTeacher";
import TasksList from "@components/organisms/TasksList";
import {
	overDueTasksTeacher,
	dueDateTasksTeacher,
	noDueDateTasksTeacher,
} from "@@/stories/mockData/Tasks";
import Vuetify from "vuetify";

describe("@components/templates/TasksDashboardTeacher", () => {
	const mockStore = {
		tasks: {
			getters: {
				getStatus: () => "completed",
				hasNoTasks: () => false,
				getOpenTasksForTeacher: () => ({
					overdue: overDueTasksTeacher,
					withDueDate: dueDateTasksTeacher,
					noDueDate: noDueDateTasksTeacher,
				}),
			},
		},
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(TasksDashboardTeacher));

	it("Should render tasks list component, with second panel expanded per default", () => {
		const wrapper = mount(TasksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
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
});

import HomeworksDashboardTeacher from "./HomeworksDashboardTeacher";
import HomeworksList from "./HomeworksList";
import {
	overDueHomeworksTeacher,
	dueDateHomeworksTeacher,
	noDueDateHomeworksTeacher,
} from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/organisms/HomeworksDashboardTeacher", () => {
	const mockStore = {
		homeworks: {
			getters: {
				loading: () => false,
				isListFilled: () => true,
				getOverDueHomeworks: () => overDueHomeworksTeacher,
				getOpenHomeworksWithDueDate: () => dueDateHomeworksTeacher,
				getOpenHomeworksWithoutDueDate: () => noDueDateHomeworksTeacher,
			},
		},
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(HomeworksDashboardTeacher));

	it("Should render homeworks list component, with 'due date' collapsible expanded per default", () => {
		const wrapper = mount(HomeworksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
		});

		const expansionPanels = wrapper.findAll(".v-expansion-panel");

		expect(wrapper.findComponent(HomeworksList).exists()).toBe(true);
		expect(expansionPanels.exists()).toBe(true);
		expect(expansionPanels.at(1).classes()).toContain(
			"v-expansion-panel--active"
		);
	});

	it("Should render homeworks list component, with 'no due date' collapsible expanded if there are no entries in the second", () => {
		mockStore.homeworks.getters.getOverDueHomeworks = () => [];
		mockStore.homeworks.getters.getOpenHomeworksWithDueDate = () => [];

		const wrapper = mount(HomeworksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
		});

		const expansionPanels = wrapper.findAll(".v-expansion-panel");

		expect(wrapper.findComponent(HomeworksList).exists()).toBe(true);
		expect(expansionPanels.exists()).toBe(true);
		expect(expansionPanels.at(0).classes()).toContain(
			"v-expansion-panel--active"
		);
	});
});

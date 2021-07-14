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
				getStatus: () => "completed",
				isListFilled: () => true,
				getOverDueHomeworks: () => overDueHomeworksTeacher,
				getOpenHomeworksWithDueDate: () => dueDateHomeworksTeacher,
				getOpenHomeworksWithoutDueDate: () => noDueDateHomeworksTeacher,
			},
		},
	};

	const mockStoreOnlyWithoutDueDate = {
		homeworks: {
			getters: {
				getStatus: () => "completed",
				isListFilled: () => true,
				getOverDueHomeworks: () => [],
				getOpenHomeworksWithDueDate: () => [],
				getOpenHomeworksWithoutDueDate: () => noDueDateHomeworksTeacher,
			},
		},
	};

	const mockStoreOnlyWithDueDate = {
		homeworks: {
			getters: {
				getStatus: () => "completed",
				isListFilled: () => true,
				getOverDueHomeworks: () => overDueHomeworksTeacher,
				getOpenHomeworksWithDueDate: () => dueDateHomeworksTeacher,
				getOpenHomeworksWithoutDueDate: () => [],
			},
		},
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(HomeworksDashboardTeacher));

	it("Should render homeworks list component, with both panels expanded per default", () => {
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
		expect(expansionPanels.at(0).classes()).not.toContain(
			"v-expansion-panel--active"
		);
		expect(expansionPanels.at(1).classes()).toContain(
			"v-expansion-panel--active"
		);
	});

	it("Should render not disabled 'no due date' panel, and disabled empty other panel", async () => {
		const wrapper = mount(HomeworksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreOnlyWithoutDueDate,
			}),
			vuetify,
		});

		const expansionPanels = wrapper.findAll(".v-expansion-panel");

		expect(expansionPanels.exists()).toBe(true);
		expect(expansionPanels).toHaveLength(2);
		expect(expansionPanels.at(0).classes()).not.toContain(
			"v-expansion-panel--disabled"
		);
		expect(expansionPanels.at(1).classes()).toContain(
			"v-expansion-panel--disabled"
		);
	});

	it("Should render not disabled 'with due date' panel, and disabled empty other panel", async () => {
		const wrapper = mount(HomeworksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreOnlyWithDueDate,
			}),
			vuetify,
		});

		const expansionPanels = wrapper.findAll(".v-expansion-panel");

		expect(expansionPanels.exists()).toBe(true);
		expect(expansionPanels).toHaveLength(2);
		expect(expansionPanels.at(0).classes()).toContain(
			"v-expansion-panel--disabled"
		);
		expect(expansionPanels.at(1).classes()).not.toContain(
			"v-expansion-panel--disabled"
		);
	});
});

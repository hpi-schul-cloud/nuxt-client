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
				getLoading: () => false,
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
				getLoading: () => false,
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
				getLoading: () => false,
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
		expect(expansionPanels.at(0).classes()).toContain(
			"v-expansion-panel--active"
		);
		expect(expansionPanels.at(1).classes()).toContain(
			"v-expansion-panel--active"
		);
	});

	it("Should render only active 'no due date' panel, if the other panel is empty", async () => {
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
		expect(expansionPanels).toHaveLength(1);
		expect(expansionPanels.at(0).attributes("data-testid")).toBe("noDuePanel");
		expect(expansionPanels.at(0).classes()).toContain(
			"v-expansion-panel--active"
		);
	});

	it("Should render only active 'with due date' panel, if the other panel is empty", async () => {
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
		expect(expansionPanels).toHaveLength(1);
		expect(expansionPanels.at(0).attributes("data-testid")).toBe("DuePanel");
		expect(expansionPanels.at(0).classes()).toContain(
			"v-expansion-panel--active"
		);
	});
});

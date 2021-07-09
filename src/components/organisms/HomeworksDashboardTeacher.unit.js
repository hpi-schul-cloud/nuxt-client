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

	it("Should render homeworks list component", () => {
		const wrapper = mount(HomeworksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
		});

		expect(wrapper.findComponent(HomeworksList).exists()).toBe(true);
	});
});

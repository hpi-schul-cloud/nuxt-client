import HomeworksDashboardStudent from "./HomeworksDashboardStudent";
import HomeworksList from "./HomeworksList";
import {
	overDueHomeworks,
	openHomeworksWithoutDueDate,
	openHomeworksWithDueDate,
} from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/organisms/HomeworksDashboardStudent", () => {
	const mockStore = {
		homeworks: {
			getters: {
				getOpenHomeworksWithoutDueDate: () => openHomeworksWithoutDueDate,
				getOpenHomeworksWithDueDate: () => openHomeworksWithDueDate,
				getStatus: () => "completed",
				getOverDueHomeworks: () => overDueHomeworks,
				isListEmpty: () => false,
				hasOpenHomeworks: () => true,
				getGradedHomeworks: () => [],
				getSubmittedHomeworks: () => [],
				hasNoOpenHomeworks: () => false,
				hasNoCompletedHomeworks: () => true,
			},
		},
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(HomeworksDashboardStudent));

	it("Should render homeworks list component", () => {
		const wrapper = mount(HomeworksDashboardStudent, {
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

		expect(wrapper.findComponent(HomeworksList).exists()).toBe(true);
	});
});

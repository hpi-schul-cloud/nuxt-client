import HomeworksDashboardStudent from "./HomeworksDashboardStudent";
import HomeworksList from "./HomeworksList";
import { homeworks, overDueHomeworks } from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/organisms/HomeworksDashboardStudent", () => {
	const mockStore = {
		homeworks: {
			getters: {
				getOpenHomeworks: () => homeworks,
				getStatus: () => "completed",
				getOverDueHomeworks: () => overDueHomeworks,
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
		});

		expect(wrapper.findComponent(HomeworksList).exists()).toBe(true);
	});
});

import dashboard from "./dashboard";
import { homeworks } from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("Homeworks/dashboard", () => {
	const getHomeworksDashboard = jest.fn();
	const mockStore = {
		homeworks: {
			getters: {
				list: () => homeworks,
			},
			state: () => ({
				list: homeworks,
			}),
			actions: {
				getHomeworksDashboard,
			},
		},
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(dashboard));

	it("Should render homeworks list component", () => {
		const wrapper = mount(dashboard, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStore,
				},
				vuetify
			),
		});

		expect(wrapper.findAllComponents({ name: "VList" }).exists()).toBe(true);
	});

	it.todo("Should show a custom page title");

	it.todo("Should should trigger a store action");
});

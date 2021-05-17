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

	it("has correct page title set in <head>", () => {
		const wrapper = shallowMount(dashboard, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStore,
					vueMeta: true,
				},
				vuetify
			),
		});

		expect(wrapper.vm.$metaInfo.title).toBe("Aufgaben");
	});

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

	it("Should should trigger a store action", async () => {
		mockStore.homeworks.actions.getHomeworksDashboard.mockClear();

		shallowMount(dashboard, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStore,
				},
				vuetify
			),
		});

		expect(
			mockStore.homeworks.actions.getHomeworksDashboard
		).toHaveBeenCalled();
	});
});

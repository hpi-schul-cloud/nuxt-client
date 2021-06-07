import dashboard from "./open";
import { homeworks, overDueHomeworks } from "@@/stories/mockData/Homeworks";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import HomeworksList from "@components/organisms/HomeworksList";
import Vuetify from "vuetify";

describe("Homeworks/dashboard", () => {
	const getHomeworksDashboard = jest.fn();
	const mockStore = {
		homeworks: {
			getters: {
				list: () => homeworks,
				loading: () => false,
				isListEmpty: () => false,
				isListFilled: () => true,
				getOpenHomeworksSortedByDueDate: () => [],
				getOverDueHomeworks: () => overDueHomeworks,
			},
			state: () => ({
				list: homeworks,
				loading: {
					homeworks: false,
				},
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

	it("Should render homeworks list component, if there are homeworks", () => {
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

		expect(wrapper.findComponent(HomeworksList).exists()).toBe(true);
		expect(wrapper.findComponent(vCustomEmptyState).exists()).toBe(false);
	});

	it("Should render empty state, if there are no homeworks", () => {
		const mockStoreEmpty = {
			homeworks: {
				getters: {
					list: () => [],
					loading: () => false,
					isListEmpty: () => true,
					isListFilled: () => false,
					getOpenHomeworksSortedByDueDate: () => [],
					getOverDueHomeworks: () => overDueHomeworks,
				},
				state: () => ({
					list: [],
				}),
				actions: {
					getHomeworksDashboard,
				},
			},
		};
		const wrapper = mount(dashboard, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStoreEmpty,
				},
				vuetify
			),
		});

		expect(wrapper.findComponent(vCustomEmptyState).exists()).toBe(true);
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

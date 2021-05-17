import dashboard from "./dashboard";
import { homeworks } from "@@/stories/mockData/Homeworks";
import TasksEmptyState from "@components/molecules/TasksEmptyState";
import HomeworksList from "@components/organisms/HomeworksList";
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
		expect(wrapper.findComponent(TasksEmptyState).exists()).toBe(false);
	});

	it("Should render empty state, if there are no homeworks", () => {
		const mockStoreEmpty = {
			homeworks: {
				getters: {
					list: () => [],
				},
				state: () => ({
					list: homeworks,
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

		expect(wrapper.findComponent(HomeworksList).exists()).toBe(false);
		expect(wrapper.findComponent(TasksEmptyState).exists()).toBe(true);
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

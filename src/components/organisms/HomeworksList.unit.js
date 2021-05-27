import HomeworksList from "./HomeworksList";
import { homeworks } from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/organisms/HomeworksList", () => {
	const getHomeworksDashboard = jest.fn();
	const mockStore = {
		homeworks: {
			getters: {
				list: () => homeworks,
				loading: () => ({ homeworks: false }),
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
	const mockStoreEmpty = {
		homeworks: {
			getters: {
				list: () => [],
				loading: () => ({ homeworks: false }),
			},
			state: () => ({
				list: [],
				loading: {
					homeworks: false,
				},
			}),
			actions: {
				getHomeworksDashboard,
			},
		},
	};
	const mockStoreLoading = {
		homeworks: {
			getters: {
				list: () => [],
				loading: () => ({ homeworks: true }),
			},
			state: () => ({
				list: [],
				loading: {
					homeworks: true,
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

	it(...isValidComponent(HomeworksList));

	it("Should render complete homework items list", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStore,
				},
				vuetify
			),
			propsData: {
				homeworks,
			},
		});

		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(
			homeworks.length
		);
	});

	it("Should render an empty list", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStoreEmpty,
				},
				vuetify
			),
		});

		// expect(wrapper.findComponent(vCustomLoadingState).exists()).toBe(false);
		expect(wrapper.props("homeworks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	it("Should link list item links to homework/<id> page", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStore,
				},
				vuetify
			),
			propsData: {
				homeworks,
			},
		});

		const firstLink = wrapper.find("a");

		expect(firstLink.exists()).toBe(true);
		expect(firstLink.attributes().href).toBe(`/homework/${homeworks[0]._id}`);
	});

	it("Should display due date label according to due date", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStore,
				},
				vuetify
			),
			propsData: {
				homeworks,
			},
		});

		const dateLabels = wrapper.findAll(".v-list-item__action-text");

		dateLabels.wrappers.forEach((dateLabel, index) => {
			expect(dateLabel.exists()).toBe(true);

			if (
				homeworks[index].duedate === null ||
				typeof homeworks[index].duedate === "undefined"
			)
				expect(dateLabel.text()).toBe("Kein Abgabedatum");
			else if (new Date(homeworks[index].duedate) >= new Date())
				expect(dateLabel.text()).toContain("Fällig");
			else expect(dateLabel.text()).toBe("Zu spät");
		});
	});

	it("Should render loading state while fetching homeworks", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStoreLoading,
				},
				vuetify
			),
			propsData: {
				homeworks: [],
			},
		});

		expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(true);
		expect(
			wrapper.find(".v-skeleton-loader__list-item-avatar-two-line").exists()
		).toBe(true);
		expect(wrapper.props("homeworks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});
});

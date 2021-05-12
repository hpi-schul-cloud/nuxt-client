import HomeworksList from "./HomeworksList";
import { homeworks } from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/organisms/HomeworksList", () => {
	const mockStore = {
		homeworks: {
			getters: {
				list: () => homeworks,
			},
			state: () => ({
				list: homeworks,
			}),
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
		});

		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(
			homeworks.length
		);
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
		});

		const firstLink = wrapper.find("a");

		expect(firstLink.exists()).toBe(true);
		expect(firstLink.attributes().href).toBe(`/homework/${homeworks[0]._id}`);
	});

	it("Should render empty state, if there are no homeworks", () => {
		const mockStoreEmpty = {
			homeworks: {
				getters: {
					list: () => []
				},
				state: () => ({
					list: homeworks,
				}),
			},
		};

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

		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
		expect(wrapper.findAllComponents({ name: "VList" }).exists()).toBe(false)
	});
});

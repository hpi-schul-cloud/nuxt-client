import RoomsModule from "@store/rooms";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import RoomList from "./rooms-list.vue";
import flushPromises from "flush-promises";

const mockData = [
	{
		id: "0000dcfbfb5c7a3f00bf21ab",
		title: "Mathe",
		shortTitle: "Ma",
		displayColor: "#54616e",
		startDate: "2019-12-07T23:00:00.000Z",
		untilDate: "2020-12-16T23:00:00.000Z",
		titleDate: "2019/20",
	},
	{
		id: "61b0764be94b36657cc0329f",
		title: "History",
		shortTitle: "Hi",
		displayColor: "#EF6C00",
		startDate: "2015-07-31T22:00:00.000Z",
		untilDate: "2018-07-30T22:00:00.000Z",
		titleDate: "2015-2018",
	},
	{
		id: "61adf5eee94b36657cbffcce",
		title: "Spanish",
		shortTitle: "Sp",
		displayColor: "#009688",
		startDate: "2021-07-31T22:00:00.000Z",
		untilDate: "2021-11-05T23:00:00.000Z",
		titleDate: "2021",
	},
	{
		id: "61adf5e3e94b36657cbffbf3",
		title: "English",
		shortTitle: "En",
		displayColor: "#EC407A",
		startDate: "2021-07-31T22:00:00.000Z",
		untilDate: "2022-07-30T22:00:00.000Z",
	},
];

describe("@pages/rooms-list.vue", () => {
	const getWrapper = (device = "desktop") => {
		return mount(RoomList, {
			...createComponentMocks({
				i18n: true,
				//@ts-ignore
				vuetify: true,
			}),
			computed: {
				$mq: () => device,
			},
		});
	};
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		RoomsModule.setAllElements(mockData as any);
	});

	it("should open and close on property change", async () => {
		const wrapper = getWrapper();
		await flushPromises();

		const expectedItem = {
			id: "0000dcfbfb5c7a3f00bf21ab",
			title: "Mathe",
			shortTitle: "Ma",
			displayColor: "#54616e",
			startDate: "2019-12-07T23:00:00.000Z",
			untilDate: "2020-12-16T23:00:00.000Z",
			titleDate: "2019/20",
			searchText: "Mathe 2019/20",
			isArchived: true,
		};
		// tslint ignored because it gives
		// "Property 'items' does not exist on type 'Vue'" error
		// TODO: better solution should be found

		// @ts-ignore
		expect(wrapper.vm.items[0]).toStrictEqual(expectedItem);
	});

	it("should search elements on list", async () => {
		const wrapper = getWrapper();
		await flushPromises();

		const searchInput = wrapper.vm.$refs["search"] as any;

		// @ts-ignore
		expect(wrapper.vm.items.length).toEqual(4);
		searchInput.$emit("input", "math");
		// @ts-ignore
		expect(wrapper.vm.items.length).toEqual(1);
		searchInput.$emit("input", "");
		// @ts-ignore
		expect(wrapper.vm.items.length).toEqual(4);
		searchInput.$emit("input", "15");
		// @ts-ignore
		expect(wrapper.vm.items.length).toEqual(1);
		// @ts-ignore
		expect(wrapper.vm.items[0]).toEqual({
			id: "61b0764be94b36657cc0329f",
			title: "History",
			shortTitle: "Hi",
			displayColor: "#EF6C00",
			startDate: "2015-07-31T22:00:00.000Z",
			untilDate: "2018-07-30T22:00:00.000Z",
			titleDate: "2015-2018",
			searchText: "History 2015-2018",
			isArchived: true,
		});
	});
});

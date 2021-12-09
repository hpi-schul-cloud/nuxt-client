import RoomsModule from "@store/rooms";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import RoomList from "./rooms-list.vue";
import flushPromises from "flush-promises";

const mockData = [
	{
		id: "123",
		title: "Physics",
		shortTitle: "Ph",
		displayColor: "blue",
	},
	{
		id: "234",
		title: "Math",
		shortTitle: "Ma",
		displayColor: "#f23f76",
	},
	{
		id: "345",
		title: "Greek",
		shortTitle: "Gr",
		displayColor: "#f23f76",
	},
	{
		id: "456",
		title: "German",
		shortTitle: "Ge",
		displayColor: "#f23f76",
	},
	{
		id: "567",
		title: "English",
		shortTitle: "En",
		displayColor: "green",
	},
];

describe("@pages/rooms-list.vue", () => {
	const getWrapper = (device = "desktop", options = {}) => {
		return mount(RoomList, {
			...createComponentMocks({
				i18n: true,
				//@ts-ignore
				vuetify: true,
				...options,
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

	it("should fetch data on load", async () => {
		const wrapper = getWrapper();
		await flushPromises();
		// tslint ignored because it gives
		// "Property 'items' does not exist on type 'Vue'" error
		// TODO: better solution should be found

		// @ts-ignore
		expect(wrapper.vm.items).toStrictEqual(mockData);
	});

	it("should search elements on list", async () => {
		const wrapper = getWrapper();
		await flushPromises();

		const searchInput = wrapper.vm.$refs["search"] as any;

		// @ts-ignore
		expect(wrapper.vm.items.length).toEqual(5);
		searchInput.$emit("input", "math");
		// @ts-ignore
		expect(wrapper.vm.items.length).toEqual(1);
		searchInput.$emit("input", "");
		// @ts-ignore
		expect(wrapper.vm.items.length).toEqual(5);
	});

	it("should redirect to the course page if an item is clicked", async () => {
		const wrapper = getWrapper();
		const location = window.location;
		const avatar = wrapper.findComponent({ ref: "123-avatar" });

		expect(location.href).toStrictEqual("");
		avatar.vm.$emit("click");
		expect(location.href).toStrictEqual("/courses/123");
	});
});

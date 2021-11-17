import RoomsModule from "@store/rooms";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import RoomList from "./rooms-list.vue";
import flushPromises from "flush-promises";

const mockData = [
	{
		id: "6183ddx6480fdc650e44b79d1",
		title: "Physics",
		shortTitle: "Ph",
		displayColor: "blue",
	},
	{
		id: "6183ddc6680fdc650e44b79d2",
		title: "Math",
		shortTitle: "Ma",
		displayColor: "#f23f76",
	},
	{
		id: "6188f93dfvxc71f695cfb16fe18",
		title: "Greek",
		shortTitle: "Gr",
		displayColor: "#f23f76",
	},
	{
		id: "6188f941f71f695cfb16fvxce19",
		title: "German",
		shortTitle: "Ge",
		displayColor: "#f23f76",
	},
	{
		id: "618a95ce06870b10d863vxccca4",
		title: "English",
		shortTitle: "En",
		displayColor: "green",
	},
	{
		id: "618b659806870b10d863cvxca5",
		title: "Biology",
		shortTitle: "Bi",
		displayColor: "yellow",
	},
	{
		id: "618b659806870bsdf10d863cca5",
		title: "Chemistry",
		shortTitle: "Ch",
		displayColor: "#f23f76",
	},
	{
		id: "6183ddc6480fdc650e44b79d1",
		title: "Physics",
		shortTitle: "Ph",
		displayColor: "blue",
	},
	{
		id: "6183dd6680vvfdc650e44b79d2",
		title: "Math",
		shortTitle: "Ma",
		displayColor: "#f23f76",
	},
	{
		id: "6188f93df71f6y95cfb1y6fe18",
		title: "Greek",
		shortTitle: "Gr",
		displayColor: "#f23f76",
	},
	{
		id: "6188yf941f71f695cfby16fe19",
		title: "German",
		shortTitle: "Ge",
		displayColor: "#f23f76",
	},
	{
		id: "618a95ce06870b10d863cca4",
		title: "English",
		shortTitle: "En",
		displayColor: "green",
	},
	{
		id: "618b659x806870b10xd863cca5",
		title: "Biology",
		shortTitle: "Bi",
		displayColor: "yellow",
	},
	{
		id: "618bc65dd9806870b10d8c63cca5",
		title: "Chemistry",
		shortTitle: "Ch",
		displayColor: "#f23f76",
	},
	{
		id: "6188f93vdf71f695cfbv16fe18",
		title: "Greek",
		shortTitle: "Gr",
		displayColor: "#f23f76",
	},
	{
		id: "61y88f941f71f695cfb16vfe19",
		title: "German",
		shortTitle: "Ge",
		displayColor: "#f23f76",
	},
	{
		id: "618a95ce0w6870b10dw863cca4",
		title: "English",
		shortTitle: "En",
		displayColor: "green",
	},
	{
		id: "618b65e9806870b10dt863cca5",
		title: "Biology",
		shortTitle: "Bi",
		displayColor: "yellow",
	},
	{
		id: "618b6r5980687dfg0b10d86r3cca5",
		title: "Chemistry",
		shortTitle: "Ch",
		displayColor: "#f23f76",
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
		expect(wrapper.vm.$data.allElements).toStrictEqual(mockData);
	});

	// it("should search elements on list", async () => {
	// 	const wrapper = getWrapper();
	// 	await flushPromises();

	// 	const searchInput = wrapper.vm.$refs["search"] as any;

	// 	expect(1 == 1).toBe(true);
	// 	searchInput.vm.$data.lazyValue = "math";
	// 	expect(wrapper.vm.$data.allElements.length).toEqual(2);
	// });
});

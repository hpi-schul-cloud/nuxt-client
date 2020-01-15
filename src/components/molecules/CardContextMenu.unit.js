import CardContextMenu from "./CardContextMenu";

const actions = [
	{ type: "type1", text: "testText1" },
	{ type: "type2", text: "testText2" },
	{ type: "type3", text: "testText3" },
];

const wrapper = mount(CardContextMenu, {
	propsData: {
		actions,
	},
});

describe("@components/CardContextMenu", () => {
	it(...isValidComponent(CardContextMenu));

	it("Renders all action buttons", () => {
		expect(wrapper.findAll(".context-menu__button").length).toBe(
			actions.length
		);
	});

	it("Emits context-btn event when clicked", () => {
		wrapper.find(".context-menu__button-container").trigger("click");
		expect(wrapper.emitted("context-btn-clicked")).toEqual([["type1"]]);
	});
});

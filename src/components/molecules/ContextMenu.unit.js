import ContextMenu from "./ContextMenu";

const actions = [
	{ event: "event1", text: "testText1" },
	{ event: "event2", text: "testText2" },
	{ event: "event3", text: "testText3" },
];

const wrapper = mount(ContextMenu, {
	propsData: {
		show: true,
		actions,
	},
});

describe("@components/CardContextMenu", () => {
	it(...isValidComponent(ContextMenu));

	it("Renders all action buttons", () => {
		expect(wrapper.findAll(".context-menu__button")).toHaveLength(
			actions.length
		);
	});

	it("Emits defined event when clicked", () => {
		expect.assertions(2 * actions.length);
		const buttons = wrapper.findAll(".context-menu__button");
		for (let i = 0; i < buttons.length; i += 1) {
			const button = buttons.at(i);
			const { event } = actions.find((a) => a.text === button.text());
			button.trigger("click");
			expect(wrapper.emitted(event)).toHaveLength(1);
			expect(wrapper.emitted(event)[0][0]).toBeUndefined();
		}
	});
});

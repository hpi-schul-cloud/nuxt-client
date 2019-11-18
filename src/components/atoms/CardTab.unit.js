import CardTab from "./CardTab";

describe("@components/CardTab", () => {
	it(...isValidComponent(CardTab));
	it(...rendersSlotContent(CardTab));
	it("Renders a default card tab", () => {
		const wrapper = mount(CardTab);
		expect(wrapper.attributes().style).toBe(
			"background-color: rgb(255, 255, 255);"
		);
	});
	it("Renders a card tab with background prop", () => {
		const wrapper = mount(CardTab, {
			propsData: {
				backgroundStyle: "background-color: red",
			},
		});
		expect(wrapper.attributes().style).toBe("background-color: red;");
	});
});

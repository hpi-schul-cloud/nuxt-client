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
});

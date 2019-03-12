import BaseCollapsible from "./BaseCollapsible";

const collapsible = {
	data: () => ({ active: false }),
	template: `
		<BaseCollapsible label="Label for Toggle Button">
			<p id="slot-content">Slot Content</p>
		</BaseCollapsible>
	`,
	components: { BaseCollapsible },
};

describe("@components/BaseCollapsible", () => {
	it(...isValidComponent(BaseCollapsible));

	it("pressing the label should toggle slot visibility", () => {
		const wrapper = mount(collapsible);

		expect(wrapper.find("#slot-content").exists()).toBe(false);
		wrapper.find(".collapsible").trigger("click");
		expect(wrapper.find("#slot-content").exists()).toBe(true);
		wrapper.find(".collapsible").trigger("click");
		expect(wrapper.find("#slot-content").exists()).toBe(false);
	});
});

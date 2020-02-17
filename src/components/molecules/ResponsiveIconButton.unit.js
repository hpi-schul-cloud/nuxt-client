import ResponsiveIconButton from "./ResponsiveIconButton";

describe("@components/ResponsiveIconButton", () => {
	it(...isValidComponent(ResponsiveIconButton));

	it("Generates a button", () => {
		const wrapper = mount(ResponsiveIconButton, {
			propsData: {
				source: "material",
				design: "primary",
				icon: "add",
			},
		});
		expect(wrapper.find(".button").exists()).toBe(true);
	});
});

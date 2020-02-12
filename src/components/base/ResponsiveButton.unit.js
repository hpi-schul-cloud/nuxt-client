import ResponsiveButton from "./ResponsiveButton";

describe("@components/ResponsiveButton", () => {
	it(...isValidComponent(ResponsiveButton));

	it("Generates a button", () => {
		const wrapper = mount(ResponsiveButton, {
			propsData: {
				source: "material",
				design: "primary",
				icon: "add",
			},
		});
		expect(wrapper.find(".button").exists()).toBe(true);
	});
});

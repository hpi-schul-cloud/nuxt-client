import MaxWidth from "@layouts/MaxWidth";

describe("@components/base/MaxWidth", () => {
	it(...isValidComponent(MaxWidth));

	it("contains class container-max-width", () => {
		const wrapper = mount(MaxWidth);
		expect(wrapper.classes()).toContain("container-max-width");
	});
});

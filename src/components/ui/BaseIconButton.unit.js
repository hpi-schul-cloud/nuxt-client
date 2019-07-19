import BaseIconButton from "./BaseIconButton";

describe("@components/BaseQrCode", () => {
	it(...isValidComponent(BaseIconButton));
	it("Generates an iconButton", () => {
		const wrapper = shallowMount(BaseIconButton, {
			propsData: {
				source: "fa",
				icon: "solid/address-book",
				fill: "red",
			},
		});

		expect(wrapper.contains("button")).toBe(true);
		expect(wrapper.contains("base-icon-stub")).toBe(true);
		const baseIcon = wrapper.find("base-icon-stub");
		expect(baseIcon.props("source")).toBe("fa");
		expect(baseIcon.props("icon")).toBe("solid/address-book");
		expect(baseIcon.props("fill")).toBe("red");
	});
});

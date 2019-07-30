import PopupIconInitials from "./PopupIconInitials";

describe("@components/BaseIcon", () => {
	it(...isValidComponent(PopupIconInitials));
	it(...rendersDefaultSlotContent(PopupIconInitials));

	it("computes the initals from first- and lastname", () => {
		const wrapper = mount(PopupIconInitials, {
			propsData: { firstname: "Max", lastname: "Mustermann" },
		});
		expect(wrapper.find(".icon").text()).toBe("MM");
	});

	it("it pops up when it is clicked", () => {
		const wrapper = mount(PopupIconInitials);

		wrapper.find(".popup").trigger("click");
		expect(wrapper.find(".popuptext").classes()).toContain("visible");
		wrapper.find(".popup").trigger("click");
		expect(wrapper.find(".popuptext").classes()).not.toContain("visible");
	});
});

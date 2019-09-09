import PopupIconInitials from "./PopupIconInitials";

describe("@components/BaseIcon", () => {
	it(...isValidComponent(PopupIconInitials));
	it(...rendersDefaultSlotContent(PopupIconInitials));

	it("computes the initals from first- and lastname", () => {
		const wrapper = shallowMount(PopupIconInitials, {
			propsData: { firstname: "Max", lastname: "Mustermann", role: "teacher" },
		});
		expect(wrapper.find(".icon").text()).toBe("MM");
	});

	it("it pops up when it is clicked", () => {
		const wrapper = shallowMount(PopupIconInitials);

		wrapper.find(".popup").trigger("click");
		expect(wrapper.find(".popuptext").classes()).toContain("visible");
		wrapper.find(".popup").trigger("click");
		expect(wrapper.find(".popuptext").classes()).not.toContain("visible");
	});
});

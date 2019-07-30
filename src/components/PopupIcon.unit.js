import PopupIcon from "./PopupIcon";

const testProps = { source: "fa", icon: "pencil", fill: "red" };

describe("@components/BaseIcon", () => {
	it(...isValidComponent(PopupIcon));
	it(...rendersDefaultSlotContent(PopupIcon, { propsData: testProps }));

	it("contains an icon", () => {
		const wrapper = mount(PopupIcon, {
			propsData: testProps,
		});
		expect(wrapper.find(".fa-pencil").exists()).toBe(true);
		expect(wrapper.find("svg").exists()).toBe(false);
	});

	it("it pops up when it is clicked", () => {
		const wrapper = mount(PopupIcon, {
			propsData: testProps,
		});

		wrapper.find(".popup").trigger("click");
		expect(wrapper.find(".popup-content").classes()).toContain("visible");
		wrapper.find(".popup").trigger("click");
		expect(wrapper.find(".popup-content").classes()).not.toContain("visible");
	});
});

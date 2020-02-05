import BaseContentContainer from "./BaseContentContainer";

describe("@components/BaseContentContainer", () => {
	it(...isValidComponent(BaseContentContainer));
	it(...rendersSlotContent(BaseContentContainer));

	it("renders prop size default", () => {
		const wrapper = mount(BaseContentContainer);
		expect(wrapper.classes()).toContain("medium");
	});

	it("renders prop size small", () => {
		const wrapper = mount(BaseContentContainer, {
			propsData: {
				size: "small",
			},
		});
		expect(wrapper.find(".small").exists()).toBe(true);
	});
});

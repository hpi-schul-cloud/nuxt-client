import BaseContentContainer from "./BaseContentContainer";

const smallContainer = {
	components: { BaseContentContainer },
	template: `<base-content-container size="small"></base-content-container>`,
};

describe("@components/BaseContentContainer", () => {
	it(...isValidComponent(BaseContentContainer));
	it(...rendersSlotContent(BaseContentContainer));

	it("renders prop size default", () => {
		const wrapper = mount(BaseContentContainer);
		expect(wrapper.classes()).toContain("medium");
	});

	it("renders prop size small", () => {
		const wrapper = mount(smallContainer);
		expect(wrapper.find(".small").exists()).toBe(true);
	});
});

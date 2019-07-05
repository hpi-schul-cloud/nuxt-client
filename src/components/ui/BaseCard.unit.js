import BaseCard from "./BaseCard";

describe("@components/BaseCard", () => {
	it(...isValidComponent(BaseCard));
	it(...rendersDefaultSlotContent(BaseCard));
	it("Render with single background color setting", () => {
		const wrapper = shallowMount(BaseCard, {
			propsData: {
				color: ["#01B1AA"],
			},
		});
		expect(wrapper.find(".content").element.style["background-color"]).toBe(
			"rgb(1, 177, 170)"
		);
	});
});

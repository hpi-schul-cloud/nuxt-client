import BaseCard from "./BaseCard";

describe("@components/BaseCard", () => {
	it(...isValidComponent(BaseCard));

	it("Render with some slots", () => {
		const wrapper = shallowMount(BaseCard, {
			slots: {
				content: "Card",
				footer: "foot",
			},
		});
		expect(wrapper.contains(".content")).toBe(true);
		expect(wrapper.find(".footer").text()).toBe("foot");
	});
	it("Render without content slot", () => {
		const wrapper = shallowMount(BaseCard, {
			slots: {
				"header-in": "head",
				footer: "foot",
			},
		});
		expect(wrapper.find(".tab-label").text()).toBe("head");
		expect(wrapper.contains(".content")).toBe(false);
		expect(wrapper.contains(".footer")).toBe(true);
	});
	it("Render with single background color setting", () => {
		const wrapper = shallowMount(BaseCard, {
			propsData: {
				color: ["#01B1AA"],
			},
			slots: {
				content: "Card",
			},
		});
		expect(wrapper.find(".content").element.style["background-color"]).toBe(
			"rgb(1, 177, 170)"
		);
	});
});

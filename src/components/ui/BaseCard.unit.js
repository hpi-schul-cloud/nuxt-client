import BaseCard from "./BaseCard";

describe("@components/BaseCard", () => {
	it(...isValidComponent(BaseCard));

	it("Render with some slots", () => {
		const wrapper = shallowMount(BaseCard, {
			slots: {
				topContainer: "Card",
				bottomContainer: "foot",
			},
		});
		expect(wrapper.contains(".top-container")).toBe(true);
		expect(wrapper.find(".bottom-container").text()).toBe("foot");
	});
	it("Render without content slot", () => {
		const wrapper = shallowMount(BaseCard, {
			slots: {
				"header-in": "head",
				bottomContainer: "foot",
			},
		});
		expect(wrapper.find(".tab-label").text()).toBe("head");
		expect(wrapper.contains(".top-container")).toBe(false);
		expect(wrapper.contains(".bottom-container")).toBe(true);
	});
	it("Render with single background color setting", () => {
		const wrapper = shallowMount(BaseCard, {
			propsData: {
				color: ["#01B1AA"],
			},
			slots: {
				topContainer: "Card",
			},
		});
		expect(
			wrapper.find(".top-container").element.style["background-color"]
		).toBe("rgb(1, 177, 170)");
	});
});

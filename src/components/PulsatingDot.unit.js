import PulsatingDot from "./PulsatingDot";

describe("@components/PulsatingDot", () => {
	it(...isValidComponent(PulsatingDot));

	it("render default", () => {
		const wrapper = shallowMount(PulsatingDot);
		expect(wrapper.is("div")).toBe(true);
		expect(wrapper.find(".ring-container").exists()).toBe(true);
	});
});

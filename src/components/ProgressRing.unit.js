import ProgressRing from "./ProgressRing";

describe("@components/ProgressRing", () => {
	it(...isValidComponent(ProgressRing));

	it("prop updates text", () => {
		const defaultPercentage = 20;
		const updatePercentage = 40;
		const wrapper = shallowMount(ProgressRing, {
			propsData: {
				percent: defaultPercentage,
			},
		});
		const percElem = wrapper.find(".percent");
		expect(percElem.text()).toBe(defaultPercentage.toString() + "%");
		wrapper.setProps({ percent: updatePercentage });
		expect(percElem.text()).toBe(updatePercentage.toString() + "%");
	});
});

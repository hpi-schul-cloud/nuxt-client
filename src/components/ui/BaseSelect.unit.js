import BaseSelect from "./BaseSelect";

describe("@components/BaseSelect", () => {
	it(...isValidComponent(BaseSelect));

	it("render component", () => {
		const testLabel = "test";
		const wrapper = shallowMount(BaseSelect, {
			propsData: {
				value: [2, 3],
				options: [4, 5],
				label: testLabel,
			},
		});
		expect(wrapper.find("multi-select-stub").exists()).toBe(true);
		expect(wrapper.find(".label").text()).toBe(testLabel);
	});
});

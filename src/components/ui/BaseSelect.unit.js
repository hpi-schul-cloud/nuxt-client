import BaseSelect from "./BaseSelect";

describe("@components/BaseSelect", () => {
	it(...isValidComponent(BaseSelect));

	it("render component", () => {
		const testLabel = "test";
		const wrapper = mount(BaseSelect, {
			stubs: {
				"multi-select": true,
			},
			propsData: {
				value: [2, 3],
				options: [{ label: "t", value: "e" }],
				label: testLabel,
			},
		});
		expect(wrapper.find("multi-select-stub").exists()).toBe(true);
		expect(
			wrapper
				.find("label")
				.text()
				.includes(testLabel)
		).toBe(true);
	});
});

import BaseInput from "./BaseInput";
import { inputTypes } from "./BaseInput";

describe("@components/BaseInput", () => {
	it(...isValidComponent(BaseInput));

	it("all types have a label", () => {
		const testLabel = "MyTestLabel";
		inputTypes.forEach((type, index) => {
			const wrapper = mount({
				data: () => ({ value: "" }),
				template: `<base-input v-model="value" label="${testLabel}" type="${type}" value="${index}" name="test" />`,
				components: { BaseInput },
			});
			expect(wrapper.contains("label")).toBe(true);
			expect(wrapper.text().includes(testLabel)).toBe(true);
		});
	});

	it("all types are passing through attributes", () => {
		const attributes = { "data-test": "testAttrValue" };
		inputTypes.forEach((type) => {
			const wrapper = mount(BaseInput, {
				attrs: attributes,
				propsData: {
					vmodel: "",
					label: "test",
					name: "test",
					value: "test",
					type,
				},
			});
			const input = wrapper.find("input, .input");
			Object.keys(attributes).forEach((attr) => {
				expect(input.attributes(attr)).toBe(attributes[attr]);
			});
		});
	});
});

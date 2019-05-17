import BaseInput from "./BaseInput";
import { supportedTypes } from "./BaseInput";

describe("@components/BaseInput", () => {
	it(...isValidComponent(BaseInput));

	it("all types have a label", () => {
		const testLabel = "MyTestLabel";
		supportedTypes
			.filter((type) => type !== "hidden") // hidden inputs doesn't need a label
			.forEach((type, index) => {
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
		supportedTypes.forEach((type) => {
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

	it("throws an error on unsupported types", () => {
		console.error = jest.fn(() => {}); // don't show error messages in test log
		try {
			const wrapper = mount({
				data: () => ({ value: "" }),
				template: `<base-input v-model="value" label="Label" type="unsupported" name="test" />`,
				components: { BaseInput },
			});
			expect(true).toBe(false); // should fail before this
		} catch (error) {
			expect(true).toBe(true); // expect to run this
		}
	});
});

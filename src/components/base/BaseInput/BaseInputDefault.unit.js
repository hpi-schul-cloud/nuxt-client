import BaseInput from "./BaseInput";
import { supportedTypes } from "./BaseInputDefault";

function getMock(type) {
	return mount({
		data: () => ({ content: "" }),
		template: `<base-input v-model="content" label="test" type="${type}" name="test" />`,
		components: { BaseInput },
	});
}

describe("@components/BaseInputDefault", () => {
	it("input has correct type", () => {
		supportedTypes.forEach((type) => {
			const wrapper = getMock(type);
			const textInput = wrapper.find(`input[type="${type}"]`);
			expect(textInput.exists()).toBe(true);
		});
	});

	it("changing the element's value, updates the v-model", () => {
		supportedTypes.forEach((type) => {
			const testInput = type === "number" ? 5 : "test string";
			const wrapper = getMock(type);
			const input = wrapper.find(`input[type="${type}"]`);
			input.setValue(testInput);
			expect(wrapper.vm.content).toBe(testInput);
		});
	});

	it("changing the v-model, updates the element's value", () => {
		supportedTypes.forEach((type) => {
			const testInput = type === "number" ? 5 : "test string";
			const wrapper = getMock(type);
			wrapper.setData({ content: testInput });
			const input = wrapper.find(`input[type="${type}"]`);
			expect(input.element.value.toString()).toBe(testInput.toString());
		});
	});
});

import BaseInput from "./BaseInput";

const inputTypes = [
	"email",
	"password",
	"search",
	"tel",
	"text",
	"url",
	"number",
	"hidden",
];

describe("@components/BaseInputDefault", () => {
	it("input has correct type", () => {
		inputTypes.forEach((type) => {
			const wrapper = mount({
				data: () => ({ value: "" }),
				template: `<base-input v-model="value" label="test" type="${type}" name="test" />`,
				components: { BaseInput },
			});
			const textInput = wrapper.find(`input[type="${type}"]`);
			expect(textInput.exists()).toBe(true);
		});
	});

	it("changing the element's value, updates the v-model", () => {
		inputTypes.forEach((type) => {
			const testInput = type === "number" ? 5 : "test string";
			const wrapper = mount({
				data: () => ({ content: "" }),
				template: `<base-input v-model="content" label="test" type="${type}" name="test" />`,
				components: { BaseInput },
			});
			const input = wrapper.find(`input[type="${type}"]`);
			input.setValue(testInput);
			expect(wrapper.vm.content).toBe(testInput);
		});
	});

	it("changing the v-model, updates the element's value", () => {
		inputTypes.forEach((type) => {
			const testInput = type === "number" ? 5 : "test string";
			const wrapper = mount({
				data: () => ({ content: "" }),
				template: `<base-input v-model="content" label="test" type="${type}" name="test" />`,
				components: { BaseInput },
			});
			wrapper.setData({ content: testInput });
			const input = wrapper.find(`input[type="${type}"]`);
			expect(input.element.value.toString()).toBe(testInput.toString());
		});
	});
});

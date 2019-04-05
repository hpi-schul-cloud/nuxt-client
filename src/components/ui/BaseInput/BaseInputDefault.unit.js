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

	it("attributes are passed through", () => {
		const attributes = {
			alt: "input element",
			autocomplete: "on",
			autofocus: "autofocus",
			disabled: "disabled",
			form: "form_id",
			maxlength: "5",
			multiple: "multiple",
			name: "input-name",
			pattern: ".*",
			placeholder: "placeholder text",
			readonly: "readonly",
			required: "required",
		};
		inputTypes.forEach((type) => {
			const wrapper = mount(BaseInput, {
				attrs: attributes,
				propsData: {
					vmodel: "",
					label: "test",
					type,
				},
			});
			const input = wrapper.find("input");
			Object.keys(attributes).forEach((attr) => {
				expect(input.attributes(attr)).toBe(attributes[attr]);
			});
		});
	});
});

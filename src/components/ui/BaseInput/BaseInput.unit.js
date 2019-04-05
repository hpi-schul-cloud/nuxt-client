import BaseInput from "./BaseInput";
import { inputTypes } from "./BaseInput";

describe("@components/BaseInput", () => {
	it(...isValidComponent(BaseInput));

	it("all types have a label", () => {
		const testLabel = "MyTestLabel";
		inputTypes
			.map((type) =>
				mount({
					data: () => ({ value: "" }),
					template: `<base-input v-model="value" label="${testLabel}" type="${type}" name="test" />`,
					components: { BaseInput },
				})
			)
			.forEach((wrapper) => {
				expect(wrapper.contains("label")).toBe(true);
				expect(wrapper.text().includes(testLabel)).toBe(true);
			});
	});

	//Not sure whats to be tested here
	/*
	it("passes through attributes", () => {
		// list based on https://www.w3schools.com/tags/tag_input.asp
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
			type: "text",
		};
		var parent = mount({
			data: () => ({ username: "" }),
			template: `<div> <base-input
					v-model="username"
					label="MyLabel"
					${Object.keys(attributes)
						.map((key) => {
							return `${key}="${attributes[key]}"`;
						})
						.join("")}
				/></div>`,
			components: { BaseInput: BaseInput },
		});
		const inputField = parent.find("input").element;
		Object.keys(attributes).forEach((key) => {
			expect(inputField.getAttribute(key)).toBe(attributes[key]);
		});
	});
	*/
});

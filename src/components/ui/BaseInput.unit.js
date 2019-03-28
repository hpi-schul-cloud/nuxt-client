import BaseInput from "./BaseInput";

describe("@components/BaseInput", () => {
	it(...isValidComponent(BaseInput));

	it("changing the element's value, updates the v-model", () => {
		const testinput = "test-String";
		var parent = mount({
			data: () => ({ username: "" }),
			template:
				'<div> <base-input v-model="username" type="text" name="test-input" label="MyLabel" /></div>',
			components: { BaseInput: BaseInput },
		});
		const usernameInputInnerTextField = parent.find("input");
		usernameInputInnerTextField.element.value = testinput;
		usernameInputInnerTextField.trigger("input");

		expect(parent.vm.username).toBe(testinput);
	});

	it("changing the element's v-model, updates the value", () => {
		const testinput = "test-String";
		var parent = mount({
			data: () => ({ username: "" }),
			template:
				'<div> <base-input v-model="username" type="text" name="test-input" label="MyLabel" /></div>',
			components: { BaseInput: BaseInput },
		});
		parent.vm.username = testinput;
		const usernameInputInnerTextField = parent.find("input");
		expect(usernameInputInnerTextField.element.value).toBe(testinput);
	});

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
});

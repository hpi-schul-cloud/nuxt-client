import BaseInput from "./BaseInput";

describe("@components/BaseInput", () => {
	it(...isValidComponent(BaseInput));

	it("Check type is required and validator is correct", () => {
		const wrapper = shallowMount(BaseInput, {
			propsData: {
				type: "text",
				value: "",
				label: "not relevant",
				name: "not relevant",
			},
		});
		const type = wrapper.vm.$options.props.type;
		// TODO
		/*
		expect(type.required).toBeTruthy();
		expect(type.validator && type.validator("wrong")).toBeFalsy();
		expect(type.validator && type.validator("text")).toBeTruthy();
		expect(type.validator && type.validator("Date")).toBeTruthy();
		*/
	});
	it("Check value required", () => {
		const wrapper = shallowMount(BaseInput, {
			propsData: {
				type: "text",
				value: "",
				label: "not relevant",
				name: "not relevant",
			},
		});
		const value = wrapper.vm.$options.props.value;
		expect(value.required).toBeTruthy();
	});
	it("Check label required", () => {
		const wrapper = shallowMount(BaseInput, {
			propsData: {
				type: "text",
				value: "",
				label: "not relevant",
				name: "not relevant",
			},
		});
		const label = wrapper.vm.$options.props.label;
		expect(label.required).toBeTruthy();
	});
	it("Check name required", () => {
		const wrapper = shallowMount(BaseInput, {
			propsData: {
				type: "text",
				value: "",
				label: "not relevant",
				name: "not relevant",
			},
		});
		const label = wrapper.vm.$options.props.label;
		expect(label.required).toBeTruthy();
	});
	it("Check name required", () => {
		const wrapper = shallowMount(BaseInput, {
			propsData: {
				type: "text",
				value: "",
				label: "not relevant",
				name: "not relevant",
			},
		});
		const name = wrapper.vm.$options.props.name;
		expect(name.required).toBeTruthy();
	});

	// Not sure whats to be tested here
	// it("passes through attributes", () => {
	// 	// list based on https://www.w3schools.com/tags/tag_input.asp
	// 	const attributes = {
	// 		alt: "input element",
	// 		autocomplete: "on",
	// 		autofocus: "autofocus",
	// 		disabled: "disabled",
	// 		form: "form_id",
	// 		maxlength: "5",
	// 		multiple: "multiple",
	// 		name: "input-name",
	// 		pattern: ".*",
	// 		placeholder: "placeholder text",
	// 		readonly: "readonly",
	// 		required: "required",
	// 		type: "text",
	// 	};
	// 	var parent = mount({
	// 		data: () => ({ username: "" }),
	// 		template: `<div> <base-input
	// 				v-model="username"
	// 				label="MyLabel"
	// 				${Object.keys(attributes)
	// 					.map((key) => {
	// 						return `${key}="${attributes[key]}"`;
	// 					})
	// 					.join("")}
	// 			/></div>`,
	// 		components: { BaseInput: BaseInput },
	// 	});
	// 	const inputField = parent.find("input").element;
	// 	Object.keys(attributes).forEach((key) => {
	// 		expect(inputField.getAttribute(key)).toBe(attributes[key]);
	// 	});
	// });
});

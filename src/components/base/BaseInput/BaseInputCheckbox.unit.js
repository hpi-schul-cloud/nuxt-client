import BaseInput from "./BaseInput";
import { supportedTypes } from "./BaseInputCheckbox";

describe("@components/BaseInputCheckbox", () => {
	it(`Check if input type="checkbox" is rendered`, () => {
		supportedTypes.forEach((type) => {
			const wrapper = mount(BaseInput, {
				propsData: {
					label: "Checkbox",
					name: "checkbox",
					type,
					vmodel: true,
				},
			});
			expect(wrapper.find("input[type='checkbox']").exists()).toBeTruthy();
		});
	});

	it(`input toggles boolean vmodel`, () => {
		supportedTypes.forEach((type) => {
			const wrapper = mount({
				data: () => ({ value: false }),
				template: `<base-input v-model="value" label="test" type="${type}" name="checkbox" />`,
				components: { BaseInput },
			});
			const input = wrapper.find("input");
			expect(wrapper.vm.value).toBe(false);
			input.setChecked(true);
			expect(wrapper.vm.value).toBe(true);
			input.setChecked(false);
			expect(wrapper.vm.value).toBe(false);

			["input", "label"].forEach((clickTargetSelector) => {
				const clickTarget = wrapper.find(clickTargetSelector);
				expect(wrapper.vm.value).toBe(false);
				clickTarget.trigger("click");
				expect(wrapper.vm.value).toBe(true);
				clickTarget.trigger("click");
				expect(wrapper.vm.value).toBe(false);
			});
		});
	});

	it(`use array v-model if value is specified`, () => {
		const testValue = "test";
		const wrapper = mount({
			data: () => ({ value: ["other Value"] }),
			template: `<base-input v-model="value" value="${testValue}" label="test" type="checkbox" name="checkbox"/>`,
			components: { BaseInput },
		});

		const input = wrapper.find("input");
		const valueBefore = wrapper.vm.value.length;
		input.setChecked(true);
		expect(wrapper.vm.value.length).toBe(valueBefore + 1);
		expect(wrapper.vm.value.includes(testValue)).toBeTruthy();
		input.setChecked(false);
		expect(wrapper.vm.value.length).toBe(valueBefore);
		expect(wrapper.vm.value.includes(testValue)).toBeFalsy();
	});
	
	it(`shows checkmark only when it is checked`, () => {
		const wrapper = mount({
			data: () => ({ value: false }),
			template: `<base-input v-model="value" label="test" type="checkbox" name="checkbox" />`,
			components: { BaseInput },
		});

		["input", "label"].forEach((clickTargetSelector) => {
			const clickTarget = wrapper.find(clickTargetSelector);
			expect(wrapper.find(".checkmark").exists()).toBe(false);
			clickTarget.trigger("click");
			expect(wrapper.find(".checkmark").exists()).toBe(true);
			clickTarget.trigger("click");
			expect(wrapper.find(".checkmark").exists()).toBe(false);
		});
	});
});

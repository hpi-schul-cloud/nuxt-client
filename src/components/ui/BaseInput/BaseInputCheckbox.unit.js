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
			data: () => ({ value: [] }),
			template: `<base-input v-model="value" value="${testValue}" label="test" type="checkbox" name="checkbox"></base-input>`,
			components: { BaseInput },
		});

		const input = wrapper.find("input");
		expect(wrapper.vm.value.length).toBe(0);
		input.setChecked(true);
		expect(wrapper.vm.value.length).toBe(1);
		expect(wrapper.vm.value.includes(testValue)).toBeTruthy();
		input.setChecked(false);
		expect(wrapper.vm.value.length).toBe(0);
	});
});

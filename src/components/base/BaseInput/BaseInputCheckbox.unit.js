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
			expect(wrapper.find("input[type='checkbox']").exists()).toBe(true);
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
		expect(wrapper.vm.value).toHaveLength(valueBefore + 1);
		expect(wrapper.vm.value).toContain(testValue);
		input.setChecked(false);
		expect(wrapper.vm.value).toHaveLength(valueBefore);
		expect(wrapper.vm.value).not.toContain(testValue);
	});

	it(`shows checkmark only when it is checked`, async () => {
		await Promise.all(
			["input", "label"].map(async (clickTargetSelector) => {
				const wrapper = mount(
					{
						data: () => ({ value: false }),
						template: `<base-input v-model="value" label="test" type="checkbox" name="checkbox" />`,
						components: { BaseInput },
					},
					{
						stubs: { BaseIcon: true },
					}
				);

				const clickTarget = wrapper.find(clickTargetSelector);
				const icon = wrapper.get("baseicon-stub");
				expect(icon.attributes("icon")).toBe("check_box_outline_blank");
				clickTarget.trigger("click");
				await wrapper.vm.$nextTick();
				expect(icon.attributes("icon")).toBe("check_box");
				clickTarget.trigger("click");
				await wrapper.vm.$nextTick();
				expect(icon.attributes("icon")).toBe("check_box_outline_blank");
			})
		);
	});

	it(`can show indeterminated state for undefined values`, async () => {
		const wrapper = mount(
			{
				data: () => ({ value: undefined }),
				template: `<base-input v-model="value" label="test" type="checkbox" name="checkbox" :show-undefined-state="true" />`,
				components: { BaseInput },
			},
			{
				stubs: { BaseIcon: true },
			}
		);

		const icon = wrapper.get("baseicon-stub");
		expect(icon.attributes("icon")).toBe("indeterminate_check_box");
	});

	it(`throws an error if show-undefined-state is set on type=switch`, async () => {
		expect(() =>
			mount({
				data: () => ({ value: undefined }),
				template: `<base-input v-model="value" label="test" type="switch" name="checkbox" :show-undefined-state="true" />`,
				components: { BaseInput },
			})
		).toThrow("Error: showUndefinedState is only allowed on type=checkbox.");
	});

	it(`throws an error if show-undefined-state is set when v-model is of type Array`, async () => {
		expect(() =>
			mount({
				data: () => ({ value: [] }),
				template: `<base-input v-model="value" label="test" type="checkbox" name="checkbox" :show-undefined-state="true" />`,
				components: { BaseInput },
			})
		).toThrow(
			"Error: showUndefinedState is not allowed if v-model is of type Array."
		);
	});
});

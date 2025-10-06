import BaseInput from "./BaseInput";
import { supportedTypes } from "./BaseInputCheckbox";
import { createTestingVuetify } from "@@/tests/test-utils/setup";

describe("@/components/base/BaseInputCheckbox", () => {
	it(`Check if input type="checkbox" is rendered`, () => {
		supportedTypes.forEach((type) => {
			const wrapper = mount(BaseInput, {
				global: {
					plugins: [createTestingVuetify()],
				},
				props: {
					label: "Checkbox",
					type,
					modelValue: true,
					color: `rgba(var(--v-theme-on-background))`,
				},
			});
			expect(wrapper.find("input[type='checkbox']").exists()).toBe(true);
		});
	});

	it(`use array v-model if value is specified`, async () => {
		const testValue = "test";
		const wrapper = mount(BaseInput, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props: {
				label: "Checkbox",
				type: "checkbox",
				modelValue: [],
				value: testValue,
			},
		});

		const input = wrapper.find("input");
		input.setChecked(true);
		expect(wrapper.emitted("update:modelValue")[0][0]).toEqual([testValue]);
		input.setChecked(false);
		expect(wrapper.emitted("update:modelValue")[1][0]).toEqual([]);
	});

	it(`can show indeterminated state for undefined values`, async () => {
		const wrapper = mount(BaseInput, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props: {
				label: "Checkbox",
				name: "checkbox",
				type: "checkbox",
				modelValue: undefined,
				showUndefinedState: true,
			},
		});

		expect(
			wrapper
				.html()
				.includes(
					`<path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,17H7V7H17V17Z"></path>`
				)
		).toBe(true);
	});

	it(`throws an error if show-undefined-state is set when v-model is of type Array`, async () => {
		expect(() =>
			mount(BaseInput, {
				global: {
					plugins: [createTestingVuetify()],
				},
				props: {
					label: "Checkbox",
					name: "checkbox",
					type: "checkbox",
					modelValue: [],
					showUndefinedState: true,
				},
			})
		).toThrow("showUndefinedState is not allowed if v-model is of type Array.");
	});
});

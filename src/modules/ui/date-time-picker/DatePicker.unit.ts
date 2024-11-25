import { ComponentMountingOptions, mount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import DatePicker from "./DatePicker.vue";

describe("DatePicker", () => {
	const mountComponent = (
		options: ComponentMountingOptions<typeof DatePicker> = {}
	) => {
		return mount(DatePicker, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					"transition-group": false,
				},
			},
			...options,
			attachTo: document.body,
		});
	};

	it("should render component", () => {
		const wrapper = mountComponent({
			props: { date: new Date().toISOString() },
		});
		expect(wrapper.findComponent(DatePicker).exists()).toBe(true);
	});

	it("should emit update:date event on input", async () => {
		const wrapper = mountComponent({
			props: { date: new Date().toISOString() },
		});

		const textField = wrapper
			.findComponent({ name: "v-text-field" })
			.find("input");
		expect(textField.exists()).toBe(true);
		await textField.trigger("click");

		const dateSelector = wrapper.findComponent({ name: "v-date-picker" });
		expect(dateSelector.exists()).toBe(true);
		dateSelector.vm.$emit("update:modelValue", new Date().toISOString());

		expect(wrapper.emitted("update:date")).toHaveLength(1);
	});

	describe("when required prop is set & value is left empty", () => {
		it("should emit error event", async () => {
			const wrapper = mountComponent({
				props: {
					date: new Date().toISOString(),
					required: true,
				},
			});

			const textField = wrapper.findComponent({ name: "v-text-field" });
			const input = textField.find("input");

			await input.setValue("");

			expect(wrapper.emitted("update:date")).toBeUndefined();
			expect(wrapper.emitted("error")).toHaveLength(1);
		});
	});

	describe("when date is invalid", () => {
		it("should emit error event", async () => {
			const wrapper = mountComponent({
				props: { date: new Date().toISOString() },
			});

			const textField = wrapper.findComponent({ name: "v-text-field" });
			const input = textField.find("input");

			await input.setValue("55.55.5555");

			expect(wrapper.emitted("update:date")).toBeUndefined();
			expect(wrapper.emitted("error")).toHaveLength(1);
		});

		// TODO: Can't properly be tested with debounced validation, needs a new approach
		it.todo("should display error message");
		it.todo("should display external error message");
	});
});

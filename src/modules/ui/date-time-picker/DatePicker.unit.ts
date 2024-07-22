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
		dateSelector.vm.$emit("update:model-value", new Date().toISOString());

		expect(wrapper.emitted("update:date")).toHaveLength(1);
	});

	describe("when date is invalid", () => {
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
	});
});

import TimePicker from "./TimePicker.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { VTextField } from "vuetify/components";

describe("TimePicker", () => {
	const mountComponent = (options: ComponentMountingOptions<typeof TimePicker> = {}) =>
		mount(TimePicker, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
			attachTo: document.body,
		});

	it("should render component with empty value", () => {
		const wrapper = mountComponent({
			props: { time: "" },
		});
		expect(wrapper.findComponent(TimePicker).exists()).toBe(true);
	});

	it("should render component with given value", () => {
		const wrapper = mountComponent({
			props: { time: "12:30" },
		});
		expect(wrapper.findComponent(TimePicker).exists()).toBe(true);
	});

	it("should format raw numeric input into HH:MM pattern", async () => {
		const wrapper = mountComponent({
			props: { time: "" },
		});
		const textField = wrapper.findComponent(VTextField);
		const input = textField.find("input");

		await input.setValue("1230");

		expect(input.element.value).toBe("12:30");
	});

	describe("when picking a time through typing", () => {
		it("should emit event on input", async () => {
			const wrapper = mountComponent({
				props: { time: "12:30" },
			});

			const input = wrapper.findComponent({ name: "v-text-field" }).find("input");

			await input.setValue("16:45");

			expect(wrapper.emitted("update:time")).not.toBeUndefined();
			expect(wrapper.emitted("update:time")!.length).toBeGreaterThan(0);
		});
	});
});

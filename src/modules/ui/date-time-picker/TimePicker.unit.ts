import TimePicker from "./TimePicker.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VTextField } from "vuetify/components";

describe("TimePicker", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

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
		it("should emit update:time event on valid input", async () => {
			const wrapper = mountComponent({
				props: { time: "12:30" },
			});

			const input = wrapper.findComponent({ name: "v-text-field" }).find("input");
			await input.setValue("16:45");

			expect(wrapper.emitted("update:time")![1]).toEqual(["16:45"]);
		});
	});

	describe("validation", () => {
		describe("when time is required", () => {
			it("should show validation error on empty input", async () => {
				const wrapper = mountComponent({
					props: { time: "12:30", required: true },
				});

				const textField = wrapper.findComponent(VTextField);
				await textField.setValue("");
				await textField.vm.validate();

				expect(textField.vm.isValid).toBe(false);
			});
		});

		describe("when time is not required and value is empty", () => {
			it("should emit update:time event", async () => {
				const wrapper = mountComponent({
					props: { time: "12:30" },
				});

				const input = wrapper.findComponent(VTextField).find("input");
				await input.setValue("");

				expect(wrapper.emitted("update:time")![1]).toEqual([""]);
			});
		});

		describe("when time does not fit format", () => {
			it("should not emit update:time event for invalid time", async () => {
				const wrapper = mountComponent({
					props: { time: "12:30" },
				});

				const input = wrapper.findComponent({ name: "v-text-field" }).find("input");

				await input.trigger("focus");
				await input.setValue("25:65");

				expect(wrapper.emitted("update:time")).toBeUndefined();
			});
		});
	});
});

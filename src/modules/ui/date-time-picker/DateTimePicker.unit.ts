import DateTimePicker from "./DateTimePicker.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

describe("DateTimePicker", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const mountComponent = (options: ComponentMountingOptions<typeof DateTimePicker> = {}) =>
		mount(DateTimePicker, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
			attachTo: document.body,
		});

	it("should render component", () => {
		const wrapper = mountComponent({
			props: { dateTime: new Date().toISOString() },
		});

		expect(wrapper.findComponent(DateTimePicker).exists()).toBe(true);
	});

	describe("if date and time are set", () => {
		it("should emit input event on date input", async () => {
			const wrapper = mountComponent({
				props: { dateTime: new Date().toISOString() },
			});

			const datePicker = wrapper.findComponent({ name: "date-picker" });
			expect(datePicker.exists()).toBe(true);
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			datePicker.vm.$emit("update:date", tomorrow.toISOString());

			expect(wrapper.emitted("update:dateTime")).toHaveLength(1);
		});

		it("should emit input event on time input", async () => {
			const wrapper = mountComponent({
				props: { dateTime: new Date().toISOString() },
			});

			const timePicker = wrapper.findComponent({ name: "time-picker" });
			expect(timePicker.exists()).toBe(true);
			timePicker.vm.$emit("update:time", "00:00");

			expect(wrapper.emitted("update:dateTime")).toHaveLength(1);
		});
	});

	describe("if only date is set", () => {
		it("should emit input event with time set to 23:59", async () => {
			const wrapper = mountComponent({
				props: { dateTime: "" },
			});

			const datePicker = wrapper.findComponent({ name: "date-picker" });
			const date = new Date("2030-01-01");
			datePicker.vm.$emit("update:date", date.toISOString());

			const emits = wrapper.emitted("update:dateTime");
			expect(emits?.length).toEqual(1);
			date.setHours(23);
			date.setMinutes(59);
			expect(emits?.[0]).toEqual([date.toISOString()]);
		});
	});

	describe("if only time is set", () => {
		it("should emit no input event", async () => {
			const wrapper = mountComponent({
				props: { dateTime: "" },
			});

			const timePicker = wrapper.findComponent({ name: "time-picker" });
			timePicker.vm.$emit("update:time", "00:00");

			expect(wrapper.emitted("input")).toBe(undefined);
		});
	});

	describe("if date and time values are removed", () => {
		it("should emit input event", async () => {
			const wrapper = mountComponent({
				props: { dateTime: new Date().toISOString() },
			});

			const datePicker = wrapper.findComponent({ name: "date-picker" });
			datePicker.vm.$emit("update:date", "");

			expect(wrapper.emitted("update:dateTime")).toBe(undefined);

			const timePicker = wrapper.findComponent({ name: "time-picker" });
			timePicker.vm.$emit("update:time", "");

			expect(wrapper.emitted("update:dateTime")).toHaveLength(1);
		});
	});
});

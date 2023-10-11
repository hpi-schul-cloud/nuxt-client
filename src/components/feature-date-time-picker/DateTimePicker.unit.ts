import Vue from "vue";
import { MountOptions, Wrapper, mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import DateTimePicker from "./DateTimePicker.vue";
import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";

type DateTimePickerProps = {
	dateTime: string;
	dateInputLabel?: string;
	dateInputAriaLabel?: string;
	minDate?: string;
	maxDate?: string;
	timeInputLabel?: string;
	timeInputAriaLabel?: string;
	required?: boolean;
};

describe("DateTimePicker", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: DateTimePickerProps) => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(DateTimePicker as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
			},
		});
	};

	it("should render component", () => {
		setup({ dateTime: new Date().toISOString() });

		expect(wrapper.findComponent(DateTimePicker).exists()).toBe(true);
	});

	describe("if date and time are set", () => {
		it("should emit input event on date input", async () => {
			setup({ dateTime: new Date().toISOString() });

			const datePicker = wrapper.findComponent({ name: "date-picker" });
			expect(datePicker.exists()).toBe(true);
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			datePicker.vm.$emit("update:date", tomorrow);

			await wrapper.vm.$nextTick();

			expect(wrapper.emitted("input")).toHaveLength(1);
		});

		it("should emit input event on time input", async () => {
			jest.useFakeTimers();
			setup({ dateTime: new Date().toISOString() });

			const timePicker = wrapper.findComponent({ name: "time-picker" });
			expect(timePicker.exists()).toBe(true);
			timePicker.vm.$emit("update:time", "00:00");

			jest.advanceTimersByTime(1000);

			expect(wrapper.emitted("input")).toHaveLength(1);
		});
	});

	describe("if only date is set", () => {
		it("should emit input event with time set to 23:59", async () => {
			jest.useFakeTimers();
			setup({ dateTime: "" });

			const datePicker = wrapper.findComponent({ name: "date-picker" });
			const date = new Date("2030-01-01");
			datePicker.vm.$emit("update:date", date);

			jest.advanceTimersByTime(1000);

			const emits = wrapper.emitted("input");
			expect(emits?.length).toEqual(1);
			date.setHours(23);
			date.setMinutes(59);
			expect(emits?.[0]).toEqual([date.toISOString()]);
		});
	});

	describe("if only time is set", () => {
		it("should emit no input event", async () => {
			jest.useFakeTimers();
			setup({ dateTime: "" });

			const timePicker = wrapper.findComponent({ name: "time-picker" });
			timePicker.vm.$emit("update:time", "00:00");

			jest.advanceTimersByTime(1000);

			expect(wrapper.emitted("input")).toBe(undefined);
		});
	});
});

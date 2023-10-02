import Vue from "vue";
import { MountOptions, Wrapper, mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import DateTimePicker from "./DateTimePicker.vue";
import { I18N_KEY } from "@/utils/inject";

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
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
		});
	};

	it("should render component", () => {
		setup({ dateTime: new Date().toISOString() });

		expect(wrapper.findComponent(DateTimePicker).exists()).toBe(true);
	});

	it("should emit input event on date input", async () => {
		setup({ dateTime: new Date().toISOString() });

		const datePicker = wrapper.findComponent({ name: "date-picker" });
		expect(datePicker.exists()).toBe(true);
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		datePicker.vm.$emit("input", tomorrow);

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted("input")).toHaveLength(1);
	});

	it("should emit input event on time input", async () => {
		jest.useFakeTimers();
		setup({ dateTime: new Date().toISOString() });

		const timePicker = wrapper.findComponent({ name: "time-picker" });
		expect(timePicker.exists()).toBe(true);
		timePicker.vm.$emit("input", "00:00");

		jest.advanceTimersByTime(1000);

		expect(wrapper.emitted("input")).toHaveLength(1);
	});

	it("should restrict timepicker when date is today", async () => {
		setup({ dateTime: new Date().toISOString() });

		const timePicker = wrapper.findComponent({ name: "time-picker" });
		expect(timePicker.exists()).toBe(true);
		expect(timePicker.props("allowPast")).toBe(false);
	});

	it("should not restrict timepicker when date is in the future", async () => {
		setup({ dateTime: new Date("2300-01-01T00:00:00").toISOString() });

		const timePicker = wrapper.findComponent({ name: "time-picker" });
		expect(timePicker.exists()).toBe(true);
		expect(timePicker.props("allowPast")).toBe(true);
	});
});

import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import DateTimePicker from "@/components/date-time-picker/DateTimePicker.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(DateTimePicker, {
		...createComponentMocks({
			i18n: true,
		}),
		provide: {
			i18n: { t: (key: string) => key },
		},
		propsData: props,
		...options,
	});
};

describe("@components/date-time-picker/DateTimePicker", () => {
	it("should render component", () => {
		const wrapper = getWrapper({
			dateTime: new Date().toISOString(),
		});
		expect(wrapper.findComponent(DateTimePicker).exists()).toBe(true);
	});

	it("should emit input event on date input", async () => {
		const wrapper = getWrapper({
			dateTime: new Date().toISOString(),
		});

		const datePicker = wrapper.findComponent({ name: "date-picker" });
		expect(datePicker.exists()).toBe(true);
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		datePicker.vm.$emit("input", tomorrow);

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted("input")).toHaveLength(1);
	});

	it("should emit input event on time input", async () => {
		const wrapper = getWrapper({
			dateTime: new Date().toISOString(),
		});

		const timePicker = wrapper.findComponent({ name: "time-picker" });
		expect(timePicker.exists()).toBe(true);
		timePicker.vm.$emit("input", "00:00");

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted("input")).toHaveLength(1);
	});

	it("should emit error event on invalid date input", async () => {
		const wrapper = getWrapper({
			dateTime: new Date().toISOString(),
		});

		const datePicker = wrapper.findComponent({ name: "date-picker" });
		expect(datePicker.exists()).toBe(true);
		datePicker.vm.$emit("error");

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted("error")).toHaveLength(1);
		expect(wrapper.emitted("input")).toBe(undefined);
	});

	it("should emit error event on invalid time input", async () => {
		const wrapper = getWrapper({
			dateTime: new Date().toISOString(),
		});

		const timePicker = wrapper.findComponent({ name: "time-picker" });
		expect(timePicker.exists()).toBe(true);
		timePicker.vm.$emit("error");

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted("error")).toHaveLength(1);
		expect(wrapper.emitted("input")).toBe(undefined);
	});
});

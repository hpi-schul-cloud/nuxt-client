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

	it("should emit input event on input", async () => {
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
});

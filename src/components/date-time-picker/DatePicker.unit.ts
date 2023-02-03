import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import DatePicker from "@/components/date-time-picker/DatePicker.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(DatePicker, {
		...createComponentMocks({
			i18n: true,
		}),
		setup() {
			provide("i18n", { t: (key: string) => key });
		},
		propsData: props,
		...options,
	});
};

describe("@components/date-time-picker/DatePicker", () => {
	it("should render component", () => {
		const wrapper = getWrapper({
			date: new Date().toISOString(),
			ariaLabel: "aria label",
		});
		expect(wrapper.findComponent(DatePicker).exists()).toBe(true);
	});

	// HELP
	it("should emit event on input", async () => {
		const wrapper = getWrapper({
			date: new Date().toISOString(),
			ariaLabel: "aria label",
		});

		// wrapper.vm.showDateDialog = true;
		// const v = wrapper.find("[data-testid='v']");
		// v.vm.$emit("input");
		// expect(wrapper.emitted("input")).toHaveLength(1);

		const textField = wrapper
			.findComponent({ name: "v-text-field" })
			.find("input");
		expect(textField.exists()).toBe(true);
		await textField.trigger("click");

		const dateSelector = wrapper.findComponent({ name: "v-date-picker" });
		expect(dateSelector.exists()).toBe(true);
		dateSelector.vm.$emit("input");
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted("input")).toHaveLength(1);
	});
});

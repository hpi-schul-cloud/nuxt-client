import { provide } from "vue";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TimePicker from "@/components/date-time-picker/TimePicker.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(TimePicker, {
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

describe("@components/date-time-picker/TimePicker", () => {
	it("should render component with empty value", () => {
		const wrapper = getWrapper({
			time: "",
		});
		expect(wrapper.findComponent(TimePicker).exists()).toBe(true);
	});

	it("should render component with given value", () => {
		const wrapper = getWrapper({
			time: "12:30",
		});
		expect(wrapper.findComponent(TimePicker).exists()).toBe(true);
	});

	it("should compute correct values for timesOfDayList", async () => {
		const wrapper = getWrapper({
			time: "",
		});

		const textField = wrapper
			.findComponent({ name: "v-text-field" })
			.find("input");
		expect(textField.exists()).toBe(true);
		await textField.trigger("click");

		const menu = wrapper.find(".v-menu");
		const listItem = menu.find("[data-testid='time-select-1']");
		const listItemValue = menu.find(".v-list-item__title");
		console.log(listItemValue);
		expect(wrapper.findComponent(TimePicker).exists()).toBe(true);
	});

	// it("should emit event on input", async () => {
	// 	const wrapper = getWrapper({
	// 		date: new Date().toISOString(),
	// 		ariaLabel: "aria label",
	// 	});

	// 	const textField = wrapper
	// 		.findComponent({ name: "v-text-field" })
	// 		.find("input");
	// 	expect(textField.exists()).toBe(true);
	// 	await textField.trigger("click");

	// 	const dateSelector = wrapper.findComponent({ name: "v-date-picker" });
	// 	expect(dateSelector.exists()).toBe(true);
	// 	dateSelector.vm.$emit("input");
	// 	await wrapper.vm.$nextTick();

	// 	expect(wrapper.emitted("input")).toHaveLength(1);
	// });
});

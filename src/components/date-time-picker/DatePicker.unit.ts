import Vue from "vue";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import DatePicker from "@/components/date-time-picker/DatePicker.vue";

type DatePickerProps = {
	date: string;
	label?: string;
	ariaLabel?: string;
	required?: boolean;
	minDate?: string;
	maxDate?: string;
};

describe("@components/date-time-picker/DatePicker", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: DatePickerProps) => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(DatePicker as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
			provide: {
				i18n: { t: (key: string) => key },
			},
		});
	};

	it("should render component", () => {
		setup({ date: new Date().toISOString() });
		expect(wrapper.findComponent(DatePicker).exists()).toBe(true);
	});

	it("should emit input event on input", async () => {
		setup({ date: new Date().toISOString() });

		const textField = wrapper
			.findComponent({ name: "v-text-field" })
			.find("input");
		expect(textField.exists()).toBe(true);
		await textField.trigger("click");

		const dateSelector = wrapper.findComponent({ name: "v-date-picker" });
		expect(dateSelector.exists()).toBe(true);
		dateSelector.vm.$emit("input", new Date().toISOString());
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted("input")).toHaveLength(1);
	});

	describe("when date is required", () => {
		it("should emit error event on validation fail", async () => {
			setup({
				date: new Date().toISOString(),
				required: true,
			});

			const textField = wrapper.findComponent({ name: "v-text-field" });
			const clearBtn = textField.find(".v-icon");
			expect(clearBtn.exists()).toBe(true);
			await clearBtn.trigger("click");

			expect(wrapper.emitted("error")).toHaveLength(1);
		});
	});

	describe("when date is not required", () => {
		it("should not emit error event", async () => {
			setup({ date: new Date().toISOString() });

			const textField = wrapper.findComponent({ name: "v-text-field" });

			textField.vm.$emit("blur", {
				target: { value: new Date().toISOString() },
			});
			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("error")).toBe(undefined);
		});
	});
});

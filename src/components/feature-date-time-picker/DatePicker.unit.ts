import Vue from "vue";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import DatePicker from "./DatePicker.vue";
import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";

type DatePickerProps = {
	date: string;
	label?: string;
	ariaLabel?: string;
	required?: boolean;
	minDate?: string;
	maxDate?: string;
};

describe("DatePicker", () => {
	let wrapper: Wrapper<Vue>;

	// Fully mount component in the document so that trigger("focus") really focuses
	// https://v1.test-utils.vuejs.org/api/wrapper/trigger.html
	const attachToDOM = () => {
		const div = document.createElement("div");
		div.id = "root";
		document.body.appendChild(div);
	};

	const setup = (props: DatePickerProps) => {
		document.body.setAttribute("data-app", "true");
		attachToDOM();

		wrapper = mount(DatePicker as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
			},
			attachTo: "#root",
		});
	};

	it("should render component", () => {
		setup({ date: new Date().toISOString() });
		expect(wrapper.findComponent(DatePicker).exists()).toBe(true);
	});

	it("should emit update:date event on input", async () => {
		jest.useFakeTimers();
		setup({ date: new Date().toISOString() });

		const textField = wrapper
			.findComponent({ name: "v-text-field" })
			.find("input");
		expect(textField.exists()).toBe(true);
		await textField.trigger("click");

		const dateSelector = wrapper.findComponent({ name: "v-date-picker" });
		expect(dateSelector.exists()).toBe(true);
		dateSelector.vm.$emit("input", new Date().toISOString());

		jest.advanceTimersByTime(1000);
		expect(wrapper.emitted("update:date")).toHaveLength(1);
	});

	describe("when date is required", () => {
		it("should not emit update:date event on empty input", async () => {
			setup({
				date: new Date().toISOString(),
				required: true,
			});

			const textField = wrapper.findComponent({ name: "v-text-field" });
			const input = textField.find("input");

			await input.setValue("");
			await wrapper.vm.$nextTick();

			expect(wrapper.emitted("update:date")).toBeUndefined();
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

import {
	ComponentMountingOptions,
	flushPromises,
	mount,
} from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import DatePicker from "./DatePicker.vue";

describe("DatePicker", () => {
	const mountComponent = (
		options: ComponentMountingOptions<typeof DatePicker> = {}
	) => {
		return mount(DatePicker, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					"transition-group": false,
				},
			},
			...options,
			attachTo: document.body,
		});
	};

	const setup = () => {
		const wrapper = mountComponent({
			props: {
				date: new Date().toISOString(),
				required: true,
			},
		});

		const textField = wrapper.findComponent({ name: "v-text-field" });
		const input = textField.find("input");

		return { wrapper, textField, input };
	};

	it("should render component", () => {
		const wrapper = mountComponent({
			props: { date: new Date().toISOString() },
		});
		expect(wrapper.findComponent(DatePicker).exists()).toBe(true);
	});

	it("should render text field", () => {
		const { textField } = setup();

		expect(textField.exists()).toBe(true);
	});

	it("should emit update:date event on input", async () => {
		const { wrapper, textField } = setup();

		await textField.trigger("click");

		const datePicker = wrapper.findComponent({ name: "v-date-picker" });
		expect(datePicker.exists()).toBe(true);

		await datePicker.vm.$emit("update:modelValue", new Date().toISOString());
		await flushPromises();
		expect(wrapper.emitted("update:date")).toHaveLength(1);
	});

	describe("when required prop is set & value is left empty", () => {
		it("should emit error event", async () => {
			const { wrapper, input } = setup();

			await input.setValue("");
			await flushPromises();

			expect(wrapper.emitted("error")).toHaveLength(1);
		});

		it("should emit update:date event with null value", async () => {
			const { wrapper, input } = setup();

			await input.setValue("");
			await flushPromises();

			const updateDateEvent = wrapper.emitted("update:date");
			const updateDateEventValue = updateDateEvent?.[0][0];

			expect(updateDateEvent).toHaveLength(1);
			expect(updateDateEventValue).toBe(null);
		});

		it("should display error message for invalid date format", async () => {
			jest.useFakeTimers();
			const { textField, input } = setup();

			await input.setValue("");
			jest.advanceTimersByTime(1000);
			await flushPromises();

			const errorElement = textField.find(".v-messages");
			expect(errorElement.text()).toEqual(
				"components.datePicker.validation.required"
			);
		});
	});

	describe("when date is invalid", () => {
		it("should emit error event", async () => {
			const wrapper = mountComponent({
				props: { date: new Date().toISOString() },
			});

			const textField = wrapper.findComponent({ name: "v-text-field" });
			const input = textField.find("input");

			await input.setValue("55.55.5555");
			await flushPromises();

			expect(wrapper.emitted("error")).toHaveLength(1);
		});

		it("should emit update:date event with null value", async () => {
			const { wrapper, input } = setup();

			await input.setValue("");
			await flushPromises();

			const updateDateEvent = wrapper.emitted("update:date");
			const updateDateEventValue = updateDateEvent?.[0][0];

			expect(updateDateEvent).toHaveLength(1);
			expect(updateDateEventValue).toBe(null);
		});

		it("should display error message for invalid date format", async () => {
			jest.useFakeTimers();
			const { textField, input } = setup();

			await input.setValue("22");
			jest.advanceTimersByTime(1000);
			await flushPromises();

			const errorElement = textField.find(".v-messages");
			expect(errorElement.text()).toEqual(
				"components.datePicker.validation.format"
			);
		});

		it.todo("should display external error message");
	});
});

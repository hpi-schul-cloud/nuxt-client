import DatePicker from "./DatePicker.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { flushPromises, mount } from "@vue/test-utils";
import { VDatePicker, VMenu, VTextField } from "vuetify/components";

describe("DatePicker", () => {
	const setup = (options?: Partial<{ date: string; required: boolean }>) => {
		const wrapper = mount(DatePicker, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					UseFocusTrap: true,
					VMenu: true,
				},
			},
			props: {
				date: options?.date || undefined,
				required: options?.required || true,
			},
		});

		const textField = wrapper.findComponent(VTextField);

		return { wrapper, textField };
	};

	it("should render component", () => {
		const { wrapper } = setup({ date: new Date().toISOString() });
		const datePicker = wrapper.findComponent(DatePicker);

		expect(datePicker.exists()).toBe(true);
	});

	it("should render text field", () => {
		const { textField } = setup();

		expect(textField.exists()).toBe(true);
	});

	it("should emit update:date event valid input", async () => {
		const { wrapper, textField } = setup();

		await textField.trigger("click");
		const menu = wrapper.getComponent(VMenu);
		const datePicker = menu.getComponent(VDatePicker);

		const selectedDate = new Date("2025-10-30T00:00:00+01:00");
		await datePicker.setValue(selectedDate);
		await flushPromises();

		expect(wrapper.emitted("update:date")).toHaveLength(1);
		expect(wrapper.emitted("update:date")![0]).toEqual([selectedDate.toISOString()]);
	});

	describe("when required prop is set & value is left empty", () => {
		it("should emit error event", async () => {
			const { wrapper, textField } = setup();

			await textField.setValue("");
			await flushPromises();

			const errorEvent = wrapper.emitted("error");
			expect(errorEvent).toHaveLength(1);
		});

		it("should emit update:date event with null value", async () => {
			const { wrapper, textField } = setup();

			await textField.setValue("");
			await flushPromises();

			const updateDateEvent = wrapper.emitted("update:date");
			const updateDateEventValue = updateDateEvent?.[0][0];

			expect(updateDateEvent).toBeDefined();
			expect(updateDateEvent!.length).toBeGreaterThan(0);
			expect(updateDateEventValue).toBe(null);
		});

		it("should display error message for required date", async () => {
			vi.useFakeTimers();
			const { textField } = setup();

			await textField.setValue("");
			await flushPromises();

			expect(textField.text()).toBe("components.datePicker.validation.required");
		});
	});

	describe("when date is invalid", () => {
		it("should emit error event", async () => {
			const { wrapper, textField } = setup();

			await textField.setValue("55.55.5555");
			await flushPromises();

			const errorEvent = wrapper.emitted("error");
			expect(wrapper.emitted("error")).toBeDefined();
			expect(errorEvent).toHaveLength(1);
		});

		it("should emit update:date event with null value", async () => {
			const { wrapper, textField } = setup();

			await textField.setValue("");
			await flushPromises();

			const updateDateEvent = wrapper.emitted("update:date");
			const updateDateEventValue = updateDateEvent?.[0][0];

			expect(updateDateEvent).toBeDefined();
			expect(updateDateEvent!.length).toBeGreaterThan(0);
			expect(updateDateEventValue).toBe(null);
		});

		it("should display error message for invalid date format", async () => {
			const { textField } = setup();

			await textField.setValue("22");
			await flushPromises();

			expect(textField.text()).toBe("components.datePicker.validation.format");
		});

		// TODO: add more tests, e.g for keyboard navigation, when valid date, watchers
	});
});

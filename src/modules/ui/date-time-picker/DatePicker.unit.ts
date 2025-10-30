import DatePicker from "./DatePicker.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { flushPromises, mount } from "@vue/test-utils";
import { VDatePicker, VMenu, VTextField } from "vuetify/components";

describe("DatePicker", () => {
	const setup = (options?: Partial<{ date: string; required: boolean; ariaLabel: string; label: string }>) => {
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
				date: options?.date ?? undefined,
				required: options?.required ?? true,
				ariaLabel: options?.ariaLabel ?? undefined,
				label: options?.label ?? undefined,
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

	describe("keyboard navigation", () => {
		it("should open date picker menu on space key", async () => {
			const { wrapper, textField } = setup();
			const datePickerMenu = wrapper.findComponent(VMenu);

			await textField.trigger("keydown.space");
			await flushPromises();

			expect(datePickerMenu.props().modelValue).toBe(true);
		});

		it("should open date picker menu on enter key", async () => {
			const { wrapper, textField } = setup();
			const datePickerMenu = wrapper.findComponent(VMenu);

			await textField.trigger("keydown.enter");
			await flushPromises();

			expect(datePickerMenu.props().modelValue).toBe(true);
		});

		it("should close date picker menu on tab key", async () => {
			const { wrapper, textField } = setup();
			const datePickerMenu = wrapper.findComponent(VMenu);

			await textField.trigger("click");
			await textField.trigger("keydown.tab");
			await flushPromises();

			expect(datePickerMenu.props().modelValue).toBe(false);
		});
	});

	describe("validation", () => {
		it("should reset validation if required prop changes from true to false", async () => {
			const { wrapper, textField } = setup({ required: true });

			await textField.setValue("");
			await flushPromises();
			expect(textField.text()).toBe("components.datePicker.validation.required");

			await wrapper.setProps({ required: false });
			await flushPromises();
			expect(textField.text()).toBe("");
		});

		describe("when input is valid", () => {
			it("should emit update:date event", async () => {
				const { wrapper, textField } = setup();

				await textField.trigger("click");

				const datePicker = wrapper.getComponent(VMenu).getComponent(VDatePicker);
				const selectedDate = new Date(2024, 0, 1);
				vi.setSystemTime(selectedDate);

				await datePicker.setValue(selectedDate);
				await flushPromises();

				expect(wrapper.emitted("update:date")).toHaveLength(1);
				expect(wrapper.emitted("update:date")![0]).toEqual([selectedDate.toISOString()]);
			});

			it("should emit update:date with null if input is empty and not required", async () => {
				const { wrapper, textField } = setup({ required: false });

				await textField.setValue("");
				await flushPromises();

				const updateDateEvent = wrapper.emitted("update:date");
				expect(updateDateEvent).toEqual([[null]]);
				expect(wrapper.emitted("error")).toBeUndefined();
			});
		});

		describe("when input is invalid", () => {
			describe("if required and value is empty", () => {
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
					expect(updateDateEvent).toEqual([[null]]);
				});

				it("should display error message for required date", async () => {
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
					expect(errorEvent).toBeDefined();
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
			});
		});
	});

	describe("aria label date input", () => {
		it("should set aria-label to aria label prop if provided", () => {
			const ariaLabel = "Date Picker Aria ariaLabel";
			const { textField } = setup({ ariaLabel });
			const input = textField.find("input");

			expect(input.attributes("aria-label")).toBe(`${ariaLabel} (common.placeholder.dateformat)`);
		});

		it("should set aria-label to label prop if aria label prop not provided", () => {
			const label = "Date Picker Label";
			const { textField } = setup({ label });
			const input = textField.find("input");

			expect(input.attributes("aria-label")).toBe(`${label} (common.placeholder.dateformat)`);
		});

		it("should set aria-label to default if neither aria label nor label prop provided", () => {
			const { textField } = setup();
			const input = textField.find("input");

			expect(input.attributes("aria-label")).toBe(`common.labels.date (common.placeholder.dateformat)`);
		});
	});
});

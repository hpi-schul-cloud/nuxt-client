import DatePicker from "./DatePicker.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VDatePicker, VMenu, VTextField } from "vuetify/components";

describe("DatePicker", () => {
	const setup = (
		options?: Partial<{
			date: string;
			required: boolean;
			ariaLabel: string;
			label: string;
		}>
	) => {
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

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	it("should render component", () => {
		const { wrapper } = setup({ date: new Date().toISOString() });
		const datePicker = wrapper.findComponent(DatePicker);

		expect(datePicker.exists()).toBe(true);
	});

	it("should render text field", () => {
		const { textField } = setup();

		expect(textField.exists()).toBe(true);
	});

	it("should format raw numeric input into DD.MM.YYYY pattern", async () => {
		const { textField } = setup();
		const input = textField.find("input");

		await input.setValue("01012026");

		expect(input.element.value).toBe("01.01.2026");
	});

	describe("keyboard navigation", () => {
		it("should open date picker menu on space key", async () => {
			const { wrapper, textField } = setup();
			const datePickerMenu = wrapper.findComponent(VMenu);

			await textField.trigger("keydown.space");

			expect(datePickerMenu.props().modelValue).toBe(true);
		});

		it("should open date picker menu on enter key", async () => {
			const { wrapper, textField } = setup();
			const datePickerMenu = wrapper.findComponent(VMenu);

			await textField.trigger("keydown.enter");

			expect(datePickerMenu.props().modelValue).toBe(true);
		});

		it("should close date picker menu on tab key", async () => {
			const { wrapper, textField } = setup();
			const datePickerMenu = wrapper.findComponent(VMenu);

			await textField.trigger("click");
			await textField.trigger("keydown.tab");

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
				const selectedDate = "2022-03-06T00:00:00.000Z";
				await datePicker.setValue(selectedDate);
				await flushPromises();
				const updateDateEvent = wrapper.emitted("update:date");

				expect(updateDateEvent![1]).toEqual(["2022-03-06"]);
			});

			it("should emit update:date with undefined if input is empty and not required", async () => {
				const { wrapper, textField } = setup({ required: false });

				await textField.setValue("");
				await flushPromises();

				const updateDateEvent = wrapper.emitted("update:date");
				expect(updateDateEvent).toBeDefined();
				expect(updateDateEvent![0]).toEqual([undefined]);
			});
		});

		describe("when input is invalid", () => {
			describe("if required and value is empty", () => {
				it("should emit update:date with undefined on empty string", async () => {
					const { wrapper, textField } = setup({ required: true });
					await textField.setValue("");
					await flushPromises();

					const updateDateEvent = wrapper.emitted("update:date");
					expect(updateDateEvent).toBeDefined();
					expect(updateDateEvent![0]).toEqual([undefined]);
				});

				it("should display error message for required date", async () => {
					const { textField } = setup({ required: true });

					await textField.setValue("");
					await textField.vm.validate();
					expect(textField.vm.isValid).toBe(false);
				});
			});

			describe("when date is invalid", () => {
				it("should emit update:date with undefined for invalid date", async () => {
					const { wrapper, textField } = setup();

					await textField.setValue("55.55.5555");
					await flushPromises();

					const updateDateEvent = wrapper.emitted("update:date");
					expect(updateDateEvent).toBeDefined();
					expect(updateDateEvent![0]).toEqual([undefined]);
				});

				it("should display error message for invalid date format", async () => {
					const { textField } = setup();

					await textField.setValue("22");
					await textField.vm.validate();
					expect(textField.vm.isValid).toBe(false);
				});
			});
		});
	});

	describe("aria label date input", () => {
		it("should set aria-label to aria label prop if provided", () => {
			const ariaLabel = "Date Picker Aria ariaLabel";
			const { textField } = setup({ ariaLabel });
			const input = textField.find("input");

			expect(input.attributes("aria-label")).toContain(ariaLabel);
		});

		it("should set aria-label to label prop if aria label prop not provided", () => {
			const label = "Date Picker Label";
			const { textField } = setup({ label });
			const input = textField.find("input");

			expect(input.attributes("aria-label")).toContain(label);
		});

		it("should set aria-label to default if neither aria label nor label prop provided", () => {
			const { textField } = setup();
			const input = textField.find("input");

			expect(input.attributes("aria-label")).toContain("common.labels.date");
		});
	});
});

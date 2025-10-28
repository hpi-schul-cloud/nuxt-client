import DateBetween from "./DateBetween.vue";
import FilterActionButtons from "./FilterActionButtons.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { DatePicker } from "@ui-date-time-picker";
import { ComponentMountingOptions, shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";

const mockProps = {
	selectedDate: {
		$gte: "2023-12-20T23:00:00.000Z",
		$lte: "2199-12-31T23:00:00.000Z",
	},
};

const mountComponent = (options: ComponentMountingOptions<typeof DateBetween> = {}) =>
	shallowMount(DateBetween, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		...options,
	});

describe("@components/DataFilter/filterComponents/DateBetween.vue", () => {
	describe("should render the component", () => {
		it("should render the date picker components", () => {
			vi.useFakeTimers();
			const testDate = new Date(2024, 0, 1);
			vi.setSystemTime(testDate);

			const wrapper = mountComponent();

			const datePickers = wrapper.findAllComponents(DatePicker);
			const datePickerFromComponent = wrapper.get("[data-testid=date-picker-from]").getComponent(DatePicker);
			const datePickerUntilComponent = wrapper.get("[data-testid=date-picker-until]").getComponent(DatePicker);

			expect(datePickers).toHaveLength(2);
			expect(datePickerFromComponent.props("date")).toStrictEqual(testDate.toISOString());
			expect(datePickerFromComponent.props("label")).toStrictEqual("utils.adminFilter.date.label.from");

			expect(datePickerUntilComponent.props("date")).toStrictEqual("");
			expect(datePickerUntilComponent.props("label")).toStrictEqual("utils.adminFilter.date.label.until");
		});

		it("should render the date picker components with the selected date", async () => {
			const wrapper = mountComponent({
				props: mockProps,
			});
			await nextTick();

			const datePickers = wrapper.findAllComponents(DatePicker);
			const datePickerFromComponent = wrapper.get("[data-testid=date-picker-from]").getComponent(DatePicker);
			const datePickerUntilComponent = wrapper.get("[data-testid=date-picker-until]").getComponent(DatePicker);

			expect(datePickers).toHaveLength(2);
			expect(datePickerFromComponent.props("date")).toStrictEqual(mockProps.selectedDate.$gte);
			expect(datePickerFromComponent.props("label")).toStrictEqual("utils.adminFilter.date.label.from");

			expect(datePickerUntilComponent.props("date")).toStrictEqual(mockProps.selectedDate.$lte);
			expect(datePickerUntilComponent.props("label")).toStrictEqual("utils.adminFilter.date.label.until");
		});

		it("should render the filter action buttons component", () => {
			const wrapper = mountComponent();

			const filterActionButtonsComponent = wrapper.findComponent(FilterActionButtons);

			expect(filterActionButtonsComponent.exists()).toBe(true);
		});
	});

	describe("should emit the events", () => {
		describe("when add button is clicked", () => {
			it("should emit 'update:filter'", () => {
				const wrapper = mountComponent();

				const actionButtonComponent = wrapper.getComponent(FilterActionButtons);

				actionButtonComponent.vm.$emit("update:filter");
				expect(wrapper.emitted()).toHaveProperty("update:filter");
			});

			it("should emit 'remove:filter' if dateSelection value is null", () => {
				const wrapper = mountComponent();

				const datePickerFrom = wrapper.get("[data-testid=date-picker-from]").getComponent(DatePicker);
				datePickerFrom.vm.$emit("update:date", null);

				const actionButtonComponent = wrapper.getComponent(FilterActionButtons);
				actionButtonComponent.vm.$emit("update:filter");

				expect(wrapper.emitted()).not.toHaveProperty("update:filter");
				expect(wrapper.emitted()).toHaveProperty("remove:filter");
			});

			it("should emit 'update:filter' if at least one dateSelection value is set", () => {
				const wrapper = mountComponent();

				const datePickerFrom = wrapper.get("[data-testid=date-picker-from]").getComponent(DatePicker);
				datePickerFrom.vm.$emit("update:date", "2023-12-20T23:00:00.000Z");

				const actionButtonComponent = wrapper.getComponent(FilterActionButtons);
				actionButtonComponent.vm.$emit("update:filter");

				expect(wrapper.emitted()).toHaveProperty("update:filter");
			});
		});

		it("should emit 'remove:filter 'when remove button is clicked", () => {
			const wrapper = mountComponent();

			const actionButtonComponent = wrapper.getComponent(FilterActionButtons);

			actionButtonComponent.vm.$emit("remove:filter");
			expect(wrapper.emitted()).toHaveProperty("remove:filter");
		});

		it("should emit 'dialog-closed' when remove button is clicked", () => {
			const wrapper = mountComponent();

			const actionButtonComponent = wrapper.getComponent(FilterActionButtons);

			actionButtonComponent.vm.$emit("dialog-closed");
			expect(wrapper.emitted()).toHaveProperty("dialog-closed");
		});
	});
});

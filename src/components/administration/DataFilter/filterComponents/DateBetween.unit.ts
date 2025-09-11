import { ComponentMountingOptions, shallowMount } from "@vue/test-utils";
import DateBetween from "./DateBetween.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { nextTick } from "vue";

const mockProps = {
	selectedDate: {
		$gte: "2023-12-20T23:00:00.000Z",
		$lte: "2199-12-31T23:00:00.000Z",
	},
};

const mountComponent = (
	options: ComponentMountingOptions<typeof DateBetween> = {}
) => {
	return shallowMount(DateBetween, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		...options,
	});
};

describe("@components/DataFilter/filterComponents/DateBetween.vue", () => {
	describe("should render the component", () => {
		it("should render the date picker components", async () => {
			vi.useFakeTimers();
			const testDate = new Date(2024, 0, 1);
			vi.setSystemTime(testDate);

			const wrapper = mountComponent();

			const datePickerFromComponent = wrapper.findAllComponents({
				name: "date-picker",
			});

			expect(datePickerFromComponent).toHaveLength(2);
			expect(datePickerFromComponent[0].props("date")).toStrictEqual(
				testDate.toISOString()
			);
			expect(datePickerFromComponent[0].props("label")).toStrictEqual(
				"utils.adminFilter.date.label.from"
			);

			expect(datePickerFromComponent[1].props("date")).toStrictEqual("");
			expect(datePickerFromComponent[1].props("label")).toStrictEqual(
				"utils.adminFilter.date.label.until"
			);
		});

		it("should render the date picker components with the selected date", async () => {
			const wrapper = mountComponent({
				props: mockProps,
			});
			await nextTick();

			const datePickerFromComponent = wrapper.findAllComponents({
				name: "date-picker",
			});

			expect(datePickerFromComponent).toHaveLength(2);
			expect(datePickerFromComponent[0].props("date")).toStrictEqual(
				mockProps.selectedDate.$gte
			);
			expect(datePickerFromComponent[0].props("label")).toStrictEqual(
				"utils.adminFilter.date.label.from"
			);

			expect(datePickerFromComponent[1].props("date")).toStrictEqual(
				mockProps.selectedDate.$lte
			);
			expect(datePickerFromComponent[1].props("label")).toStrictEqual(
				"utils.adminFilter.date.label.until"
			);
		});

		it("should render the filter action buttons component", async () => {
			const wrapper = mountComponent();

			const filterActionButtonsComponent = wrapper.getComponent({
				name: "FilterActionButtons",
			});

			expect(filterActionButtonsComponent).toBeDefined();
		});
	});

	describe("should emit the events", () => {
		describe("when add button is clicked", () => {
			it("should emit 'update:filter'", async () => {
				const wrapper = mountComponent();

				const actionButtonComponent = wrapper.getComponent({
					name: "FilterActionButtons",
				});

				await actionButtonComponent.vm.$emit("update:filter");
				expect(wrapper.emitted()).toHaveProperty("update:filter");
			});

			it("should emit 'remove:filter' if dateSelection value is undefined", async () => {
				const wrapper = mountComponent();
				const datePickerComponent = wrapper.findAllComponents({
					name: "date-picker",
				});

				await datePickerComponent[0].vm.$emit("update:date", undefined);

				const actionButtonComponent = wrapper.getComponent({
					name: "FilterActionButtons",
				});

				await actionButtonComponent.vm.$emit("update:filter");

				expect(wrapper.emitted()).not.toHaveProperty("update:filter");
				expect(wrapper.emitted()).toHaveProperty("remove:filter");
			});
		});

		it("should emit 'remove:filter 'when remove button is clicked", async () => {
			const wrapper = mountComponent();

			const actionButtonComponent = wrapper.getComponent({
				name: "FilterActionButtons",
			});

			await actionButtonComponent.vm.$emit("remove:filter");
			expect(wrapper.emitted()).toHaveProperty("remove:filter");
		});

		it("should emit 'dialog-closed' when remove button is clicked", async () => {
			const wrapper = mountComponent();

			const actionButtonComponent = wrapper.getComponent({
				name: "FilterActionButtons",
			});

			await actionButtonComponent.vm.$emit("dialog-closed");
			expect(wrapper.emitted()).toHaveProperty("dialog-closed");
		});
	});
});

import { ComponentMountingOptions, mount } from "@vue/test-utils";
import ListSelection from "./ListSelection.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

const mockProps = {
	selectionList: [
		{ label: "1A", value: "1A" },
		{ label: "1C", value: "1C" },
		{ label: "1D", value: "1D" },
	],
	selectedList: ["1A", "1C"],
};

const mountComponent = (
	options: ComponentMountingOptions<typeof ListSelection> = {}
) => {
	return mount(ListSelection, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		...options,
	});
};

describe("@components/DataFilter/filterComponents/ListSelection.vue", () => {
	describe("should render the component", () => {
		it("should render the checkboxes", async () => {
			const wrapper = mountComponent({
				props: {
					selectionList: mockProps.selectionList,
					selectedList: mockProps.selectedList,
				},
			});

			const checkboxComponents = wrapper.findAllComponents(
				'[data-testid="list-selection"]'
			);

			expect(checkboxComponents[0].text()).toBe(
				mockProps.selectionList[0].label
			);
			expect(checkboxComponents[1].text()).toBe(
				mockProps.selectionList[1].label
			);
			expect(checkboxComponents[2].text()).toBe(
				mockProps.selectionList[2].label
			);

			expect(wrapper.vm.selectedList).toStrictEqual(mockProps.selectedList);
		});
	});

	describe("should emit the events", () => {
		describe("when add button is clicked", () => {
			it("should emit update:filter", async () => {
				const wrapper = mountComponent({
					props: {
						selectionList: mockProps.selectionList,
						selectedList: mockProps.selectedList,
					},
				});

				const checkboxComponent = wrapper.getComponent({ name: "v-checkbox" });
				const actionButtonComponent = wrapper.getComponent({
					name: "FilterActionButtons",
				});

				await checkboxComponent.vm.$emit(
					"update:modelValue",
					mockProps.selectedList
				);
				await actionButtonComponent.vm.$emit("update:filter");

				expect(wrapper.emitted()).toHaveProperty("update:filter");
				expect(wrapper.emitted()["update:filter"][0]).toStrictEqual([
					["1A", "1C"],
				]);
				expect(wrapper.emitted()).toHaveProperty("dialog-closed");
			});

			it("should emit remove:filter if selectedList prop is empty", async () => {
				const wrapper = mountComponent({
					props: {
						selectionList: mockProps.selectionList,
						selectedList: [],
					},
				});

				const checkboxComponent = wrapper.getComponent({ name: "v-checkbox" });
				const actionButtonComponent = wrapper.getComponent({
					name: "FilterActionButtons",
				});

				await checkboxComponent.vm.$emit("update:modelValue", []);
				await actionButtonComponent.vm.$emit("update:filter");

				expect(wrapper.emitted()).toHaveProperty("remove:filter");
				expect(wrapper.emitted()).toHaveProperty("dialog-closed");
			});
		});

		it("should emit dialog-closed when cancel button is clicked", async () => {
			const wrapper = mountComponent({
				props: {
					selectionList: mockProps.selectionList,
					selectedList: [],
				},
			});

			const actionButtonComponent = wrapper.getComponent({
				name: "FilterActionButtons",
			});

			await actionButtonComponent.vm.$emit("dialog-closed");

			expect(wrapper.emitted()).toHaveProperty("dialog-closed");
		});

		it("should emit remove:filter when remove button is clicked", async () => {
			const wrapper = mountComponent({
				props: {
					selectionList: mockProps.selectionList,
					selectedList: [],
				},
			});

			const actionButtonComponent = wrapper.getComponent({
				name: "FilterActionButtons",
			});

			await actionButtonComponent.vm.$emit("remove:filter");

			expect(wrapper.emitted()).toHaveProperty("remove:filter");
		});
	});
});

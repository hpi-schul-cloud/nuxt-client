import { ComponentMountingOptions, mount } from "@vue/test-utils";
import FilterActionButtons from "./FilterActionButtons.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("@components/DataFilter/filterComponents/FilterActionButtons.vue", () => {
	const mountComponent = (
		options: ComponentMountingOptions<typeof FilterActionButtons> = {}
	) => {
		return mount(FilterActionButtons, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});
	};
	it('should emit "remove:filter" event when onRemoveFilter is called', async () => {
		const wrapper = mountComponent();
		const removeButton = wrapper.getComponent(
			'[data-testid="remove-filter-button"]'
		);

		await removeButton.trigger("click");
		expect(wrapper.emitted()).toHaveProperty("remove:filter");
	});

	it('should emit "dialog-closed" event when onCancel is called', async () => {
		const wrapper = mountComponent();
		const cancelButton = wrapper.getComponent(
			'[data-testid="cancel-filter-button"]'
		);

		await cancelButton.trigger("click");
		expect(wrapper.emitted()).toHaveProperty("dialog-closed");
	});

	it('should emit "update:filter" event when onAddFilter is called', async () => {
		const wrapper = mountComponent();
		const addButton = wrapper.getComponent('[data-testid="add-filter-button"]');

		await addButton.trigger("click");
		expect(wrapper.emitted()).toHaveProperty("update:filter");
	});
});

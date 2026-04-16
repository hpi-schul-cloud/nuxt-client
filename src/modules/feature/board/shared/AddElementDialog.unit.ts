import { elementTypeSelectionOptionsFactory } from "../test-utils/ElementTypeSelectionOptions.factory";
import { setupSharedElementTypeSelectionMock } from "../test-utils/sharedElementTypeSelectionMock";
import AddElementDialog from "./AddElementDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";

vi.mock("./SharedElementTypeSelection.composable");

describe("ElementTypeSelection", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setupMocks = () => {
		const { isDialogOpen, isDialogLoading, staticElementTypeOptions, dynamicElementTypeOptions } =
			setupSharedElementTypeSelectionMock();

		staticElementTypeOptions.value = elementTypeSelectionOptionsFactory.createUnsortedElementList();

		return {
			isDialogOpen,
			isDialogLoading,
			staticElementTypeOptions,
			dynamicElementTypeOptions,
		};
	};

	const setup = async () => {
		const { isDialogOpen, staticElementTypeOptions, dynamicElementTypeOptions } = setupMocks();

		const wrapper = mount(AddElementDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		isDialogOpen.value = true;
		await nextTick();

		return { staticElementTypeOptions, dynamicElementTypeOptions, wrapper };
	};

	describe("when isDialogOpen is changed from false to true", () => {
		it("should make modal visible", async () => {
			const { wrapper } = await setup();

			expect(wrapper.isVisible()).toBe(true);
		});

		it("should render buttons correctly and correct action will be called on click", async () => {
			const { staticElementTypeOptions, wrapper } = await setup();

			for (const elementTypeOption of staticElementTypeOptions.value) {
				const button = wrapper.findComponent(`[data-testid=${elementTypeOption.testId}]`);
				await button.trigger("click");
				await nextTick();

				expect(elementTypeOption.action).toHaveBeenCalled();
			}
		});
	});

	describe("when the dynamic options had changed while the dialog is opened", () => {
		it("should show the updated element type options", async () => {
			const { wrapper, dynamicElementTypeOptions } = await setup();

			const element = elementTypeSelectionOptionsFactory.create();
			dynamicElementTypeOptions.value = [element];
			await flushPromises();

			const option = wrapper.findComponent(`[data-testid="${element.testId}"]`);

			expect(option.isVisible()).toBe(true);
		});
	});
});

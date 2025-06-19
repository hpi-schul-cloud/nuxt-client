import { ConfigResponse } from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { envsFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ExtendedIconBtn } from "@ui-extended-icon-btn";
import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { ComponentPublicInstance, nextTick } from "vue";
import { setupSharedElementTypeSelectionMock } from "../test-utils/sharedElementTypeSelectionMock";
import AddElementDialog from "./AddElementDialog.vue";

vi.mock("./SharedElementTypeSelection.composable");

describe("ElementTypeSelection", () => {
	const envConfigModule: vi.Mocked<EnvConfigModule> = createModuleMocks(
		EnvConfigModule,
		{
			getEnv: envsFactory.build({
				FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
				FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
			}) as unknown as ConfigResponse,
		}
	);

	const setupMocks = () => {
		const {
			closeDialog,
			isDialogOpen,
			isDialogLoading,
			staticElementTypeOptions,
			dynamicElementTypeOptions,
		} = setupSharedElementTypeSelectionMock();

		const createTextElement = vi.fn();
		const createFileElement = vi.fn();

		staticElementTypeOptions.value = [
			{
				icon: "action1-icon",
				label: "action1-label",
				action: createTextElement,
				testId: "action1-id",
			},
			{
				icon: "action2-icon",
				label: "action2-label",
				action: createFileElement,
				testId: "action2-id",
			},
		];

		return {
			isDialogOpen,
			isDialogLoading,
			staticElementTypeOptions,
			dynamicElementTypeOptions,
			closeDialog,
		};
	};

	describe("when isDialogOpen is false", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			setupMocks();

			const wrapper = mount(AddElementDialog, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					provide: {
						[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					},
				},
			});

			return { wrapper };
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(AddElementDialog).exists()).toBe(true);
		});
	});

	describe("when isDialogOpen is changed from false to true", () => {
		const setup = async () => {
			document.body.setAttribute("data-app", "true");

			const { isDialogOpen, staticElementTypeOptions, closeDialog } =
				setupMocks();

			const wrapper = mount(AddElementDialog, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],

					provide: {
						[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					},
				},
			});

			isDialogOpen.value = true;
			await nextTick();

			return { isDialogOpen, staticElementTypeOptions, closeDialog, wrapper };
		};

		it("should make modal visible", async () => {
			const { wrapper } = await setup();

			expect(wrapper.isVisible()).toBe(true);
		});

		it("should render buttons correctly and correct action will be called on click", async () => {
			const { staticElementTypeOptions, wrapper } = await setup();

			for (const elementTypeOption of staticElementTypeOptions.value) {
				const button = wrapper.findComponent(
					`[data-testid=${elementTypeOption.testId}]`
				);
				await button.trigger("click");
				await nextTick();

				expect(elementTypeOption.action).toHaveBeenCalled();
			}
		});

		it("should close modal on close button click", async () => {
			const { closeDialog, wrapper } = await setup();

			const closeButton = wrapper.findComponent("[data-testId=dialog-close]");
			await closeButton.trigger("click");

			await nextTick();

			expect(closeDialog).toHaveBeenCalled();
		});
	});

	describe("when the dynamic options had changed while the dialog is opened", () => {
		const setup = async () => {
			document.body.setAttribute("data-app", "true");

			const { isDialogOpen, dynamicElementTypeOptions } = setupMocks();

			type AddElementDialogWrapper<T> = VueWrapper<ComponentPublicInstance & T>;
			const wrapper: AddElementDialogWrapper<Partial<{ dialogWidth: number }>> =
				mount(AddElementDialog, {
					attrs: {
						width: 320,
					},
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],

						provide: {
							[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
						},
					},
				});

			isDialogOpen.value = true;
			await nextTick();

			return { wrapper, dynamicElementTypeOptions };
		};

		it("should show the updated element type options", async () => {
			const { wrapper, dynamicElementTypeOptions } = await setup();

			const testId = "dynamic-action1-id";
			dynamicElementTypeOptions.value = [
				{
					icon: "dynamic-action1-icon",
					label: "dynamic-action1-label",
					action: vi.fn(),
					testId,
				},
			];
			await flushPromises();

			const option = wrapper.findComponent<typeof ExtendedIconBtn>(
				`[data-testid="${testId}"]`
			);

			expect(option.isVisible()).toBe(true);
		});

		it("should adjust the width of the dialog", async () => {
			const { wrapper, dynamicElementTypeOptions } = await setup();

			dynamicElementTypeOptions.value = [
				{
					icon: "dynamic-action1-icon",
					label: "dynamic-action1-label",
					action: vi.fn(),
					testId: "dynamic-action1-id",
				},
			];
			await flushPromises();

			expect(wrapper.vm.dialogWidth).toBe(426);
		});
	});
});

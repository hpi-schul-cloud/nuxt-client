import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue, { ref, nextTick } from "vue";
import { useElementTypeSelection } from "./ElementTypeSelection.composable";
import ElementTypeSelection from "./ElementTypeSelection.vue";
jest.mock("./ElementTypeSelection.composable");

describe("ElementTypeSelection", () => {
	const setupElementTypeSelectionComposableMock = () => {
		const mockedUseElementTypeSelection = jest.mocked(useElementTypeSelection);

		const askType = jest.fn();
		const isDialogOpen = ref(false);

		const createTextElement = jest.fn();
		const createFileElement = jest.fn();

		const elementTypeOptions: {
			icon: string;
			label: string;
			action: () => void;
			testId: string;
		}[] = [
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

		const closeDialog = jest.fn();

		mockedUseElementTypeSelection.mockReturnValue({
			askType,
			isDialogOpen,
			elementTypeOptions,
			closeDialog,
			createTextElement,
			createFileElement,
		});

		return { askType, isDialogOpen, elementTypeOptions, closeDialog };
	};

	describe("when isDialogOpen is false", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			setupElementTypeSelectionComposableMock();

			const wrapper: Wrapper<Vue> = mount(
				ElementTypeSelection as MountOptions<Vue>,
				{
					...createComponentMocks({}),
				}
			);

			return { wrapper };
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(ElementTypeSelection).exists()).toBe(true);
		});
	});

	describe("when isDialogOpen is changed from false to true", () => {
		const setup = async () => {
			document.body.setAttribute("data-app", "true");

			const { isDialogOpen, elementTypeOptions, closeDialog } =
				setupElementTypeSelectionComposableMock();

			const wrapper: Wrapper<Vue> = mount(
				ElementTypeSelection as MountOptions<Vue>,
				{
					...createComponentMocks({}),
				}
			);

			isDialogOpen.value = true;
			await nextTick();

			return { isDialogOpen, elementTypeOptions, closeDialog, wrapper };
		};

		it("should make modal visible", async () => {
			const { wrapper } = await setup();

			expect(wrapper.isVisible()).toBe(true);
		});

		it("should render buttons correctly and correct action will be called on click", async () => {
			const { elementTypeOptions, wrapper } = await setup();

			for (const elementTypeOption of elementTypeOptions) {
				const button = wrapper.find(
					`[data-testId=${elementTypeOption.testId}]`
				);

				const icon = button.find(".v-icon");
				icon.contains(elementTypeOption.icon);
				const label = button.find(".subtitle");
				label.contains(elementTypeOption.label);

				await button.trigger("click");

				await nextTick();

				expect(elementTypeOption.action).toHaveBeenCalled();
			}
		});

		it("should close modal on close button click", async () => {
			const { closeDialog, wrapper } = await setup();

			const closeButton = wrapper.find("[data-testId=dialog-close]");
			await closeButton.trigger("click");

			await nextTick();

			expect(closeDialog).toHaveBeenCalled();
		});
	});
});

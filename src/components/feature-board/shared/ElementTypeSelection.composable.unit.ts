import { ref } from "vue";
import { useFilePicker } from "./FilePicker.composable";
import { useInternalElementTypeSelection } from "./ElementTypeSelection.composable";
import { ContentElementType } from "@/serverApi/v3";
jest.mock("./FilePicker.composable");

describe("ElementTypeSelection Composable", () => {
	const setupFilePickerComposableMock = () => {
		const mockedUseFilePicker = jest.mocked(useFilePicker);
		const isFilePickerOpen = ref(false);
		const triggerFilePicker = jest.fn();

		mockedUseFilePicker.mockReturnValue({
			triggerFilePicker,
			isFilePickerOpen,
		});

		return { triggerFilePicker };
	};

	describe("askType", () => {
		const setup = () => {
			const resolveMock = jest.fn();
			setupFilePickerComposableMock();

			return { resolveMock };
		};

		it("should set isDialogOpen to true", () => {
			const { resolveMock } = setup();
			const { askType, isDialogOpen } = useInternalElementTypeSelection();

			askType(resolveMock);

			expect(isDialogOpen.value).toBe(true);
		});

		it("should set resolve function", () => {
			const { resolveMock } = setup();
			const { askType, elementTypeOptions } = useInternalElementTypeSelection();

			askType(resolveMock);
			// TODO: Return the function instead of setting variable? Calling action here is not nice.
			elementTypeOptions[0].action();

			expect(resolveMock).toHaveBeenCalledTimes(1);
		});
	});

	describe("closeDialog", () => {
		const setup = () => {
			const resolveMock = jest.fn();
			setupFilePickerComposableMock();

			return { resolveMock };
		};

		it("should call resolve function with undefined", () => {
			const { resolveMock } = setup();
			const { askType, closeDialog } = useInternalElementTypeSelection();

			askType(resolveMock);
			closeDialog();

			expect(resolveMock).toHaveBeenCalledTimes(1);
			expect(resolveMock).toBeCalledWith(undefined);
		});

		it("should set isDialogOpen to false", () => {
			const { resolveMock } = setup();
			const { askType, closeDialog, isDialogOpen } =
				useInternalElementTypeSelection();

			askType(resolveMock);
			closeDialog();

			expect(isDialogOpen.value).toBe(false);
		});
	});

	describe("elementTypeOptions", () => {
		describe("create text element option", () => {
			const setup = () => {
				const resolveMock = jest.fn();
				setupFilePickerComposableMock();

				return { resolveMock };
			};

			it("should call resolve with createTextElement", () => {
				const { resolveMock } = setup();
				const { askType, elementTypeOptions, createTextElement } =
					useInternalElementTypeSelection();

				askType(resolveMock);
				elementTypeOptions[0].action();

				expect(resolveMock).toHaveBeenCalledTimes(1);
				// TODO: Can createTextElement stay private?
				expect(resolveMock).toBeCalledWith(createTextElement);
			});

			it("should set isDialogOpen to false", () => {
				setup();
				const { elementTypeOptions, isDialogOpen } =
					useInternalElementTypeSelection();

				elementTypeOptions[0].action();

				expect(isDialogOpen.value).toBe(false);
			});
		});

		describe("create file element option", () => {
			const setup = () => {
				const resolveMock = jest.fn();

				return { resolveMock };
			};

			it("should call resolve with openFilePicker", () => {
				const { resolveMock } = setup();
				const { askType, elementTypeOptions, createFileElement } =
					useInternalElementTypeSelection();

				askType(resolveMock);
				elementTypeOptions[1].action();

				expect(resolveMock).toHaveBeenCalledTimes(1);
				// TODO: expect(resolveMock).toBeCalledWith(openFilePicker);
			});

			it("should set isDialogOpen to false", () => {
				setup();
				const { elementTypeOptions, isDialogOpen } =
					useInternalElementTypeSelection();

				elementTypeOptions[1].action();

				expect(isDialogOpen.value).toBe(false);
			});
		});
	});

	describe("createTextElement", () => {
		const setup = () => {
			const addElementMock = jest.fn();
			setupFilePickerComposableMock();

			return { addElementMock };
		};

		it("should call addElement function with ContentElementType.Text", () => {
			const { addElementMock } = setup();
			const { createTextElement } = useInternalElementTypeSelection();

			createTextElement(addElementMock);

			expect(addElementMock).toHaveBeenCalledTimes(1);
			expect(addElementMock).toBeCalledWith(ContentElementType.Text);
		});
	});

	// TODO: Test createFileElement
});

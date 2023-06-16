import { ContentElementType } from "@/serverApi/v3";
import { setupFileStorageApiMock } from "@@/tests/test-utils/composable-mocks/fileStorageApiMock";
import { setupSelectedFileMock } from "@@/tests/test-utils/composable-mocks/selectedFileMock";
import { setupSharedElementTypeSelectionMock } from "@@/tests/test-utils/composable-mocks/sharedElementTypeSelectionMock";
import { mdiFormatText, mdiTrayArrowUp } from "@mdi/js";
import { useElementTypeSelection } from "./ElementTypeSelection.composable";
jest.mock("./SharedElementTypeSelection.composable");
jest.mock("./FileStorageApi.composable");
jest.mock("./SelectedFile.composable");

describe("ElementTypeSelection Composable", () => {
	describe("onElementClick", () => {
		describe("when element is created successfully", () => {
			const setup = () => {
				setupFileStorageApiMock();
				setupSharedElementTypeSelectionMock();
				setupSelectedFileMock();
				const addElementMock = jest.fn();
				const elementType = ContentElementType.RichText;

				return { addElementMock, elementType };
			};

			it("should call add Element", async () => {
				const { addElementMock, elementType } = setup();

				const { isDialogOpen, onElementClick } =
					useElementTypeSelection(addElementMock);

				await onElementClick(elementType);

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toBeCalledWith(elementType);
				expect(isDialogOpen.value).toBe(false);
			});

			it("should close dialog", async () => {
				const { addElementMock, elementType } = setup();

				const { isDialogOpen, onElementClick } =
					useElementTypeSelection(addElementMock);

				await onElementClick(elementType);

				expect(isDialogOpen.value).toBe(false);
			});
		});

		describe("when addElement returns error", () => {
			const setup = () => {
				const error = new Error("Test error");
				const addElementMock = jest.fn().mockRejectedValueOnce(error);
				const elementType = ContentElementType.RichText;

				return { addElementMock, error, elementType };
			};

			it("should return error", async () => {
				const { addElementMock, elementType, error } = setup();

				const { onElementClick } = useElementTypeSelection(addElementMock);

				await expect(onElementClick(elementType)).rejects.toThrowError(error);
			});
		});
	});

	describe("onFileSelect", () => {
		describe("when element is created successfullly", () => {
			const setup = () => {
				const element = { id: "test" };
				const addElementMock = jest.fn().mockResolvedValueOnce(element);
				const file = new File([], "test");
				setupSharedElementTypeSelectionMock();
				const { setSelectedFile } = setupSelectedFileMock({});

				return { addElementMock, file, setSelectedFile };
			};

			it("should call setSelectedFile", async () => {
				const { addElementMock, file, setSelectedFile } = setup();
				const { onFileSelect } = useElementTypeSelection(addElementMock);

				await onFileSelect(file);

				expect(setSelectedFile).toHaveBeenCalledTimes(1);
				expect(setSelectedFile).toBeCalledWith(file);
			});

			it("should call addElementMock", async () => {
				const { addElementMock, file } = setup();
				const { onFileSelect } = useElementTypeSelection(addElementMock);

				await onFileSelect(file);

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toBeCalledWith(ContentElementType.File);
			});
		});

		describe("when addElement throws error", () => {
			const setup = () => {
				const error = new Error("Test error");
				const addElementMock = jest.fn().mockRejectedValueOnce(error);
				const file = new File([], "test");
				const { upload } = setupFileStorageApiMock();
				setupSelectedFileMock();

				return { addElementMock, file, upload, error };
			};

			it("should pass error", async () => {
				const { addElementMock, file, error, upload } = setup();
				const { onFileSelect } = useElementTypeSelection(addElementMock);

				await expect(onFileSelect(file)).rejects.toThrowError(error);

				expect(upload).toHaveBeenCalledTimes(0);
			});
		});
	});

	describe("askType", () => {
		const setup = () => {
			const addElementMock = jest.fn();
			const { elementTypeOptions, isDialogOpen } =
				setupSharedElementTypeSelectionMock();
			setupFileStorageApiMock();
			setupSelectedFileMock();

			return { elementTypeOptions, addElementMock, isDialogOpen };
		};

		it("should set elementTypeOptions to options", () => {
			const { elementTypeOptions, addElementMock } = setup();
			const { askType, onFileElementClick, onElementClick } =
				useElementTypeSelection(addElementMock);

			askType();

			const expectedOptions = [
				{
					icon: mdiFormatText,
					label:
						"components.elementTypeSelection.elements.textElement.subtitle",
					action: () => onElementClick(ContentElementType.RichText),
					testId: "create-element-text",
				},
				{
					icon: mdiTrayArrowUp,
					label:
						"components.elementTypeSelection.elements.fileElement.subtitle",
					action: onFileElementClick,
					testId: "create-element-file",
				},
			];
			expect(JSON.stringify(elementTypeOptions.value)).toEqual(
				JSON.stringify(expectedOptions)
			);
		});

		it("should set isDialogOpen to true", () => {
			const { addElementMock, isDialogOpen } = setup();
			const { askType } = useElementTypeSelection(addElementMock);

			askType();
			expect(isDialogOpen.value).toBe(true);
		});
	});

	describe("onFileElementClick", () => {
		const setup = () => {
			const addElementMock = jest.fn();
			setupFileStorageApiMock();
			setupSharedElementTypeSelectionMock();

			return { addElementMock };
		};

		it("should set isFilePickerOpen to true", () => {
			const { addElementMock } = setup();
			const { isFilePickerOpen, onFileElementClick } =
				useElementTypeSelection(addElementMock);

			onFileElementClick();

			expect(isFilePickerOpen.value).toBe(true);
		});

		it("should set isDialogOpen to false", () => {
			const { addElementMock } = setup();
			const { onFileElementClick, isDialogOpen } =
				useElementTypeSelection(addElementMock);

			onFileElementClick();

			expect(isDialogOpen.value).toBe(false);
		});
	});

	describe("elementTypeOptions actions", () => {
		const setup = () => {
			const addElementMock = jest.fn();
			const closeDialogMock = jest.fn();
			const { elementTypeOptions } = setupSharedElementTypeSelectionMock({
				closeDialogMock,
			});
			setupFileStorageApiMock();
			setupSelectedFileMock();

			return { elementTypeOptions, addElementMock, closeDialogMock };
		};

		describe("when the first action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock } = setup();
				const { askType } = useElementTypeSelection(addElementMock);

				askType();

				const action = elementTypeOptions.value[0].action;
				await action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith(ContentElementType.RichText);
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock } = setup();
				const { askType } = useElementTypeSelection(addElementMock);

				askType();

				const action = elementTypeOptions.value[0].action;
				await action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});

		describe("when the second action is called", () => {
			it("should set isFilePickerOpen to true", async () => {
				const { elementTypeOptions, addElementMock } = setup();
				const { askType, isFilePickerOpen } =
					useElementTypeSelection(addElementMock);

				askType();

				const action = elementTypeOptions.value[1].action;
				await action();

				expect(isFilePickerOpen.value).toBe(true);
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock } = setup();
				const { askType } = useElementTypeSelection(addElementMock);

				askType();

				const action = elementTypeOptions.value[1].action;
				await action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});
	});
});

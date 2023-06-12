import { ContentElementType } from "@/serverApi/v3";
import { useElementTypeSelection } from "./ElementTypeSelection.composable";
import { mdiFormatSize, mdiUpload } from "@mdi/js";
import { setupFileStorageApiMock } from "@@/tests/test-utils/composable-mocks/fileStorageApiMock";
import { setupSharedElementTypeSelectionMock } from "@@/tests/test-utils/composable-mocks/sharedElementTypeSelectionMock";
import { setupSelectedFileMock } from "@@/tests/test-utils/composable-mocks/selectedFileMock";
import { set } from "vue/types/umd";
jest.mock("./SharedElementTypeSelection.composable");
jest.mock("./FileStorageApi.composable");
jest.mock("./SelectedFile.composable");

describe("ElementTypeSelection Composable", () => {
	describe("onElementClick", () => {
		describe("when element is created successfully", () => {
			const setup = () => {
				setupFileStorageApiMock({});
				setupSharedElementTypeSelectionMock({});
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
				setupSharedElementTypeSelectionMock({});
				const { setSelectedFile } = setupSelectedFileMock();

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
				const { upload } = setupFileStorageApiMock({});
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
				setupSharedElementTypeSelectionMock({});
			setupFileStorageApiMock({});
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
					icon: mdiFormatSize,
					label:
						"components.elementTypeSelection.elements.textElement.subtitle",
					action: () => onElementClick(ContentElementType.RichText),
					testId: "create-element-text",
				},
				{
					icon: mdiUpload,
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
});

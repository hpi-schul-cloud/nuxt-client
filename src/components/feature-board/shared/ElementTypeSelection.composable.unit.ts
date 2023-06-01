import { FileRecordParentType } from "@/fileStorageApi/v3";
import { ContentElementType } from "@/serverApi/v3";
import { mdiFormatSize, mdiUpload } from "@mdi/js";
import { ref } from "vue";
import { useElementTypeSelection } from "./ElementTypeSelection.composable";
import { ref } from "vue";
import { FileRecordParamsParentType } from "@/fileStorageApi/v3";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { mdiFormatSize, mdiUpload } from "@mdi/js";
import { setupFileStorageApiMock } from "@@/tests/test-utils/composableMocks/fileStorageApiMock";
jest.mock("./SharedElementTypeSelection.composable");

describe("ElementTypeSelection Composable", () => {
	const setupSharedElementTypeSelection = () => {
		const mockedSharedElementTypeSelection = jest.mocked(
			useSharedElementTypeSelection
		);

		const isDialogOpen = ref(false);
		const closeDialog = jest.fn();
		const elementTypeOptions = ref([]);

		mockedSharedElementTypeSelection.mockReturnValue({
			isDialogOpen,
			closeDialog,
			elementTypeOptions,
		});

		return { isDialogOpen, closeDialog, elementTypeOptions };
	};

	describe("createTextElement", () => {
		describe("when text element is created successfully", () => {
			const setup = () => {
				setupFileStorageApiMock({});
				setupSharedElementTypeSelection();
				const addElementMock = jest.fn();

				return { addElementMock };
			};

			it("should call resolve with createTextElement", async () => {
				const { addElementMock } = setup();
				const { isDialogOpen, createTextElement } =
					useElementTypeSelection(addElementMock);

				await createTextElement();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toBeCalledWith(ContentElementType.RichText);
				expect(isDialogOpen.value).toBe(false);
			});
		});

		describe("when addElement returns error", () => {
			const setup = () => {
				const error = new Error("Test error");
				const addElementMock = jest.fn().mockRejectedValueOnce(error);

				return { addElementMock, error };
			};

			it("should call resolve with createTextElement", async () => {
				const { addElementMock, error } = setup();
				const { createTextElement } = useElementTypeSelection(addElementMock);

				await expect(createTextElement()).rejects.toThrowError(error);
			});
		});
	});

	describe("createFileElement", () => {
		describe("when element is created and file is uploaded successfullly", () => {
			const setup = () => {
				const element = { id: "test" };
				const addElementMock = jest.fn().mockResolvedValueOnce(element);
				const file = new File([], "test");
				const { upload } = setupFileStorageApiMock({});
				setupSharedElementTypeSelection();

				return { addElementMock, file, upload, element };
			};

			it("should call addElementMock", async () => {
				const { addElementMock, file } = setup();
				const { createFileElement } = useElementTypeSelection(addElementMock);

				await createFileElement(file);

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toBeCalledWith(ContentElementType.File);
			});

			it("should call upload", async () => {
				const { addElementMock, upload, file, element } = setup();
				const { createFileElement } = useElementTypeSelection(addElementMock);

				await createFileElement(file);

				expect(upload).toHaveBeenCalledTimes(1);
				expect(upload).toBeCalledWith(
					element.id,
					FileRecordParentType.BOARDNODES,
					file
				);
			});

			it("should set isFilePickerOpen to false", async () => {
				const { addElementMock, file } = setup();
				const { createFileElement, isFilePickerOpen, openFilePicker } =
					useElementTypeSelection(addElementMock);

				openFilePicker();
				await createFileElement(file);

				expect(isFilePickerOpen.value).toBe(false);
			});
		});

		describe("when addElement throws error", () => {
			const setup = () => {
				const error = new Error("Test error");
				const addElementMock = jest.fn().mockRejectedValueOnce(error);
				const file = new File([], "test");
				const { upload } = setupFileStorageApiMock({});

				return { addElementMock, file, upload, error };
			};

			it("should pass error", async () => {
				const { addElementMock, file, error, upload } = setup();
				const { createFileElement } = useElementTypeSelection(addElementMock);

				await expect(createFileElement(file)).rejects.toThrowError(error);

				expect(upload).toHaveBeenCalledTimes(0);
			});

			it("should set isFilePickerOpen to false", async () => {
				const { addElementMock, file, error } = setup();
				const { createFileElement, isFilePickerOpen, openFilePicker } =
					useElementTypeSelection(addElementMock);

				openFilePicker();
				await expect(createFileElement(file)).rejects.toThrowError(error);

				expect(isFilePickerOpen.value).toBe(false);
			});
		});

		describe("when upload throws error", () => {
			const setup = () => {
				const error = new Error("Test error");
				const element = { id: "test" };
				const addElementMock = jest.fn().mockResolvedValueOnce(element);
				const file = new File([], "test");
				const uploadMock = jest.fn().mockRejectedValueOnce(error);
				const { upload } = setupFileStorageApiMock({ uploadMock });

				return { addElementMock, file, upload, error };
			};

			it("should pass error", async () => {
				const { addElementMock, file, error } = setup();
				const { createFileElement } = useElementTypeSelection(addElementMock);

				await expect(createFileElement(file)).rejects.toThrowError(error);
			});

			it("should set isFilePickerOpen to false", async () => {
				const { addElementMock, file, error } = setup();
				const { createFileElement, isFilePickerOpen, openFilePicker } =
					useElementTypeSelection(addElementMock);

				openFilePicker();
				await expect(createFileElement(file)).rejects.toThrowError(error);

				expect(isFilePickerOpen.value).toBe(false);
			});
		});
	});

	describe("openFilePicker", () => {
		const setup = () => {
			const addElementMock = jest.fn();
			setupFileStorageApiMock({});
			setupSharedElementTypeSelection();

			return { addElementMock };
		};

		it("should set isFilePickerOpen to true", () => {
			const { addElementMock } = setup();
			const { isFilePickerOpen, openFilePicker } =
				useElementTypeSelection(addElementMock);

			openFilePicker();

			expect(isFilePickerOpen.value).toBe(true);
		});

		it("should set isDialogOpen to false", () => {
			const { addElementMock } = setup();
			const { openFilePicker, isDialogOpen } =
				useElementTypeSelection(addElementMock);

			openFilePicker();

			expect(isDialogOpen.value).toBe(false);
		});
	});

	describe("askType", () => {
		const setup = () => {
			const addElementMock = jest.fn();
			const { elementTypeOptions, isDialogOpen } =
				setupSharedElementTypeSelection();
			setupFileStorageApiMock({});

			return { elementTypeOptions, addElementMock, isDialogOpen };
		};

		it("should set elementTypeOptions to options", () => {
			const { elementTypeOptions, addElementMock } = setup();
			const { askType, createTextElement, openFilePicker } =
				useElementTypeSelection(addElementMock);

			askType();

			const expectedOptions = [
				{
					icon: mdiFormatSize,
					label:
						"components.elementTypeSelection.elements.textElement.subtitle",
					action: () => createTextElement(),
					testId: "create-element-text",
				},
				{
					icon: mdiUpload,
					label:
						"components.elementTypeSelection.elements.fileElement.subtitle",
					action: () => openFilePicker(),
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

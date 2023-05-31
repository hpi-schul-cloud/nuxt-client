import { FileRecordParamsParentType } from "@/fileStorageApi/v3";
import { ContentElementType } from "@/serverApi/v3";
import { mdiFormatSize, mdiUpload } from "@mdi/js";
import { ref } from "vue";
import { AddCardElement } from "../state/CardState.composable";
import { useFileStorageApi } from "./FileStorageApi.composable";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";

export const useElementTypeSelection = (addElementFunction: AddCardElement) => {
	const { upload } = useFileStorageApi();
	const { isDialogOpen, closeDialog, elementTypeOptions } =
		useSharedElementTypeSelection();
	const isFilePickerOpen = ref<boolean>(false);

	const createTextElement = async () => {
		await addElementFunction(ContentElementType.RichText);

		closeDialog();
	};

	const createFileElement = async (file: File) => {
		try {
			const element = await addElementFunction(ContentElementType.File);
			if (element?.id) {
				await upload(element.id, FileRecordParamsParentType.BOARDNODES, file);
			}
		} catch (error) {
			isFilePickerOpen.value = false;
			throw error;
		}

		isFilePickerOpen.value = false;
	};

	const openFilePicker = () => {
		isFilePickerOpen.value = true;
		closeDialog();
	};

	const options = [
		{
			icon: mdiFormatSize,
			label: "components.elementTypeSelection.elements.textElement.subtitle",
			action: () => createTextElement(),
			testId: "create-element-text",
		},
		{
			icon: mdiUpload,
			label: "components.elementTypeSelection.elements.fileElement.subtitle",
			action: () => openFilePicker(),
			testId: "create-element-file",
		},
	];

	const askType = () => {
		elementTypeOptions.value = options;
		isDialogOpen.value = true;
	};

	return {
		askType,
		isDialogOpen,
		elementTypeOptions,
		createFileElement,
		createTextElement,
		openFilePicker,
		isFilePickerOpen,
	};
};

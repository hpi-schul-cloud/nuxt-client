import { FileRecordParamsParentType } from "@/fileStorageApi/v3";
import { ContentElementType } from "@/serverApi/v3";
import { mdiFormatSize, mdiUpload } from "@mdi/js";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { AddCardElement } from "../state/CardState.composable";
import { useFileStorageApi } from "./FileStorageApi.composable";

export const useElementTypeSelection = createSharedComposable(() => {
	const { upload } = useFileStorageApi();
	const isDialogOpen = ref<boolean>(false);
	const isFilePickerOpen = ref<boolean>(false);

	let addElementFunction: AddCardElement | undefined;

	const createTextElement = async () => {
		if (addElementFunction) {
			await addElementFunction(ContentElementType.RichText);
		}
		closeDialog();
	};

	const openFilePicker = () => {
		isFilePickerOpen.value = true;
		closeDialog();
	};

	const createFileElement = async (file: File) => {
		if (addElementFunction && file) {
			const element = await addElementFunction(ContentElementType.File);
			// TODO: upload multiple files at once? File array?
			if (element?.id) {
				const fileRecordResponse = await upload(
					element.id,
					FileRecordParamsParentType.BOARDNODES,
					file
				);
				// element.fileRecord = fileRecordResponse;
				// element.showProgress = true; // until upload is finished
			}
		}

		isFilePickerOpen.value = false;
	};

	const elementTypeOptions = [
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

	const askType = (addElement: AddCardElement) => {
		isDialogOpen.value = true;
		addElementFunction = addElement;
	};

	const closeDialog = () => {
		isDialogOpen.value = false;
	};

	return {
		askType,
		isDialogOpen,
		elementTypeOptions,
		closeDialog,
		createFileElement,
		isFilePickerOpen,
	};
});

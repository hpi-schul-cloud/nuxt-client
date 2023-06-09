import { FileRecordParentType } from "@/fileStorageApi/v3";
import { ContentElementType } from "@/serverApi/v3";
import { mdiFormatSize, mdiUpload } from "@mdi/js";
import { AddCardElement } from "../state/CardState.composable";
import { useFileStorageApi } from "./FileStorageApi.composable";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { useFilePicker } from "./FilePicker.composable";

export const useElementTypeSelection = (addElementFunction: AddCardElement) => {
	const { isDialogOpen, closeDialog, elementTypeOptions } =
		useSharedElementTypeSelection();
	const { openFilePicker } = useFilePicker();

	const onElementClick = async (elementType: ContentElementType) => {
		await addElementFunction(elementType);

		closeDialog();
	};

	const onFileElementClick = () => {
		openFilePicker();
		closeDialog();
	};

	const options = [
		{
			icon: mdiFormatSize,
			label: "components.elementTypeSelection.elements.textElement.subtitle",
			action: () => onElementClick(ContentElementType.RichText),
			testId: "create-element-text",
		},
		{
			icon: mdiUpload,
			label: "components.elementTypeSelection.elements.fileElement.subtitle",
			action: onFileElementClick,
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
		onElementClick,
		onFileElementClick,
		openFilePicker,
	};
};

import { ContentElementType } from "@/serverApi/v3";
import { mdiFormatSize, mdiUpload } from "@mdi/js";
import { AddCardElement } from "../state/CardState.composable";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { useSelectedFile } from "./SelectedFile.composable";
import { ref } from "vue";

export const useElementTypeSelection = (addElementFunction: AddCardElement) => {
	const { isDialogOpen, closeDialog, elementTypeOptions } =
		useSharedElementTypeSelection();
	const { setSelectedFile } = useSelectedFile();
	const isFilePickerOpen = ref(false);

	const onElementClick = async (elementType: ContentElementType) => {
		await addElementFunction(elementType);

		closeDialog();
	};

	const onFileSelect = async (file: File) => {
		setSelectedFile(file);
		await addElementFunction(ContentElementType.File);
	};

	const onFileElementClick = () => {
		isFilePickerOpen.value = true;
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
		onFileSelect,
		isFilePickerOpen,
	};
};

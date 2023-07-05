import { ContentElementType } from "@/serverApi/v3";
import { mdiFormatText, mdiTrayArrowUp } from "@mdi/js";
import { ref } from "vue";
import { AddCardElement } from "../state/CardState.composable";
import { useSelectedFile } from "./SelectedFile.composable";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";

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
		const hasSetFile = setSelectedFile(file);

		if (hasSetFile) {
			try {
				await addElementFunction(ContentElementType.File);
			} catch (error) {
				setSelectedFile();
			}
		}
	};

	const onFileElementClick = () => {
		isFilePickerOpen.value = true;
		closeDialog();
	};

	const options = [
		{
			icon: mdiFormatText,
			label: "components.elementTypeSelection.elements.textElement.subtitle",
			action: () => onElementClick(ContentElementType.RichText),
			testId: "create-element-text",
		},
		{
			icon: mdiTrayArrowUp,
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

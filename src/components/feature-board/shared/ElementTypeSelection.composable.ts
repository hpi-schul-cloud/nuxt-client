import { ContentElementType } from "@/serverApi/v3";
import { mdiFormatText, mdiTrayArrowUp } from "@mdi/js";
import { AddCardElement } from "../state/CardState.composable";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";

export const useElementTypeSelection = (addElementFunction: AddCardElement) => {
	const { isDialogOpen, closeDialog, elementTypeOptions } =
		useSharedElementTypeSelection();

	const onElementClick = async (elementType: ContentElementType) => {
		await addElementFunction(elementType);

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
			action: () => onElementClick(ContentElementType.File),
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
	};
};

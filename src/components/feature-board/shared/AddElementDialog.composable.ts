import { ContentElementType } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { mdiFormatText, mdiTrayArrowUp } from "@mdi/js";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";

type AddCardElement = (
	type: ContentElementType
) => Promise<AnyContentElement | undefined>;

export const useAddElementDialog = (addElementFunction: AddCardElement) => {
	const { isDialogOpen, closeDialog, elementTypeOptions } =
		useSharedElementTypeSelection();

	const onElementClick = async (elementType: ContentElementType) => {
		closeDialog();
		await addElementFunction(elementType);
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

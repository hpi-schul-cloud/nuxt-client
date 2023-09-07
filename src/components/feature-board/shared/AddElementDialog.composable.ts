import { ContentElementType } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import {
	mdiFormatText,
	mdiLightbulbOnOutline,
	mdiPresentation,
	mdiTrayArrowUp,
} from "@mdi/js";
import { useSharedLastCreatedElement } from "@util-board";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { notifierModule } from "@/store/store-accessor";

type AddCardElement = (
	type: ContentElementType
) => Promise<AnyContentElement | undefined>;

export const useAddElementDialog = (
	addElementFunction: AddCardElement,
	elements: any
) => {
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { lastCreatedElementId } = useSharedLastCreatedElement();

	const { isDialogOpen, closeDialog, elementTypeOptions } =
		useSharedElementTypeSelection();

	const onElementClick = async (elementType: ContentElementType) => {
		closeDialog();
		const drawingExists = elements.value.elements.some(
			(element: { type: ContentElementType }) =>
				element.type === ContentElementType.Drawing
		);
		if (elementType === ContentElementType.Drawing) {
			if (drawingExists) {
				notifierModule.show({
					text: "You cannot add another board within the card",
					status: "error",
				});
				return;
			}
		}

		const elementData = await addElementFunction(elementType);
		lastCreatedElementId.value = elementData?.id;
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
		{
			icon: mdiPresentation,
			label: "components.elementTypeSelection.elements.boardElement.subtitle",
			action: () => onElementClick(ContentElementType.Drawing),
			testId: "create-element-drawing-element",
		},
	];

	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED) {
		options.push({
			icon: mdiLightbulbOnOutline,
			label:
				"components.elementTypeSelection.elements.submissionElement.subtitle",
			action: () => onElementClick(ContentElementType.SubmissionContainer),
			testId: "create-element-submission-container",
		});
	}
	// if (envConfigModule.getEnv.FEATURE_TLDRAW_ENABLED) {
	// 	options.push({
	// 		icon: mdiPresentation,
	// 		label: "components.elementTypeSelection.elements.boardElement.subtitle",
	// 		action: () => onElementClick(ContentElementType.Drawing),
	// 		testId: "create-element-drawing-element",
	// 	});
	// }

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

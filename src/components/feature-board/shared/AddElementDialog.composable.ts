import { ContentElementType } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import {
	mdiFormatText,
	mdiCheckboxMarkedCircleOutline,
	mdiTrayArrowUp,
	mdiClipboardClockOutline,
} from "@mdi/js";
import { useSharedLastCreatedElement } from "@util-board";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";

type AddCardElement = (
	type: ContentElementType,
	submissionType?: string
) => Promise<AnyContentElement | undefined>;

export const useAddElementDialog = (addElementFunction: AddCardElement) => {
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { lastCreatedElementId } = useSharedLastCreatedElement();

	const { isDialogOpen, closeDialog, elementTypeOptions } =
		useSharedElementTypeSelection();

	const onElementClick = async (
		elementType: ContentElementType,
		submissionType = "submission"
	) => {
		closeDialog();
		const elementData = await addElementFunction(elementType, submissionType);
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
	];

	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED) {
		options.push({
			icon: mdiCheckboxMarkedCircleOutline,
			label: "To-do",
			action: () =>
				onElementClick(ContentElementType.SubmissionContainer, "todo"),
			testId: "create-element-submission-container",
		});
	}
	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED) {
		options.push({
			icon: mdiClipboardClockOutline,
			label:
				"components.elementTypeSelection.elements.submissionElement.subtitle",
			action: () => onElementClick(ContentElementType.SubmissionContainer),
			testId: "create-element-submission-container",
		});
	}

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

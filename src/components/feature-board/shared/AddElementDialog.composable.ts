import { ContentElementType } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import {
	mdiPresentation,
	mdiFormatText,
	mdiLightbulbOnOutline,
	mdiLink,
	mdiPuzzleOutline,
	mdiTrayArrowUp,
} from "@mdi/js";
import { useSharedLastCreatedElement } from "@util-board";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { useI18n } from "@/composables/i18n.composable";
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

	const { t } = useI18n();

	const onElementClick = async (elementType: ContentElementType) => {
		closeDialog();

		try {
			const elementData = await addElementFunction(elementType);
			lastCreatedElementId.value = elementData?.id;
		} catch (error) {
			if (elementType === ContentElementType.Drawing) {
				notifierModule.show({
					text: t(
						"components.administration.externalToolsSection.notification.infoCreation"
					),
					status: "error",
				});
			}
		}
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
			icon: mdiLightbulbOnOutline,
			label:
				"components.elementTypeSelection.elements.submissionElement.subtitle",
			action: () => onElementClick(ContentElementType.SubmissionContainer),
			testId: "create-element-submission-container",
		});
	}

	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED) {
		options.push({
			icon: mdiPuzzleOutline,
			label:
				"components.elementTypeSelection.elements.externalToolElement.subtitle",
			action: () => onElementClick(ContentElementType.ExternalTool),
			testId: "create-element-external-tool-container",
		});
	}

	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED) {
		options.push({
			icon: mdiLink,
			label: "components.elementTypeSelection.elements.linkElement.subtitle",
			action: () => onElementClick(ContentElementType.Link),
			testId: "create-element-link",
		});
	}

	if (envConfigModule.getEnv.FEATURE_TLDRAW_ENABLED) {
		options.push({
			icon: mdiPresentation,
			label: "components.elementTypeSelection.elements.boardElement.subtitle",
			action: () => onElementClick(ContentElementType.Drawing),
			testId: "create-element-drawing-element",
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

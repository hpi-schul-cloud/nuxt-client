import { ContentElementType } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import {
	mdiFormatText,
	mdiLightbulbOnOutline,
	mdiLink,
	mdiPresentation,
	mdiPuzzleOutline,
	mdiTextBoxEditOutline,
	mdiTrayArrowUp,
} from "@mdi/js";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import { useI18n } from "vue-i18n";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";

type AddCardElement = (
	type: ContentElementType
) => Promise<AnyContentElement | undefined>;

export const useAddElementDialog = (addElementFunction: AddCardElement) => {
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { lastCreatedElementId } = useSharedLastCreatedElement();
	const { showCustomNotifier } = useBoardNotifier();
	const { t } = useI18n();

	const { isDialogOpen, closeDialog, elementTypeOptions } =
		useSharedElementTypeSelection();

	const onElementClick = async (elementType: ContentElementType) => {
		closeDialog();

		const elementData = await addElementFunction(elementType);
		lastCreatedElementId.value = elementData?.id;
		showCollaborativeTextEditorNotification(elementType);
	};

	const showCollaborativeTextEditorNotification = (
		elementType: ContentElementType
	) => {
		if (elementType === ContentElementType.CollaborativeTextEditor) {
			showCustomNotifier(
				t(
					"components.cardElement.collaborativeTextEditorElement.alert.info.visible"
				),
				"info"
			);
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
			label: "components.cardElement.drawingElement",
			action: () => onElementClick(ContentElementType.Drawing),
			testId: "create-element-drawing-element",
		});
	}

	if (
		envConfigModule.getEnv
			.FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED
	) {
		options.push({
			icon: mdiTextBoxEditOutline,
			label:
				"components.elementTypeSelection.elements.collaborativeTextEditor.subtitle",
			action: () => onElementClick(ContentElementType.CollaborativeTextEditor),
			testId: "create-element-collaborative-text-editor",
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
		showCollaborativeTextEditorNotification,
		showCustomNotifier,
	};
};

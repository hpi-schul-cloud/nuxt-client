import { CreateElementRequestPayload } from "@/modules/data/board/cardActions/cardActionPayload";
import { useCardRestApi } from "@/modules/data/board/cardActions/cardRestApi.composable";
import { ContentElementType, PreferedToolResponse } from "@/serverApi/v3";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import {
	mdiFormatText,
	mdiLightbulbOnOutline,
	mdiLink,
	mdiPresentation,
	mdiPuzzleOutline,
	mdiTextBoxEditOutline,
	mdiTrayArrowUp,
} from "@icons/material";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";

type CreateElementRequestFn = (payload: CreateElementRequestPayload) => void;

export const useAddElementDialog = (
	createElementRequestFn: CreateElementRequestFn,
	cardId: string
) => {
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { showCustomNotifier } = useBoardNotifier();
	const { t } = useI18n();

	const { isDialogOpen, closeDialog, elementTypeOptions } =
		useSharedElementTypeSelection();

	const { createPreferredElement } = useCardRestApi();

	// preferred tools should be called from the server via
	// const { getPreferredTools } = useCardRestApi();
	// and made available here
	const preferredTools = [
		{
			icon: "mdiMagnify",
			name: "LTI Test Tool",
			schoolExternalToolId: "647de374cf6a427b9d39e5ba",
		},
		{
			icon: "mdiTimerSandComplete",
			name: "TestTool",
			schoolExternalToolId: "644a46e5d0a8301e6cf25d86",
		},
	];

	const onElementClick = async (elementType: ContentElementType) => {
		closeDialog();

		await createElementRequestFn({ type: elementType, cardId });
		showNotificationByElementType(elementType);
	};

	const onPreferredElementClick = async (
		elementType: ContentElementType,
		tool: PreferedToolResponse
	) => {
		closeDialog();
		await createPreferredElement({ cardId, type: elementType }, tool);

		showNotificationByElementType(elementType);
	};

	const showNotificationByElementType = (elementType: ContentElementType) => {
		const translationKeyCollaborativeTextEditor =
			"components.cardElement.collaborativeTextEditorElement.alert.info.visible";
		const translationKeyDrawing =
			"components.cardElement.notification.visibleAndEditable";
		let translationKey = "";

		if (elementType === ContentElementType.CollaborativeTextEditor) {
			translationKey = translationKeyCollaborativeTextEditor;
		}
		if (elementType === ContentElementType.Drawing) {
			translationKey = translationKeyDrawing;
		}
		if (translationKey !== "") {
			showCustomNotifier(t(translationKey), "info");
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

	if (preferredTools) {
		preferredTools.forEach((tool: PreferedToolResponse) => {
			if (!tool.iconName) {
				tool.iconName = mdiPuzzleOutline;
			}

			options.push({
				icon: tool.iconName,
				label: "$" + tool.name,
				action: () =>
					onPreferredElementClick(ContentElementType.ExternalTool, tool),
				testId: `create-element-preferred-element-${tool.name.replaceAll(" ", "-").toLowerCase()}`,
			});
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

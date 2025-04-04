import type { CreateElementRequestPayload } from "@data-board";
import {
	BoardFeature,
	ContentElementType,
	PreferredToolResponse,
} from "@/serverApi/v3";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useBoardFeatures, useCardStore } from "@data-board";
import {
	mdiFormatText,
	mdiLightbulbOnOutline,
	mdiLink,
	mdiMicrophone,
	mdiPresentation,
	mdiPuzzleOutline,
	mdiTextBoxEditOutline,
	mdiTrayArrowUp,
	mdiVideoOutline,
} from "@icons/material";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";
import {
	ElementTypeSelectionOptions,
	useSharedElementTypeSelection,
} from "./SharedElementTypeSelection.composable";
import { computed } from "vue";

type CreateElementRequestFn = (payload: CreateElementRequestPayload) => void;

export const useAddElementDialog = (
	createElementRequestFn: CreateElementRequestFn,
	cardId: string
) => {
	const { isFeatureEnabled } = useBoardFeatures();
	const isVideoConferenceEnabled = computed(() =>
		isFeatureEnabled(BoardFeature.Videoconference)
	);

	const cardStore = useCardStore();

	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { showCustomNotifier } = useBoardNotifier();
	const { t } = useI18n();

	const { isDialogOpen, closeDialog, elementTypeOptions } =
		useSharedElementTypeSelection();

	const preferredTools = cardStore.getPreferredTools();

	const onElementClick = async (elementType: ContentElementType) => {
		closeDialog();

		await createElementRequestFn({ type: elementType, cardId });
		showNotificationByElementType(elementType);
	};

	const onPreferredElementClick = async (
		elementType: ContentElementType,
		tool: PreferredToolResponse
	) => {
		closeDialog();
		await cardStore.createPreferredElement({ cardId, type: elementType }, tool);

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

	const options: ElementTypeSelectionOptions[] = [
		{
			icon: mdiFormatText,
			label: t("components.elementTypeSelection.elements.textElement.subtitle"),
			action: () => onElementClick(ContentElementType.RichText),
			testId: "create-element-text",
		},
		{
			icon: mdiTrayArrowUp,
			label: t("components.elementTypeSelection.elements.fileElement.subtitle"),
			action: () => onElementClick(ContentElementType.File),
			testId: "create-element-file",
		},
	];

	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED) {
		options.push({
			icon: mdiLightbulbOnOutline,
			label: t(
				"components.elementTypeSelection.elements.submissionElement.subtitle"
			),
			action: () => onElementClick(ContentElementType.SubmissionContainer),
			testId: "create-element-submission-container",
		});
	}

	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED) {
		options.push({
			icon: mdiPuzzleOutline,
			label: t(
				"components.elementTypeSelection.elements.externalToolElement.subtitle"
			),
			action: () => onElementClick(ContentElementType.ExternalTool),
			testId: "create-element-external-tool-container",
		});
	}

	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED) {
		options.push({
			icon: mdiLink,
			label: t("components.elementTypeSelection.elements.linkElement.subtitle"),
			action: () => onElementClick(ContentElementType.Link),
			testId: "create-element-link",
		});
	}

	if (envConfigModule.getEnv.FEATURE_TLDRAW_ENABLED) {
		options.push({
			icon: mdiPresentation,
			label: t("components.cardElement.drawingElement"),
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
			label: t(
				"components.elementTypeSelection.elements.collaborativeTextEditor.subtitle"
			),
			action: () => onElementClick(ContentElementType.CollaborativeTextEditor),
			testId: "create-element-collaborative-text-editor",
		});
	}

	if (
		envConfigModule.getEnv.FEATURE_PREFERRED_CTL_TOOLS_ENABLED &&
		preferredTools
	) {
		preferredTools.forEach((tool: PreferredToolResponse) => {
			if (!tool.iconName) {
				tool.iconName = "mdiPuzzleOutline";
			}

			options.push({
				icon: "$" + tool.iconName,
				label: tool.name,
				action: () =>
					onPreferredElementClick(ContentElementType.ExternalTool, tool),
				testId: `create-element-preferred-element-${tool.name}`,
			});
		});
	}

	if (
		envConfigModule.getEnv.FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED &&
		isVideoConferenceEnabled.value
	) {
		options.push({
			icon: mdiVideoOutline,
			label: t(
				"components.elementTypeSelection.elements.videoConferenceElement.subtitle"
			),
			action: () => onElementClick(ContentElementType.VideoConference),
			testId: "create-element-video-conference",
		});
	}

	//if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_AUDIO_RECORDING_ENABLED) {
	options.push({
		icon: mdiMicrophone,
		label: t(
			"components.elementTypeSelection.elements.audioRecordElement.subtitle"
		),
		action: () => onElementClick(ContentElementType.AudioRecord),
		testId: "create-element-audio-record-container",
	});
	//}

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

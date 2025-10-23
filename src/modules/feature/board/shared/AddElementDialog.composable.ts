import { useAddCollaboraFile } from "./add-collabora-file.composable";
import { ElementTypeSelectionOptions, useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { BoardFeature, ContentElementType, PreferredToolResponse } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { notifyInfo } from "@data-app";
import { type CreateElementRequestPayload, useBoardFeatures, useBoardPermissions, useCardStore } from "@data-board";
import { useEnvConfig } from "@data-env";
import {
	mdiFileDocumentOutline,
	mdiFolderOpenOutline,
	mdiFormatText,
	mdiLightbulbOnOutline,
	mdiLink,
	mdiPresentation,
	mdiPuzzleOutline,
	mdiTextBoxEditOutline,
	mdiTrayArrowUp,
	mdiVideoOutline,
} from "@icons/material";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";

type CreateElementRequestFn = (payload: CreateElementRequestPayload) => Promise<AnyContentElement | undefined>;

export const useAddElementDialog = (createElementRequestFn: CreateElementRequestFn, cardId: string) => {
	const { isFeatureEnabled } = useBoardFeatures();
	const isVideoConferenceEnabled = computed(() => isFeatureEnabled(BoardFeature.Videoconference));

	const { hasManageVideoConferencePermission } = useBoardPermissions();

	const cardStore = useCardStore();

	const { t } = useI18n();

	const { isDialogOpen, isDialogLoading, closeDialog, staticElementTypeOptions, dynamicElementTypeOptions } =
		useSharedElementTypeSelection();

	const { openCollaboraFileDialog, setCardId, setCreateElementRequestFn } = useAddCollaboraFile();
	setCreateElementRequestFn(createElementRequestFn);

	const onElementClick = async (elementType: ContentElementType) => {
		closeDialog();

		await createElementRequestFn({ type: elementType, cardId });
		showNotificationByElementType(elementType);
	};

	const onPreferredElementClick = async (elementType: ContentElementType, tool: PreferredToolResponse) => {
		closeDialog();
		await cardStore.createPreferredElement({ cardId, type: elementType }, tool);

		showNotificationByElementType(elementType);
	};

	const showNotificationByElementType = (elementType: ContentElementType) => {
		const translationKeyCollaborativeTextEditor =
			"components.cardElement.collaborativeTextEditorElement.alert.info.visible";
		const translationKeyDrawing = "components.cardElement.notification.visibleAndEditable";
		let translationKey = "";

		if (elementType === ContentElementType.CollaborativeTextEditor) {
			translationKey = translationKeyCollaborativeTextEditor;
		}
		if (elementType === ContentElementType.Drawing) {
			translationKey = translationKeyDrawing;
		}
		if (translationKey !== "") {
			notifyInfo(translationKey);
		}
	};

	const getStaticElementOptions = (): ElementTypeSelectionOptions[] => {
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

		const envConfig = useEnvConfig();

		if (envConfig.value.FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED) {
			options.push({
				icon: mdiLightbulbOnOutline,
				label: t("components.elementTypeSelection.elements.submissionElement.subtitle"),
				action: () => onElementClick(ContentElementType.SubmissionContainer),
				testId: "create-element-submission-container",
			});
		}

		if (envConfig.value.FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED) {
			options.push({
				icon: mdiPuzzleOutline,
				label: t("components.elementTypeSelection.elements.externalToolElement.subtitle"),
				action: () => onElementClick(ContentElementType.ExternalTool),
				testId: "create-element-external-tool-container",
			});
		}

		if (envConfig.value.FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED) {
			options.push({
				icon: mdiLink,
				label: t("components.elementTypeSelection.elements.linkElement.subtitle"),
				action: () => onElementClick(ContentElementType.Link),
				testId: "create-element-link",
			});
		}

		if (envConfig.value.FEATURE_TLDRAW_ENABLED) {
			options.push({
				icon: mdiPresentation,
				label: t("components.cardElement.drawingElement"),
				action: () => onElementClick(ContentElementType.Drawing),
				testId: "create-element-drawing-element",
			});
		}

		if (envConfig.value.FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED) {
			options.push({
				icon: mdiTextBoxEditOutline,
				label: t("components.elementTypeSelection.elements.collaborativeTextEditor.subtitle"),
				action: () => onElementClick(ContentElementType.CollaborativeTextEditor),
				testId: "create-element-collaborative-text-editor",
			});
		}

		if (
			envConfig.value.FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED &&
			isVideoConferenceEnabled.value &&
			hasManageVideoConferencePermission.value
		) {
			options.push({
				icon: mdiVideoOutline,
				label: t("components.elementTypeSelection.elements.videoConferenceElement.subtitle"),
				action: () => onElementClick(ContentElementType.VideoConference),
				testId: "create-element-video-conference",
			});
		}

		if (envConfig.value.FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED) {
			options.push({
				icon: mdiFolderOpenOutline,
				label: t("components.elementTypeSelection.elements.folderElement.subtitle"),
				action: () => onElementClick(ContentElementType.FileFolder),
				testId: "create-element-file-folder",
			});
		}

		if (envConfig.value.FEATURE_COLUMN_BOARD_H5P_ENABLED) {
			options.push({
				icon: "$h5pOutline",
				label: t("components.elementTypeSelection.elements.h5pElement.subtitle"),
				action: () => onElementClick(ContentElementType.H5p),
				testId: "create-element-h5p",
			});
		}

		if (envConfig.value.FEATURE_COLUMN_BOARD_COLLABORA_ENABLED) {
			options.push({
				icon: mdiFileDocumentOutline,
				label: t("components.elementTypeSelection.elements.collabora.subtitle"),
				action: () => onOfficeFileClick(),
				testId: "create-element-file-with-collabora",
			});
		}

		return options;
	};

	const loadDynamicElementOptions = (): void => {
		const options: ElementTypeSelectionOptions[] = [];

		const hasPreferredTools = !cardStore.isPreferredToolsLoading && cardStore.preferredTools.length > 0;

		if (useEnvConfig().value.FEATURE_PREFERRED_CTL_TOOLS_ENABLED && hasPreferredTools) {
			cardStore.preferredTools.forEach((tool: PreferredToolResponse) => {
				if (!tool.iconName) {
					tool.iconName = "mdiPuzzleOutline";
				}

				options.push({
					icon: "$" + tool.iconName,
					label: tool.name,
					action: () => onPreferredElementClick(ContentElementType.ExternalTool, tool),
					testId: `create-element-preferred-element-${tool.name}`,
				});
			});
		}

		isDialogLoading.value = cardStore.isPreferredToolsLoading;
		dynamicElementTypeOptions.value = options;
	};

	const staticOptions = getStaticElementOptions();

	const askType = () => {
		staticElementTypeOptions.value = staticOptions;
		loadDynamicElementOptions();

		isDialogOpen.value = true;
	};

	const onOfficeFileClick = async () => {
		setCardId(cardId);
		closeDialog();
		openCollaboraFileDialog();
	};

	watch(
		() => cardStore.preferredTools,
		() => loadDynamicElementOptions()
	);

	return {
		askType,
		isDialogOpen,
		staticElementTypeOptions,
		dynamicElementTypeOptions,
		onElementClick,
	};
};

import { ContentElementType } from "@api-server";
import { useEnvConfig } from "@data-env";
import {
	mdiFolderOpenOutline,
	mdiFormatText,
	mdiLink,
	mdiPresentation,
	mdiPuzzleOutline,
	mdiTextBoxEditOutline,
	mdiTrashCanOutline,
	mdiTrayArrowUp,
	mdiVideoOutline,
} from "@icons/material";

type ContentElementTypeMeta = { icon: string; labelKey: string; nameKey: string };

const contentElementTypeMeta: Record<ContentElementType, ContentElementTypeMeta> = {
	[ContentElementType.RICH_TEXT]: {
		icon: mdiFormatText,
		labelKey: "components.elementTypeSelection.elements.textElement.subtitle",
		nameKey: "components.cardElement.richTextElement",
	},
	[ContentElementType.FILE]: {
		icon: mdiTrayArrowUp,
		labelKey: "components.elementTypeSelection.elements.fileElement.subtitle",
		nameKey: "components.cardElement.fileElement",
	},
	[ContentElementType.EXTERNAL_TOOL]: {
		icon: mdiPuzzleOutline,
		labelKey: "components.elementTypeSelection.elements.externalToolElement.subtitle",
		nameKey: "components.cardElement.externalToolElement",
	},
	[ContentElementType.LINK]: {
		icon: mdiLink,
		labelKey: "components.elementTypeSelection.elements.linkElement.subtitle",
		nameKey: "components.cardElement.LinkElement",
	},
	[ContentElementType.DRAWING]: {
		icon: mdiPresentation,
		labelKey: "components.cardElement.drawingElement",
		nameKey: "components.cardElement.drawingElement",
	},
	[ContentElementType.COLLABORATIVE_TEXT_EDITOR]: {
		icon: mdiTextBoxEditOutline,
		labelKey: "components.elementTypeSelection.elements.collaborativeTextEditor.subtitle",
		nameKey: "components.cardElement.collaborativeTextEditorElement",
	},
	[ContentElementType.VIDEO_CONFERENCE]: {
		icon: mdiVideoOutline,
		labelKey: "components.elementTypeSelection.elements.videoConferenceElement.subtitle",
		nameKey: "components.cardElement.videoConferenceElement",
	},
	[ContentElementType.FILE_FOLDER]: {
		icon: mdiFolderOpenOutline,
		labelKey: "components.elementTypeSelection.elements.folderElement.subtitle",
		nameKey: "components.cardElement.folderElement",
	},
	[ContentElementType.H5P]: {
		icon: "$h5pOutline",
		labelKey: "components.elementTypeSelection.elements.h5pElement.subtitle",
		nameKey: "components.cardElement.h5pElement",
	},
	[ContentElementType.DELETED]: {
		icon: mdiTrashCanOutline,
		labelKey: "components.cardElement.deletedElement",
		nameKey: "components.cardElement.deletedElement",
	},
};

export const isContentElementTypeEnabled = (type: ContentElementType): boolean => {
	const config = useEnvConfig().value;

	switch (type) {
		case ContentElementType.COLLABORATIVE_TEXT_EDITOR:
			return config.FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED;
		case ContentElementType.DRAWING:
			return config.FEATURE_TLDRAW_ENABLED;
		case ContentElementType.EXTERNAL_TOOL:
			return config.FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED;
		case ContentElementType.LINK:
			return config.FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED;
		case ContentElementType.VIDEO_CONFERENCE:
			return config.FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED;
		case ContentElementType.FILE_FOLDER:
			return config.FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED;
		case ContentElementType.H5P:
			return config.FEATURE_COLUMN_BOARD_H5P_ENABLED;
		default:
			return true;
	}
};

export const getContentElementTypeMeta = (type: ContentElementType): ContentElementTypeMeta =>
	contentElementTypeMeta[type];

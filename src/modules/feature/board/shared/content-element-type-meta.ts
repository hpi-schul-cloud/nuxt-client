import { ContentElementType } from "@api-server";
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

type ContentElementTypeMeta = { icon: string; labelKey: string };

const contentElementTypeMeta: Record<ContentElementType, ContentElementTypeMeta> = {
	[ContentElementType.RICH_TEXT]: {
		icon: mdiFormatText,
		labelKey: "components.elementTypeSelection.elements.textElement.subtitle",
	},
	[ContentElementType.FILE]: {
		icon: mdiTrayArrowUp,
		labelKey: "components.elementTypeSelection.elements.fileElement.subtitle",
	},
	[ContentElementType.EXTERNAL_TOOL]: {
		icon: mdiPuzzleOutline,
		labelKey: "components.elementTypeSelection.elements.externalToolElement.subtitle",
	},
	[ContentElementType.LINK]: {
		icon: mdiLink,
		labelKey: "components.elementTypeSelection.elements.linkElement.subtitle",
	},
	[ContentElementType.DRAWING]: {
		icon: mdiPresentation,
		labelKey: "components.cardElement.drawingElement",
	},
	[ContentElementType.COLLABORATIVE_TEXT_EDITOR]: {
		icon: mdiTextBoxEditOutline,
		labelKey: "components.elementTypeSelection.elements.collaborativeTextEditor.subtitle",
	},
	[ContentElementType.VIDEO_CONFERENCE]: {
		icon: mdiVideoOutline,
		labelKey: "components.elementTypeSelection.elements.videoConferenceElement.subtitle",
	},
	[ContentElementType.FILE_FOLDER]: {
		icon: mdiFolderOpenOutline,
		labelKey: "components.elementTypeSelection.elements.folderElement.subtitle",
	},
	[ContentElementType.H5P]: {
		icon: "$h5pOutline",
		labelKey: "components.elementTypeSelection.elements.h5pElement.subtitle",
	},
	[ContentElementType.DELETED]: {
		icon: mdiTrashCanOutline,
		labelKey: "components.cardElement.deletedElement",
	},
};

export const getContentElementTypeMeta = (type: ContentElementType): ContentElementTypeMeta =>
	contentElementTypeMeta[type];

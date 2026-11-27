import { BoardImportJobFailureReason, BoardImportNoteResponse, BoardImportNoteType } from "@api-board-import";
import { useI18n } from "vue-i18n";

// Other reasons are internal and get the general text with the reason code.
const failureReasonKeys: Partial<Record<BoardImportJobFailureReason, string>> = {
	[BoardImportJobFailureReason.SOURCE_NOT_READABLE]: "feature-board-import.dialog.failure.sourceNotReadable",
	[BoardImportJobFailureReason.SOURCE_BOARD_TYPE_NOT_SUPPORTED]:
		"feature-board-import.dialog.failure.sourceBoardTypeNotSupported",
	[BoardImportJobFailureReason.SOURCE_RESPONSE_TOO_LARGE]: "feature-board-import.dialog.failure.sourceTooLarge",
	[BoardImportJobFailureReason.BOARD_API_FORBIDDEN]: "feature-board-import.dialog.failure.forbidden",
	[BoardImportJobFailureReason.MAX_DURATION]: "feature-board-import.dialog.failure.maxDuration",
};

const elementKeys: Record<string, string> = {
	link: "components.cardElement.LinkElement",
	file: "components.cardElement.fileElement",
	"video-conference": "components.cardElement.videoConferenceElement",
};

export const useBoardImportMessages = () => {
	const { t } = useI18n();

	const getFailureMessage = (reason?: BoardImportJobFailureReason): string => {
		const key = reason ? failureReasonKeys[reason] : undefined;
		if (key) return t(key);
		if (reason) return t("feature-board-import.dialog.failure.other", { reason });

		return t("feature-board-import.dialog.failure.unknown");
	};

	const getElementName = (note: BoardImportNoteResponse): string => {
		const key = note.elementType ? elementKeys[note.elementType] : undefined;
		if (key) return t(key);

		const kind = note.elementKind || note.elementType || "";

		return t("feature-board-import.dialog.notes.element.other", { kind });
	};

	const getNoteMessage = (note: BoardImportNoteResponse): string => {
		if (note.type === BoardImportNoteType.BOARD_TITLE_SHORTENED) {
			return t("feature-board-import.dialog.notes.boardTitleShortened");
		}
		if (note.type === BoardImportNoteType.BOARD_DESCRIPTION_LEFT_OUT) {
			return t("feature-board-import.dialog.notes.boardDescriptionLeftOut");
		}
		const withoutTitle = t("feature-board-import.dialog.notes.withoutTitle");
		const place = { section: note.sectionTitle || withoutTitle, card: note.cardTitle || withoutTitle };
		if (note.type === BoardImportNoteType.ELEMENT_LEFT_OUT) {
			return t("feature-board-import.dialog.notes.elementLeftOut", { element: getElementName(note), ...place });
		}
		if (note.type === BoardImportNoteType.LINK_CREATED_AS_TEXT) {
			return t("feature-board-import.dialog.notes.linkCreatedAsText", place);
		}

		return t("feature-board-import.dialog.notes.other", { type: note.type });
	};

	return { getFailureMessage, getNoteMessage };
};

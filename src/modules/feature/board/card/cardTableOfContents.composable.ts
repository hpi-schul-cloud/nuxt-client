import { getContentElementTypeMeta } from "../shared/content-element-type-meta";
import type {
	CardResponse,
	DeletedElementResponse,
	FileElementResponse,
	FileFolderElementResponse,
	LinkElementResponse,
	RichTextElementResponse,
	VideoConferenceElementResponse,
} from "@api-server";
import { ContentElementType } from "@api-server";
import { getCardDetailRoute, useBoardStore, useCardStore } from "@data-board";
import { useFileStorageApi } from "@data-file";
import { computed, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import type { RouteLocationRaw } from "vue-router";

type CardElement = CardResponse["elements"][number];

export type TableOfContentsElement = { id: string; icon: string; label: string };
export type TableOfContentsCard = { cardId: string; title: string; route: RouteLocationRaw; isCurrent: boolean };
export type TableOfContentsSection = { columnId: string; title: string; cards: TableOfContentsCard[] };

const TEASER_MAX_LENGTH = 80;

const isRichText = (element: CardElement): element is RichTextElementResponse =>
	element.type === ContentElementType.RICH_TEXT;
const isLink = (element: CardElement): element is LinkElementResponse => element.type === ContentElementType.LINK;
const isFile = (element: CardElement): element is FileElementResponse => element.type === ContentElementType.FILE;
const isTitledElement = (
	element: CardElement
): element is VideoConferenceElementResponse | FileFolderElementResponse | DeletedElementResponse =>
	element.type === ContentElementType.VIDEO_CONFERENCE ||
	element.type === ContentElementType.FILE_FOLDER ||
	element.type === ContentElementType.DELETED;

const BLOCK_BREAK_REGEX = /<\/?(?:p|div|li|h[1-6]|blockquote|tr)>|<br\s*\/?>/gi;

const toPlainText = (html: string): string => {
	const spacedHtml = html.replace(BLOCK_BREAK_REGEX, "$& ");
	const text = new DOMParser().parseFromString(spacedHtml, "text/html").body.textContent ?? "";

	return text.replace(/\s+/g, " ").trim();
};

const toTeaser = (html: string): string => toPlainText(html).slice(0, TEASER_MAX_LENGTH);

const toDomain = (url: string): string => {
	try {
		const hostname = new URL(url.includes("://") ? url : `https://${url}`).hostname;

		return hostname.replace(/^www\./, "");
	} catch {
		return "";
	}
};

export const useCardTableOfContents = (currentCardId: Ref<string>) => {
	const { t } = useI18n();
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { getFileRecordsByParentId } = useFileStorageApi();

	const sections = computed<TableOfContentsSection[]>(() => {
		const board = boardStore.board;
		if (!board) return [];

		return board.columns.map((column) => ({
			columnId: column.id,
			title: column.title.trim() || t("components.board.column.defaultTitle"),
			cards: column.cards.map(({ cardId }) => ({
				cardId,
				title: cardStore.getCard(cardId)?.title?.trim() || t("components.boardCard"),
				route: getCardDetailRoute(board.id, cardId),
				isCurrent: cardId === currentCardId.value,
			})),
		}));
	});

	const getElementText = (element: CardElement): string => {
		if (isRichText(element)) return toTeaser(element.content.text);
		if (isLink(element)) return toDomain(element.content.url) || element.content.title;
		if (isFile(element)) return getFileRecordsByParentId(element.id)[0]?.name || element.content.caption;
		if (isTitledElement(element)) return element.content.title;

		return "";
	};

	const currentElements = computed<TableOfContentsElement[]>(() =>
		(cardStore.getCard(currentCardId.value)?.elements ?? []).map((element) => {
			const { icon, labelKey } = getContentElementTypeMeta(element.type);

			return { id: element.id, icon, label: getElementText(element).trim() || t(labelKey) };
		})
	);

	return { sections, currentElements };
};

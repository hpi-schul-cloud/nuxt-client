import { getContentElementTypeMeta, isContentElementTypeEnabled } from "../shared/content-element-type-meta";
import { hasVisibleMarkup, toDomain, toTeaser } from "./cardElementText";
import {
	type CardResponse,
	ContentElementType,
	type DeletedElementResponse,
	type ExternalToolElementResponse,
	type FileElementResponse,
	type FileFolderElementResponse,
	type H5pElementResponse,
	type LinkElementResponse,
	type RichTextElementResponse,
	type VideoConferenceElementResponse,
} from "@api-server";
import {
	canManageExternalToolElements,
	canManageFileElements,
	canManageH5pElements,
	canManageLinkElements,
	canSeeDeletedElements,
	getCardDetailRoute,
	isContentElementShown,
	useBoardAllowedOperations,
	useBoardStore,
	useCardStore,
	useCourseBoardEditMode,
} from "@data-board";
import { useExternalToolReferenceApi } from "@data-external-tool";
import { useFileStorageApi } from "@data-file";
import { logger } from "@util-logger";
import { computed, type Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import type { RouteLocationRaw } from "vue-router";

type CardElement = CardResponse["elements"][number];

export type TableOfContentsElement = { id: string; icon: string; label: string };
type TableOfContentsCard = { cardId: string; title: string; route: RouteLocationRaw; isCurrent: boolean };
export type TableOfContentsSection = { columnId: string; title: string; cards: TableOfContentsCard[] };

const isRichText = (element: CardElement): element is RichTextElementResponse =>
	element.type === ContentElementType.RICH_TEXT;
const isLink = (element: CardElement): element is LinkElementResponse => element.type === ContentElementType.LINK;
const isFile = (element: CardElement): element is FileElementResponse => element.type === ContentElementType.FILE;
const isExternalTool = (element: CardElement): element is ExternalToolElementResponse =>
	element.type === ContentElementType.EXTERNAL_TOOL;
const isH5p = (element: CardElement): element is H5pElementResponse => element.type === ContentElementType.H5P;
const isTitledElement = (
	element: CardElement
): element is VideoConferenceElementResponse | FileFolderElementResponse | DeletedElementResponse =>
	element.type === ContentElementType.VIDEO_CONFERENCE ||
	element.type === ContentElementType.FILE_FOLDER ||
	element.type === ContentElementType.DELETED;

export const useCardTableOfContents = (currentCardId: Ref<string>, isEnabled: Readonly<Ref<boolean>>) => {
	const { t } = useI18n();
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { getFileRecordsByParentId } = useFileStorageApi();
	const { fetchDisplayDataCall } = useExternalToolReferenceApi();
	const { allowedOperations } = useBoardAllowedOperations();
	// The detail view remounts per card, so the card of its edit mode never changes.
	const { isEditMode } = useCourseBoardEditMode(currentCardId.value);

	const sections = computed<TableOfContentsSection[]>(() => {
		const board = boardStore.board;
		if (!board) return [];

		return board.columns
			.filter((column) => column.cards.length > 0)
			.map((column) => ({
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

	const toolNames = ref<Record<string, string>>({});
	const requestedToolIds = new Set<string>();

	const loadToolNames = async (ids: string[]) => {
		await Promise.all(
			ids
				.filter((toolId) => !requestedToolIds.has(toolId))
				.map(async (toolId) => {
					requestedToolIds.add(toolId);
					try {
						toolNames.value[toolId] = (await fetchDisplayDataCall(toolId)).name;
					} catch (error) {
						logger.warn(error);
					}
				})
		);
	};

	const getToolName = ({ content }: ExternalToolElementResponse): string =>
		(content.contextExternalToolId && toolNames.value[content.contextExternalToolId]) || "";

	const getElementText = (element: CardElement): string => {
		if (isRichText(element)) return toTeaser(element.content.text);
		if (isLink(element)) return toDomain(element.content.url) || element.content.title;
		if (isExternalTool(element)) return getToolName(element);
		if (isFile(element)) return getFileRecordsByParentId(element.id)[0]?.name || element.content.caption;
		if (isTitledElement(element)) return element.content.title;

		return "";
	};

	const cardElements = computed(() =>
		(cardStore.getCard(currentCardId.value)?.elements ?? []).filter((element) =>
			isContentElementTypeEnabled(element.type)
		)
	);

	// Replacing only an element's content (e.g. configuring a tool) must trigger loading, so watch the ids.
	const toolIds = computed(() =>
		cardElements.value.filter(isExternalTool).flatMap(({ content }) => content.contextExternalToolId ?? [])
	);

	watch(
		[toolIds, isEnabled],
		([ids, enabled]) => {
			if (enabled) loadToolNames(ids);
		},
		{ immediate: true }
	);

	// Uses the renderers' rules, so the overview lists exactly what the card shows.
	const isElementVisible = (element: CardElement, text: string): boolean => {
		const operations = allowedOperations.value;
		const isShown = (hasContent: boolean, canManage = false) =>
			isContentElementShown({ isEditMode: isEditMode.value, hasContent, canManage });

		if (isRichText(element)) return isShown(text !== "" || hasVisibleMarkup(element.content.text));
		if (isLink(element)) return isShown(element.content.url !== "", canManageLinkElements(operations));
		if (isH5p(element)) return isShown(!!element.content.contentId, canManageH5pElements(operations));
		if (isExternalTool(element)) {
			return isShown(!!element.content.contextExternalToolId, canManageExternalToolElements(operations));
		}
		if (isFile(element)) {
			return isShown(getFileRecordsByParentId(element.id).length > 0, canManageFileElements(operations));
		}
		if (element.type === ContentElementType.DELETED) return canSeeDeletedElements(operations);

		return true;
	};

	const currentElements = computed<TableOfContentsElement[]>(() => {
		if (!isEnabled.value) return [];

		return cardElements.value.flatMap((element) => {
			const text = getElementText(element).trim();
			if (!isElementVisible(element, text)) return [];

			const { icon, nameKey } = getContentElementTypeMeta(element.type);
			return [{ id: element.id, icon, label: text || t(nameKey) }];
		});
	});

	return { sections, currentElements };
};

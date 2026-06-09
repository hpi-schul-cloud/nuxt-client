<template>
	<nav class="toc-panel" :aria-label="t('components.board.dialog.detail-view.toc.title')">
		<div class="toc-header pa-3 border-b-thin d-flex align-center">
			<span class="text-subtitle-2 font-weight-bold">{{ t("components.board.dialog.detail-view.toc.title") }}</span>
		</div>
		<VList density="compact" nav class="toc-list">
			<template v-for="(column, colIndex) in columns" :key="column.id">
				<VListSubheader class="font-weight-bold text-uppercase text-caption">
					{{ column.title || `${t("components.board.column.defaultTitle")} ${colIndex + 1}` }}
				</VListSubheader>
				<template v-for="cardSkeleton in column.cards" :key="cardSkeleton.cardId">
					<VListItem
						:to="cardRoute(cardSkeleton.cardId)"
						:active="cardSkeleton.cardId === currentCardId"
						active-color="primary"
						rounded
						class="toc-card-item"
						:data-testid="`toc-card-${cardSkeleton.cardId}`"
					>
						<VListItemTitle class="text-body-2">
							{{ cardTitle(cardSkeleton.cardId) }}
						</VListItemTitle>
					</VListItem>
					<template v-if="cardSkeleton.cardId === currentCardId">
						<VListItem
							v-for="element in currentCardElements"
							:key="element.id"
							class="toc-element-item"
							:prepend-icon="elementIconFor(element.type)"
							density="compact"
							:ripple="false"
							style="pointer-events: none"
							data-testid="toc-element"
						>
							<VListItemTitle class="text-caption">
								{{ elementTitleFor(element) }}
							</VListItemTitle>
						</VListItem>
					</template>
				</template>
			</template>
		</VList>
	</nav>
</template>

<script setup lang="ts">
import { AnyContentElement, ContentElementType } from "@/types/board/ContentElement";
import {
	DrawingElementResponse,
	FileElementResponse,
	FileFolderElementResponse,
	LinkElementResponse,
	RichTextElementResponse,
	VideoConferenceElementResponse,
} from "@api-server";
import { useBoardStore, useCardStore } from "@data-board";
import {
	mdiFileDocumentOutline,
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
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
	currentCardId: string;
}>();

const { t } = useI18n();

const boardStore = useBoardStore();
const { board } = storeToRefs(boardStore);

const cardStore = useCardStore();

const columns = computed(() => board.value?.columns ?? []);
const boardId = computed(() => board.value?.id);

const currentCardElements = computed(() => {
	const card = cardStore.getCard(props.currentCardId);
	return card?.elements ?? [];
});

const cardRoute = (cardId: string): RouteLocationRaw | undefined => {
	if (!boardId.value) return undefined;
	return { name: "boards-card-detail", params: { boardId: boardId.value, cardId } };
};

const cardTitle = (cardId: string): string => {
	const card = cardStore.getCard(cardId);
	return card?.title || t("components.board.dialog.detail-view.toc.untitled-card");
};

type ElementIconMap = Partial<Record<ContentElementType, string>>;

const elementIcons: ElementIconMap = {
	[ContentElementType.RICH_TEXT]: mdiFormatText,
	[ContentElementType.FILE]: mdiTrayArrowUp,
	[ContentElementType.LINK]: mdiLink,
	[ContentElementType.DRAWING]: mdiPresentation,
	[ContentElementType.EXTERNAL_TOOL]: mdiPuzzleOutline,
	[ContentElementType.COLLABORATIVE_TEXT_EDITOR]: mdiTextBoxEditOutline,
	[ContentElementType.VIDEO_CONFERENCE]: mdiVideoOutline,
	[ContentElementType.FILE_FOLDER]: mdiFolderOpenOutline,
	[ContentElementType.H5P]: mdiFileDocumentOutline,
	[ContentElementType.DELETED]: mdiTrashCanOutline,
};

type ElementLabelKeyMap = Partial<Record<ContentElementType, string>>;

const elementLabelKeys: ElementLabelKeyMap = {
	[ContentElementType.RICH_TEXT]: "components.elementTypeSelection.elements.textElement.subtitle",
	[ContentElementType.FILE]: "components.elementTypeSelection.elements.fileElement.subtitle",
	[ContentElementType.LINK]: "components.elementTypeSelection.elements.linkElement.subtitle",
	[ContentElementType.DRAWING]: "components.cardElement.drawingElement",
	[ContentElementType.EXTERNAL_TOOL]: "components.elementTypeSelection.elements.externalToolElement.subtitle",
	[ContentElementType.COLLABORATIVE_TEXT_EDITOR]:
		"components.elementTypeSelection.elements.collaborativeTextEditor.subtitle",
	[ContentElementType.VIDEO_CONFERENCE]: "components.elementTypeSelection.elements.videoConferenceElement.subtitle",
	[ContentElementType.FILE_FOLDER]: "components.elementTypeSelection.elements.folderElement.subtitle",
	[ContentElementType.H5P]: "components.elementTypeSelection.elements.h5pElement.subtitle",
	[ContentElementType.DELETED]: "components.cardElement.deletedElement",
};

const elementIconFor = (type: ContentElementType): string => elementIcons[type] ?? mdiFormatText;

const elementTitleFor = (element: AnyContentElement): string => {
	switch (element.type) {
		case ContentElementType.LINK:
			return (
				(element as LinkElementResponse).content.title ||
				(element as LinkElementResponse).content.url ||
				t(elementLabelKeys[element.type]!)
			);
		case ContentElementType.FILE:
			return (element as FileElementResponse).content.caption || t(elementLabelKeys[element.type]!);
		case ContentElementType.FILE_FOLDER:
			return (element as FileFolderElementResponse).content.title || t(elementLabelKeys[element.type]!);
		case ContentElementType.VIDEO_CONFERENCE:
			return (element as VideoConferenceElementResponse).content.title || t(elementLabelKeys[element.type]!);
		case ContentElementType.DRAWING:
			return (element as DrawingElementResponse).content.description || t(elementLabelKeys[element.type]!);
		case ContentElementType.RICH_TEXT: {
			const rawText = (element as RichTextElementResponse).content.text;
			const stripped = rawText.replace(/<[^>]+>/g, "").trim();
			return stripped.length > 0 ? stripped.slice(0, 40) : t(elementLabelKeys[element.type]!);
		}
		case ContentElementType.EXTERNAL_TOOL:
		case ContentElementType.COLLABORATIVE_TEXT_EDITOR:
		case ContentElementType.H5P:
		default:
			return t(elementLabelKeys[element.type] ?? elementLabelKeys[ContentElementType.RICH_TEXT]!);
	}
};
</script>

<style lang="scss" scoped>
.toc-panel {
	width: 280px;
	min-width: 280px;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	background-color: white;
	border-right: thin solid rgba(0, 0, 0, 0.12);
}

.toc-list {
	flex: 1;
}

.toc-card-item {
	padding-left: 1.5rem;
}

.toc-element-item {
	padding-left: 2.5rem;
	opacity: 0.75;
}
</style>

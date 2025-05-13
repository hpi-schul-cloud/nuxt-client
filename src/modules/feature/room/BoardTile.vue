<template>
	<VCard
		:class="isDraft ? 'opacity-80' : 'bg-surface-light'"
		:variant="isDraft ? 'outlined' : 'flat'"
		draggable="false"
		:data-testid="`board-tile-${index}`"
		:to="boardPath"
	>
		<VCardSubtitle
			class="mt-4 d-flex align-center"
			:class="{ 'opacity-100': isDraft }"
			:data-testid="`board-tile-subtitle-${index}`"
		>
			<VIcon size="14" class="mr-1" :icon="subtitleIcon" />
			{{ subtitleText }}
		</VCardSubtitle>
		<VCardTitle
			class="board-tile-title text-body-1 font-weight-bold my-2"
			:data-testid="`board-tile-title-${index}`"
		>
			<LineClamp>
				{{ board.title }}
			</LineClamp>
		</VCardTitle>
	</VCard>
</template>

<script setup lang="ts">
import { BoardLayout } from "@/serverApi/v3";
import { RoomBoardItem } from "@/types/room/Room";
import { mdiViewAgendaOutline, mdiViewDashboardOutline } from "@icons/material";
import { computed, PropType, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { LineClamp } from "@ui-line-clamp";

const props = defineProps({
	board: { type: Object as PropType<RoomBoardItem>, required: true },
	index: { type: Number, required: true },
});

const { t } = useI18n();
const board = toRef(props, "board");

const isListBoard = computed(() => {
	return board.value.layout === BoardLayout.List;
});

const isDraft = computed(() => {
	return board.value.isVisible === false;
});

const subtitleIcon = computed(() => {
	const icon = isListBoard.value
		? mdiViewAgendaOutline
		: mdiViewDashboardOutline;

	return icon;
});

const subtitleText = computed(() => {
	const text = isListBoard.value
		? t("pages.room.boardCard.label.listBoard")
		: t("pages.room.boardCard.label.columnBoard");

	if (isDraft.value) {
		const suffix = ` - ${t("common.words.draft")}`;
		return text + suffix;
	}

	return text;
});

const boardPath = computed(() => {
	return `/boards/${board.value.id}`;
});
</script>

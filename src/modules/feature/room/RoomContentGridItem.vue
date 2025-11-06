<template>
	<VCard
		class="room-content-grid-item"
		:class="isDraft ? 'opacity-80' : 'bg-surface-light'"
		:variant="isDraft ? 'outlined' : 'flat'"
		:data-testid="`board-grid-item-${index}`"
		:aria-label="`${subtitleText}: ${board.title}`"
	>
		<VCardSubtitle
			class="mt-4 d-flex align-center"
			:class="{ 'opacity-100': isDraft }"
			:data-testid="`board-grid-item-subtitle-${index}`"
		>
			<VIcon size="14" class="mr-1" :icon="subtitleIcon" />
			{{ subtitleText }}
		</VCardSubtitle>
		<VCardTitle class="text-body-1 font-weight-bold mb-2" :data-testid="`board-grid-title-${index}`">
			<LineClamp>
				{{ board.title }}
			</LineClamp>
		</VCardTitle>
		<VCardActions class="justify-end">
			<VBtn variant="elevated" color="primary" :to="boardPath">{{ t("pages.room.boardCard.label.openItem") }}</VBtn>
		</VCardActions>
	</VCard>
</template>

<script setup lang="ts">
import { BoardLayout } from "@/types/board/Board";
import { RoomBoardItem } from "@/types/room/Room";
import { mdiViewAgendaOutline, mdiViewDashboardOutline } from "@icons/material";
import { LineClamp } from "@ui-line-clamp";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	board: { type: Object as PropType<RoomBoardItem>, required: true },
	index: { type: Number, required: true },
});

const { t } = useI18n();

const isListBoard = computed(() => props.board.layout === BoardLayout.List);

const isDraft = computed(() => props.board.isVisible === false);

const subtitleIcon = computed(() => (isListBoard.value ? mdiViewAgendaOutline : mdiViewDashboardOutline));

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

const boardPath = computed(() => `/boards/${props.board.id}`);
</script>
<style>
.room-content-grid-item:focus-within {
	outline: auto;
}
</style>

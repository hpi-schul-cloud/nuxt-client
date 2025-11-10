<template>
	<VCard
		class="room-content-grid-item"
		:class="isDraft ? 'opacity-80 bg-white' : 'bg-surface-light'"
		:variant="isDraft ? 'outlined' : 'flat'"
		:data-testid="`board-grid-item-${index}`"
	>
		<VCardSubtitle
			class="mt-4 d-flex align-center"
			:class="{ 'opacity-100': isDraft }"
			:data-testid="`board-grid-item-subtitle-${index}`"
		>
			<VIcon size="14" class="mr-1" :icon="subtitleIcon" />
			{{ subtitleText }}
		</VCardSubtitle>
		<VCardTitle class="grid-item-card-title text-body-1 font-weight-bold" :data-testid="`board-grid-title-${index}`">
			<RouterLink tabindex="-1" :to="boardPath" class="grid-item-router-link text-decoration-none">
				<LineClamp>
					{{ board.title }}
				</LineClamp>
			</RouterLink>
		</VCardTitle>
		<VCardActions class="justify-end pr-4">
			<VBtn
				:data-testid="`board-open-button-${index}`"
				variant="text"
				color="primary"
				:to="boardPath"
				:aria-label="`${subtitleText}: ${board.title}`"
			>
				{{ t("pages.room.boardCard.label.openItem") }}
			</VBtn>
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

.grid-item-card-title {
	max-width: max-content;
}

.grid-item-router-link {
	color: inherit;
}
</style>

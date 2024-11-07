<template>
	<VCard
		class="board-tile pa-4"
		:class="{ 'board-hidden': isHidden }"
		hover
		role="link"
		:data-testid="`board-tile-${props.index}`"
		:to="boardPath"
	>
		<VCardSubtitle
			class="board-tile-subtitle"
			:data-testid="`board-tile-subtitle-${props.index}`"
		>
			<VIcon size="14" class="mr-1" :icon="subtitleIcon" />
			{{ subtitleText }}
		</VCardSubtitle>
		<VCardTitle
			class="board-tile-title text-h6 my-2"
			:data-testid="`board-tile-title-${props.index}`"
		>
			{{ board.title }}
		</VCardTitle>
	</VCard>
</template>

<script setup lang="ts">
import { BoardLayout } from "@/serverApi/v3";
import { RoomBoardItem } from "@/types/room/Room";
import { mdiViewAgendaOutline, mdiViewDashboardOutline } from "@icons/material";
import { computed, PropType, toRef } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	board: { type: Object as PropType<RoomBoardItem>, required: true },
	index: { type: Number, required: true },
});

const { t } = useI18n();

const board = toRef(props, "board");

const isListBoard = computed(() => {
	return board.value?.layout === BoardLayout.List;
});

const isHidden = computed(() => {
	return board.value?.isVisible === false;
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

	if (isHidden.value) {
		const suffix = ` - ${t("common.words.draft")}`;
		return text + suffix;
	}
	return text;
});

const boardPath = computed(() => {
	return `/boards/${board.value.id}`;
});
</script>

<style lang="scss" scoped>
@import "@/styles/settings.scss";

.board-tile {
	background-color: map-get($grey, lighten-5);
	border: 1px solid map-get($grey, lighten-2);

	&.board-hidden .board-tile-subtitle,
	&.board-hidden .board-tile-title {
		opacity: 0.5;
	}
}
</style>

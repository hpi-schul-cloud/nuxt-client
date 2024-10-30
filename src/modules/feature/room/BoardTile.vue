<template>
	<div v-if="board" class="board-tile pa-4">
		<div>
			<VIcon size="14" class="mr-1" :icon="titleIcon" />
			{{ titlePrefix }}
		</div>
		<div class="text-h6">
			{{ board.title }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { BoardLayout } from "@/serverApi/v3";
import { RoomBoardItem } from "@/types/room/Room";
import { computed, PropType, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { mdiViewDashboardOutline } from "@icons/material";

const props = defineProps({
	board: { type: Object as PropType<RoomBoardItem> },
});

const { t } = useI18n();

const board = toRef(props, "board");

const isListBoard = computed(() => {
	return board.value?.layout === BoardLayout.List;
});

const titleIcon = computed(() => {
	const icon = isListBoard.value ? "$gridOutline" : mdiViewDashboardOutline;
	return icon;
});

const titlePrefix = computed(() =>
	isListBoard.value
		? t("pages.room.boardCard.label.listBoard")
		: t("pages.room.boardCard.label.columnBoard")
);
</script>

<style lang="scss" scoped>
@import "@/styles/settings.scss";

.board-tile {
	background-color: map-get($grey, lighten-5);
	border: 1px solid map-get($grey, lighten-2);
}
</style>

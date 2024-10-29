<template>
	<div v-if="board" class="board-tile pa-4">
		<div class="text-h6">
			{{ board.title }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { RoomBoardItem } from "@/types/room/Room";
import { PropType, toRef } from "vue";

const props = defineProps({
	board: { type: Object as PropType<RoomBoardItem> },
});

const board = toRef(props, "board");
</script>

<style lang="scss" scoped>
@import "@/styles/settings.scss";

.board-tile {
	background-color: map-get($grey, lighten-5);
	border: 1px solid map-get($grey, lighten-2);
}
</style>

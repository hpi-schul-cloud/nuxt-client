<template>
	<div>
		<BoardGrid :boards="roomBoards" />
	</div>
</template>

<script setup lang="ts">
import { RoomBoardItem, RoomDetails } from "@/types/room/Room";
import { PropType, toRef } from "vue";
import BoardGrid from "./BoardGrid.vue";

const props = defineProps({
	room: { type: Object as PropType<RoomDetails>, required: true },
	roomBoards: { type: Array as PropType<RoomBoardItem[]> },
});

const roomBoards = toRef(props, "roomBoards");
</script>

<style scoped>
.margin-bottom {
	margin-bottom: var(--space-md);
}
</style>

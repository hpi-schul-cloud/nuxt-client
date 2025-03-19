<template>
	<v-row class="mt-4" data-testid="board-grid">
		<v-col
			v-for="(board, index) in boards"
			:key="board.id"
			cols="12"
			sm="6"
			md="4"
			xl="3"
		>
			<BoardTile :board="board" :index="index" />
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { RoomBoardItem } from "@/types/room/Room";
import { PropType, toRef } from "vue";
import BoardTile from "./BoardTile.vue";

const props = defineProps({
	boards: { type: Array as PropType<RoomBoardItem[]>, required: true },
});

const boards = toRef(props, "boards");
</script>

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
			<BoardTile
				v-if="board.isVisible || canEditRoom"
				:board="board"
				:index="index"
			/>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { RoomBoardItem } from "@/types/room/Room";
import { PropType, toRef } from "vue";
import { useRoomAuthorization } from "@feature-room";
import BoardTile from "./BoardTile.vue";

const { canEditRoom } = useRoomAuthorization();

const props = defineProps({
	boards: { type: Array as PropType<RoomBoardItem[]> },
});

const boards = toRef(props, "boards");
</script>

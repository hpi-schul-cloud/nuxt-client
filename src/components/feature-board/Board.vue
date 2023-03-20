<template>
	<div class="ml-8 mr-8">
		<div>
			<h1>Board</h1>
		</div>
		<div class="d-flex flex-row flex-shrink-1">
			<template v-if="board">
				<Container
					orientation="horizontal"
					@drop="onColumnDrop"
					drag-handle-selector=".column-drag-handle"
					:get-child-payload="getColumnId"
					:drop-placeholder="cardDropPlaceholderOptions"
				>
					<template v-for="(column, index) in board.columns">
						<Draggable :key="column.id">
							<BoardColumn
								:column="column"
								:index="index"
								@position-change-keyboard="onPositionChangeKeyboard"
								@card-position-change="onCardPositionChange(index, $event)"
							/>
						</Draggable>
					</template>
				</Container>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router/composables";
import { Container, Draggable } from "vue-smooth-dnd";
import BoardColumn from "./BoardColumn.vue";
import { useBoardState } from "./BoardState.composable";
import {
	cardDropPlaceholderOptions,
	CardMove,
	CardMoveByKeyboard,
	ColumnMove,
} from "./types/DragAndDrop";

export default defineComponent({
	name: "Board",
	components: { BoardColumn, Container, Draggable },
	setup() {
		const route = useRoute();
		console.log("route.params", route.params);
		const { board, moveCard, moveColumn, moveCardByKeyboard } = useBoardState(
			route.params?.id
		);

		const onCardPositionChange = (columnIndex: number, payload: CardMove) => {
			moveCard(columnIndex, payload);
		};

		const onColumnDrop = (columnPayload: ColumnMove): void => {
			moveColumn(columnPayload);
		};

		const onPositionChangeKeyboard = (payload: CardMoveByKeyboard) => {
			moveCardByKeyboard(payload);
		};

		const getColumnId = (index: number): string => {
			if (board.value === undefined) {
				return "";
			}
			return board.value.columns[index].id;
		};

		return {
			board,
			cardDropPlaceholderOptions,
			getColumnId,
			onCardPositionChange,
			onColumnDrop,
			onPositionChangeKeyboard,
		};
	},
});
</script>

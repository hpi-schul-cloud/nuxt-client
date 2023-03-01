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
					:drop-placeholder="upperDropPlaceholderOptions"
					:get-child-payload="getChildPayload"
				>
					<template v-for="(column, index) in board.columns">
						<Draggable :key="column.id">
							<BoardColumn
								:column="column"
								:index="index"
								@position-change-keyboard="updatePositionByKeyboard"
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
import { defineComponent, watch, reactive } from "vue";
import BoardColumn from "./BoardColumn.vue";
import { useBoardState } from "./BoardState.composable";
import { Container, Draggable } from "vue-smooth-dnd";
import {
	CardMovePayload,
	ColumnDndPayload,
	upperDropPlaceholderOptions,
} from "./types/DragAndDrop";

export default defineComponent({
	name: "Board",
	components: { BoardColumn, Container, Draggable },
	setup() {
		const { board, changeColumnPosition, changePosition } = useBoardState(
			"0000d213816abba584714caa"
		);

		const onCardPositionChange = (
			columnIndex: number,
			payload: CardMovePayload
		) => {
			console.log("card-position ->", columnIndex, payload);
			changePosition(columnIndex, payload);
		};

		const onColumnDrop = (columnPayload: ColumnDndPayload): void => {
			changeColumnPosition(columnPayload);
		};

		const updatePositionByKeyboard = (
			columnIndex: number,
			payload: CardMovePayload
		) => {
			changePosition(columnIndex, payload);
		};

		const getChildPayload = (index: number): string => {
			return board.columns[index].id;
		};

		return {
			board,
			upperDropPlaceholderOptions,
			onColumnDrop,
			getChildPayload,
			updatePositionByKeyboard,
			onCardPositionChange,
		};
	},
});
</script>

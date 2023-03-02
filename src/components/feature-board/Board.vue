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
					:get-child-payload="getChildPayload"
					:drop-placeholder="cardDropPlaceholderOptions"
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
import { defineComponent } from "vue";
import BoardColumn from "./BoardColumn.vue";
import { useBoardState } from "./BoardState.composable";
import { Container, Draggable } from "vue-smooth-dnd";
import {
	CardMove,
	ColumnMove,
	upperDropPlaceholderOptions,
	CardMoveByKeyboard,
	cardDropPlaceholderOptions,
} from "./types/DragAndDrop";

export default defineComponent({
	name: "Board",
	components: { BoardColumn, Container, Draggable },
	setup() {
		const {
			board,
			changeColumnPosition,
			changePosition,
			changePositionByKeyboard,
		} = useBoardState("0000d213816abba584714caa");

		const onCardPositionChange = (columnIndex: number, payload: CardMove) => {
			changePosition(columnIndex, payload);
		};

		const onColumnDrop = (columnPayload: ColumnMove): void => {
			changeColumnPosition(columnPayload);
		};

		const updatePositionByKeyboard = (payload: CardMoveByKeyboard) => {
			changePositionByKeyboard(payload);
		};

		const getChildPayload = (index: number): string => {
			return board.columns[index].id;
		};

		return {
			board,
			upperDropPlaceholderOptions,
			cardDropPlaceholderOptions,
			onColumnDrop,
			getChildPayload,
			updatePositionByKeyboard,
			onCardPositionChange,
		};
	},
});
</script>

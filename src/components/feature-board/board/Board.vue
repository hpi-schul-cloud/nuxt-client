<template>
	<div class="ml-8 mr-8">
		<div>
			<h1>Board</h1>
		</div>
		<div class="d-flex flex-row flex-shrink-1 ml-n4">
			<template v-if="board">
				<Container
					orientation="horizontal"
					group-name="columns"
					drag-handle-selector=".column-drag-handle"
					lock-axis="x"
					:drag-begin-delay="200"
					:get-child-payload="getColumnId"
					:drop-placeholder="columnDropPlaceholderOptions"
					@drop="onColumnDrop"
				>
					<template v-for="(column, index) in board.columns">
						<Draggable :key="column.id">
							<BoardColumn
								:column="column"
								:index="index"
								@update:card-position:keyboard="onPositionChangeKeyboard"
								@update:card-position="onCardPositionChange(index, $event)"
								@update:title="
									($event) => onUpdateColumnTitle(column.id, $event)
								"
							/>
						</Draggable>
					</template>
				</Container>
				<BoardColumnGhost
					@add-column-with-card="onAddColumnWithCard"
					@add-empty-column="onAddEmptyColumn"
				></BoardColumnGhost>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router/composables";
import { Container, Draggable } from "vue-smooth-dnd";
import BoardColumn from "./BoardColumn.vue";
import BoardColumnGhost from "./BoardColumnGhost.vue";
import { useBoardState } from "../state/BoardState.composable";
import {
	columnDropPlaceholderOptions,
	CardMove,
	CardMoveByKeyboard,
	ColumnMove,
} from "../types/DragAndDrop";

export default defineComponent({
	name: "Board",
	components: { BoardColumn, Container, Draggable, BoardColumnGhost },
	setup() {
		const route = useRoute();
		const {
			board,
			moveCard,
			moveColumn,
			moveCardByKeyboard,
			updateColumnTitle,
		} = useBoardState(route.params?.id);

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

		const onUpdateColumnTitle = (columnId: string, newTitle: string) => {
			updateColumnTitle(columnId, newTitle);
		};

		const onAddEmptyColumn = () => {
			console.log("add-empty-column");
		};

		const onAddColumnWithCard = (payload: CardMove) => {
			if (payload.addedIndex === null) return;
			console.log("onAddColumnWithCard", payload);
		};

		return {
			board,
			columnDropPlaceholderOptions,
			getColumnId,
			onCardPositionChange,
			onColumnDrop,
			onPositionChangeKeyboard,
			onUpdateColumnTitle,
			onAddEmptyColumn,
			onAddColumnWithCard,
		};
	},
});
</script>
<style>
/* .smooth-dnd-container.vertical > .smooth-dnd-draggable-wrapper {
	overflow: visible !important;
} */

/**
 * This rule extends the droppable area of columns.
 * Without this rule cards have to be placed closely below the last card in a column to be added.
*/
.smooth-dnd-container.vertical {
	min-height: 70vh;
	height: 100%;
	padding-bottom: 50px;
}
</style>

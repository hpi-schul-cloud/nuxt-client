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
					lock-axis="x"
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
								@update:title="onUpdateColumnTitle(column.id, $event)"
								@remove-card="onRemoveCard"
								@create-card="onCreateCard"
								@delete-column="onColumnDelete"
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
			deleteColumn,
			moveCard,
			removeCard,
			moveColumn,
			moveCardByKeyboard,
			updateColumnTitle,
			addNewColumn,
			createCard,
		} = useBoardState(route.params?.id);

		const onCardPositionChange = (_: unknown, payload: CardMove) => {
			moveCard(payload);
		};

		const onRemoveCard = (cardId: string): void => {
			removeCard(cardId);
		};

		const onColumnDelete = async (columnId: string): Promise<void> => {
			await deleteColumn(columnId);
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
			addNewColumn();
		};

		const onAddColumnWithCard = (cardId?: string) => {
			addNewColumn(cardId);
		};

		const onCreateCard = (columnId: string) => {
			createCard(columnId);
		};

		return {
			board,
			columnDropPlaceholderOptions,
			onRemoveCard,
			getColumnId,
			onCardPositionChange,
			onColumnDelete,
			onColumnDrop,
			onPositionChangeKeyboard,
			onUpdateColumnTitle,
			onAddEmptyColumn,
			onAddColumnWithCard,
			onCreateCard,
		};
	},
});
</script>

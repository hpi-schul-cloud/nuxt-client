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
					@drop="onDropColumn"
				>
					<template v-for="(column, index) in board.columns">
						<Draggable :key="column.id">
							<BoardColumn
								:column="column"
								:index="index"
								@create:card="onCreateCard"
								@delete:card="onDeleteCard"
								@delete:column="onDeleteColumn"
								@update:card-position="onUpdateCardPosition(index, $event)"
								@update:card-position:keyboard="onUpdateCardPositionKeyboard"
								@update:column-title="onUpdateColumnTitle(column.id, $event)"
							/>
						</Draggable>
					</template>
				</Container>
				<BoardColumnGhost
					@add-column-with-card="onCreateColumnWithCard"
					@add-empty-column="onCreateEmptyColumn"
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
			createCard,
			createColumn,
			deleteColumn,
			extractCard,
			moveCard,
			moveCardByKeyboard,
			moveColumn,
			updateColumnTitle,
		} = useBoardState(route.params?.id);

		const onCreateCard = (columnId: string) => {
			createCard(columnId);
		};

		const onCreateColumnWithCard = (cardId?: string) => {
			createColumn(cardId);
		};

		const onCreateEmptyColumn = () => {
			createColumn();
		};

		const onDeleteCard = (cardId: string): void => {
			extractCard(cardId);
		};

		const onDeleteColumn = (columnId: string): void => {
			deleteColumn(columnId);
		};

		const onDropColumn = (columnPayload: ColumnMove): void => {
			moveColumn(columnPayload);
		};

		const onUpdateCardPosition = (_: unknown, payload: CardMove) => {
			moveCard(payload);
		};

		const onUpdateCardPositionKeyboard = (payload: CardMoveByKeyboard) => {
			moveCardByKeyboard(payload);
		};

		const onUpdateColumnTitle = (columnId: string, newTitle: string) => {
			updateColumnTitle(columnId, newTitle);
		};

		const getColumnId = (index: number): string => {
			if (board.value === undefined) {
				return "";
			}
			return board.value.columns[index].id;
		};

		return {
			board,
			columnDropPlaceholderOptions,
			onCreateCard,
			onCreateColumnWithCard,
			onCreateEmptyColumn,
			onDeleteCard,
			onDeleteColumn,
			getColumnId,
			onUpdateCardPosition,
			onDropColumn,
			onUpdateCardPositionKeyboard,
			onUpdateColumnTitle,
		};
	},
});
</script>

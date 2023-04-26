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
								@update:column-title="onUpdateColumnTitle(column.id, $event)"
							/>
						</Draggable>
					</template>
				</Container>
				<BoardColumnGhost
					@create:column="onCreateColumn"
					@create:column-with-card="onCreateColumnWithCard"
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
			createColumnWithCard,
			deleteColumn,
			extractCard,
			getColumnId,
			moveCard,
			moveColumn,
			updateColumnTitle,
		} = useBoardState(route.params?.id);

		const onCreateCard = (columnId: string) => {
			createCard(columnId);
		};

		const onCreateColumn = () => {
			createColumn();
		};

		const onCreateColumnWithCard = (cardId: string) => {
			createColumnWithCard(cardId);
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

		const onUpdateColumnTitle = (columnId: string, newTitle: string) => {
			updateColumnTitle(columnId, newTitle);
		};

		return {
			board,
			columnDropPlaceholderOptions,
			getColumnId,
			onCreateCard,
			onCreateColumn,
			onCreateColumnWithCard,
			onDeleteCard,
			onDeleteColumn,
			onUpdateCardPosition,
			onDropColumn,
			onUpdateColumnTitle,
		};
	},
});
</script>

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
					:lock-axis="hasMovePermission ? 'x' : 'x,y'"
					:get-child-payload="getColumnId"
					:drop-placeholder="columnDropPlaceholderOptions"
					@drop="onDropColumn"
				>
					<Draggable v-for="(column, index) in board.columns" :key="column.id">
						<BoardColumn
							:column="column"
							:index="index"
							:hasMovePermission="hasMovePermission"
							:hasCardCreatePermission="hasCardCreatePermission"
							:hasEditPermission="hasEditPermission"
							@create:card="onCreateCard"
							@delete:card="onDeleteCard"
							@delete:column="onDeleteColumn"
							@move:column-keyboard="
								onMoveColumnKeyboard(index, column.id, $event)
							"
							@update:card-position="onUpdateCardPosition(index, $event)"
							@update:column-title="onUpdateColumnTitle(column.id, $event)"
						/>
					</Draggable>
				</Container>
				<BoardColumnGhost
					v-if="hasColumnCreatePermission"
					@create:column="onCreateColumn"
					@create:column-with-card="onCreateColumnWithCard"
				></BoardColumnGhost>
				<DeleteConfirmation></DeleteConfirmation>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router/composables";
import { Container, Draggable } from "vue-smooth-dnd";
import BoardColumn from "./BoardColumn.vue";
import BoardColumnGhost from "./BoardColumnGhost.vue";
import DeleteConfirmation from "@/components/feature-confirmation-dialog/DeleteConfirmation.vue";
import { useBoardState } from "../state/BoardState.composable";
import { useBodyScrolling } from "../shared/BodyScrolling.composable";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";
import {
	columnDropPlaceholderOptions,
	CardMove,
	ColumnMove,
	horizontalCursorKeys,
	DragAndDropKey,
} from "../types/DragAndDrop";

export default defineComponent({
	name: "Board",
	components: {
		BoardColumn,
		Container,
		Draggable,
		BoardColumnGhost,
		DeleteConfirmation,
	},
	setup() {
		const route = useRoute();
		const {
			board,
			createCard,
			createColumn,
			createColumnWithCard,
			deleteCard,
			deleteColumn,
			getColumnId,
			moveCard,
			moveColumn,
			updateColumnTitle,
		} = useBoardState(route.params?.id);

		useBodyScrolling();

		const onCreateCard = async (columnId: string) => {
			if (!hasCardCreatePermission.value) return;

			await createCard(columnId);
		};

		const onCreateColumn = async () => {
			if (!hasColumnCreatePermission.value) return;
			await createColumn();
		};

		const onCreateColumnWithCard = async (cardId: string) => {
			if (!hasColumnCreatePermission.value) return;
			await createColumnWithCard(cardId);
		};

		const onDeleteCard = async (cardId: string) => {
			if (!hasCardCreatePermission.value) return;
			await deleteCard(cardId);
		};

		const onDeleteColumn = async (columnId: string) => {
			if (!hasColumnCreatePermission.value) return;
			await deleteColumn(columnId);
		};

		const onDropColumn = async (columnPayload: ColumnMove) => {
			if (!hasColumnCreatePermission.value) return;
			await moveColumn(columnPayload);
		};

		const onMoveColumnKeyboard = async (
			columnIndex: number,
			columnId: string,
			keyString: DragAndDropKey
		) => {
			if (!hasMovePermission.value) return;
			const columnMove: ColumnMove = {
				addedIndex: -1,
				removedIndex: columnIndex,
				payload: columnId,
			};

			if (horizontalCursorKeys.includes(keyString)) {
				const change = keyString === "ArrowLeft" ? -1 : +1;
				columnMove.addedIndex = columnIndex + change;
				await moveColumn(columnMove);
			}
		};

		const onUpdateCardPosition = async (_: unknown, payload: CardMove) => {
			if (!hasMovePermission.value) return;
			await moveCard(payload);
		};

		const onUpdateColumnTitle = (columnId: string, newTitle: string) => {
			if (!hasColumnCreatePermission.value) return;
			updateColumnTitle(columnId, newTitle);
		};

		const { permissions } = useBoardPermissions();

		const hasMovePermission = computed(() =>
			permissions.value.includes("move")
		);
		const hasCardCreatePermission = computed(() =>
			permissions.value.includes("card_create")
		);
		const hasColumnCreatePermission = computed(() =>
			permissions.value.includes("column_create")
		);
		const hasEditPermission = computed(() =>
			permissions.value.includes("board_edit")
		);

		return {
			board,
			columnDropPlaceholderOptions,
			getColumnId,
			onCreateCard,
			onCreateColumn,
			onCreateColumnWithCard,
			onDeleteCard,
			onDropColumn,
			onDeleteColumn,
			onMoveColumnKeyboard,
			onUpdateCardPosition,
			onUpdateColumnTitle,
			hasMovePermission,
			hasCardCreatePermission,
			hasColumnCreatePermission,
			hasEditPermission,
		};
	},
});
</script>

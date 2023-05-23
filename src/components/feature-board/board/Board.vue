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
					:lock-axis="lockAxis"
					:get-child-payload="getColumnId"
					:drop-placeholder="placeholderOptions"
					@drop="onDropColumn"
				>
					<Draggable v-for="(column, index) in board.columns" :key="column.id">
						<BoardColumn
							:column="column"
							:index="index"
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
					v-if="hasBoardColumnCreatePermission"
					@create:column="onCreateColumn"
					@create:column-with-card="onCreateColumnWithCard"
				></BoardColumnGhost>
				<DeleteConfirmation></DeleteConfirmation>
				<ElementTypeSelection></ElementTypeSelection>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import DeleteConfirmation from "@/components/feature-confirmation-dialog/DeleteConfirmation.vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router/composables";
import { Container, Draggable } from "vue-smooth-dnd";
import { useBodyScrolling } from "../shared/BodyScrolling.composable";
import ElementTypeSelection from "../shared/ElementTypeSelection.vue";
import { useBoardState } from "../state/BoardState.composable";
import {
	useBoardPermissions,
	handlePermittedAction,
} from "../shared/BoardPermissions.composable";
import {
	columnDropPlaceholderOptions,
	CardMove,
	ColumnMove,
	DragAndDropKey,
	horizontalCursorKeys,
} from "../types/DragAndDrop";
import BoardColumn from "./BoardColumn.vue";
import BoardColumnGhost from "./BoardColumnGhost.vue";

export default defineComponent({
	name: "Board",
	components: {
		BoardColumn,
		Container,
		Draggable,
		BoardColumnGhost,
		DeleteConfirmation,
		ElementTypeSelection,
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

		const {
			hasBoardMovePermission,
			hasBoardCardCreatePermission,
			hasBoardColumnCreatePermission,
		} = useBoardPermissions();

		const lockAxis = hasBoardMovePermission ? "x" : "x,y";
		const placeholderOptions = hasBoardMovePermission
			? columnDropPlaceholderOptions
			: null;

		const onCreateCard = async (columnId: string) => {
			await handlePermittedAction(
				hasBoardCardCreatePermission,
				createCard,
				columnId
			);
		};

		const onCreateColumn = async () => {
			await handlePermittedAction(hasBoardCardCreatePermission, createColumn);
		};

		const onCreateColumnWithCard = async (cardId: string) => {
			await handlePermittedAction(
				hasBoardCardCreatePermission,
				createColumnWithCard,
				cardId
			);
		};

		const onDeleteCard = async (cardId: string) => {
			await handlePermittedAction(
				hasBoardCardCreatePermission,
				deleteCard,
				cardId
			);
		};

		const onDeleteColumn = async (columnId: string) => {
			await handlePermittedAction(
				hasBoardCardCreatePermission,
				deleteColumn,
				columnId
			);
		};

		const onDropColumn = async (columnPayload: ColumnMove) => {
			await handlePermittedAction(
				hasBoardCardCreatePermission,
				moveColumn,
				columnPayload
			);
		};

		const onMoveColumnKeyboard = async (
			columnIndex: number,
			columnId: string,
			keyString: DragAndDropKey
		) => {
			const columnMove: ColumnMove = {
				addedIndex: -1,
				removedIndex: columnIndex,
				payload: columnId,
			};

			if (horizontalCursorKeys.includes(keyString)) {
				const change = keyString === "ArrowLeft" ? -1 : +1;
				columnMove.addedIndex = columnIndex + change;
				await handlePermittedAction(
					hasBoardMovePermission,
					moveColumn,
					columnMove
				);
			}
		};

		const onUpdateCardPosition = async (_: unknown, payload: CardMove) => {
			await handlePermittedAction(hasBoardMovePermission, moveCard, payload);
		};

		const onUpdateColumnTitle = async (columnId: string, newTitle: string) => {
			await handlePermittedAction(
				hasBoardColumnCreatePermission,
				updateColumnTitle,
				columnId,
				newTitle
			);
		};

		return {
			board,
			columnDropPlaceholderOptions,
			hasBoardMovePermission,
			hasBoardCardCreatePermission,
			hasBoardColumnCreatePermission,
			placeholderOptions,
			lockAxis,
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
		};
	},
});
</script>

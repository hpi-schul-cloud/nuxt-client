<template>
	<div>
		<div class="ml-1">
			<h1>{{ $t("pages.room.boardCard.label.courseBoard") }}</h1>
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
					:non-drag-area-selector="'.drag-disabled'"
				>
					<Draggable v-for="(column, index) in board.columns" :key="column.id">
						<BoardColumn
							:column="column"
							:index="index"
							:class="{ 'drag-disabled': isEditMode }"
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
					v-if="hasCreateColumnPermission"
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
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { computed, defineComponent, onMounted, watch } from "vue";
import { Container, Draggable } from "vue-smooth-dnd";
import { useSharedBoardBreadcrumbs } from "../shared/BoardBreadcrumbs.composable";
import { useBoardNotifier } from "../shared/BoardNotifications.composable";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";
import { useBodyScrolling } from "../shared/BodyScrolling.composable";
import { useSharedEditMode } from "../shared/EditMode.composable";
import ElementTypeSelection from "../shared/ElementTypeSelection.vue";
import { useBoardState } from "../state/BoardState.composable";
import {
	CardMove,
	ColumnMove,
	DragAndDropKey,
	columnDropPlaceholderOptions,
	horizontalCursorKeys,
} from "../types/DragAndDrop";
import BoardColumn from "./BoardColumn.vue";
import BoardColumnGhost from "./BoardColumnGhost.vue";

export default defineComponent({
	components: {
		BoardColumn,
		Container,
		Draggable,
		BoardColumnGhost,
		DeleteConfirmation,
		ElementTypeSelection,
	},
	props: {
		boardId: { type: String, required: true },
	},
	setup(props) {
		const i18n = injectStrict(I18N_KEY);
		const { showInfo } = useBoardNotifier();

		const { editModeId } = useSharedEditMode();
		const isEditMode = computed(() => editModeId.value !== undefined);

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
		} = useBoardState(props.boardId);

		const { createBreadcrumbs } = useSharedBoardBreadcrumbs();

		watch(board, async () => {
			await createBreadcrumbs(props.boardId);
		});

		useBodyScrolling();

		const {
			hasMovePermission,
			hasCreateCardPermission,
			hasCreateColumnPermission,
			hasDeletePermission,
			hasEditPermission,
			isTeacher,
		} = useBoardPermissions();

		const lockAxis = hasMovePermission ? "x" : "x,y";
		const placeholderOptions = hasMovePermission
			? columnDropPlaceholderOptions
			: null;

		const onCreateCard = async (columnId: string) => {
			if (hasCreateCardPermission) await createCard(columnId);
		};

		const onCreateColumn = async () => {
			if (hasCreateCardPermission) await createColumn();
		};

		const onCreateColumnWithCard = async (cardId: string) => {
			if (hasCreateCardPermission) await createColumnWithCard(cardId);
		};

		const onDeleteCard = async (cardId: string) => {
			if (hasCreateCardPermission) await deleteCard(cardId);
		};

		const onDeleteColumn = async (columnId: string) => {
			if (hasDeletePermission) await deleteColumn(columnId);
		};

		const onDropColumn = async (columnPayload: ColumnMove) => {
			if (hasMovePermission) await moveColumn(columnPayload);
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
				if (hasMovePermission) await moveColumn(columnMove);
			}
		};

		const onUpdateCardPosition = async (_: unknown, payload: CardMove) => {
			if (hasMovePermission) await moveCard(payload);
		};

		const onUpdateColumnTitle = async (columnId: string, newTitle: string) => {
			if (hasEditPermission) await updateColumnTitle(columnId, newTitle);
		};
		onMounted(() => {
			if (isTeacher) {
				showInfo(
					i18n.t("components.board.alert.info.teacher").toString(),
					false
				);
			}
		});

		return {
			board,
			columnDropPlaceholderOptions,
			hasMovePermission,
			hasCreateCardPermission,
			hasCreateColumnPermission,
			placeholderOptions,
			lockAxis,
			isEditMode,
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

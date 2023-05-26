<template>
	<DefaultWireframe ref="main" :full-width="true" :breadcrumbs="breadcrumbs">
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
						<Draggable
							v-for="(column, index) in board.columns"
							:key="column.id"
						>
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
						v-if="hasCreateColumnPermission"
						@create:column="onCreateColumn"
						@create:column-with-card="onCreateColumnWithCard"
					></BoardColumnGhost>
					<DeleteConfirmation></DeleteConfirmation>
					<ElementTypeSelection></ElementTypeSelection>
				</template>
			</div>
		</div>
	</DefaultWireframe>
</template>

<script lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import DeleteConfirmation from "@/components/feature-confirmation-dialog/DeleteConfirmation.vue";
import { defineComponent, inject } from "vue";
import { useRoute } from "vue-router/composables";
import { Container, Draggable } from "vue-smooth-dnd";
import { useBodyScrolling } from "../shared/BodyScrolling.composable";
import ElementTypeSelection from "../shared/ElementTypeSelection.vue";
import { useBoardState } from "../state/BoardState.composable";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";
import {
	columnDropPlaceholderOptions,
	CardMove,
	ColumnMove,
	DragAndDropKey,
	horizontalCursorKeys,
} from "../types/DragAndDrop";
import BoardColumn from "./BoardColumn.vue";
import BoardColumnGhost from "./BoardColumnGhost.vue";
import VueI18n from "vue-i18n";

export default defineComponent({
	name: "Board",
	components: {
		BoardColumn,
		Container,
		DefaultWireframe,
		Draggable,
		BoardColumnGhost,
		DeleteConfirmation,
		ElementTypeSelection,
	},
	setup() {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
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

		const breadcrumbs = [
			{
				text: i18n?.t("pages.courses.index.title"),
				to: "/rooms-overview",
			},
			{
				text: "Kurs-Titel",
				to: "/rooms-overview",
			},
		];

		useBodyScrolling();

		const {
			hasMovePermission,
			hasCreateCardPermission,
			hasCreateColumnPermission,
			hasDeletePermission,
			hasEditPermission,
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

		return {
			board,
			breadcrumbs,
			columnDropPlaceholderOptions,
			hasMovePermission,
			hasCreateCardPermission,
			hasCreateColumnPermission,
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

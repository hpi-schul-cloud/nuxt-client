<template>
	<div>
		<div class="ml-1">
			<h3 aria-level="1" class="mt-3">
				{{ $t("pages.room.boardCard.label.courseBoard") }}
			</h3>
		</div>
		<div class="d-flex flex-row flex-shrink-1 ml-n4" @touchend="onTouchEnd">
			<template v-if="board">
				<Container
					orientation="horizontal"
					group-name="columns"
					lock-axis="x"
					:get-child-payload="getColumnId"
					:drop-placeholder="placeholderOptions"
					@drop="onDropColumn"
					:non-drag-area-selector="'.drag-disabled'"
					:drag-begin-delay="isTouchDetected ? 300 : 0"
				>
					<Draggable v-for="(column, index) in board.columns" :key="column.id">
						<BoardColumn
							:column="column"
							:index="index"
							:class="{ 'drag-disabled': isEditMode || !hasMovePermission }"
							@reload:board="onReloadBoard"
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
				/>
				<ConfirmationDialog />
				<AddElementDialog />
				<LightBox />
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import {
	CardMove,
	columnDropPlaceholderOptions,
	ColumnMove,
	DragAndDropKey,
	horizontalCursorKeys,
} from "@/types/board/DragAndDrop";
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import {
	useBoardPermissions,
	useBoardState,
	useSharedBoardPageInformation,
	useSharedEditMode,
} from "@data-board";
import { ConfirmationDialog } from "@ui-confirmation-dialog";
import { LightBox } from "@ui-light-box";
import { useBoardNotifier } from "@util-board";
import { useTouchDetection } from "@util-device-detection";
import { useMediaQuery } from "@vueuse/core";
import {
	computed,
	defineComponent,
	onMounted,
	onUnmounted,
	toRef,
	watch,
} from "vue";
import AddElementDialog from "../shared/AddElementDialog.vue";
import { useBodyScrolling } from "../shared/BodyScrolling.composable";
import BoardColumn from "./BoardColumn.vue";
import BoardColumnGhost from "./BoardColumnGhost.vue";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Container, Draggable } = require("vue-dndrop");

export default defineComponent({
	components: {
		BoardColumn,
		Container,
		Draggable,
		BoardColumnGhost,
		ConfirmationDialog,
		AddElementDialog,
		LightBox,
	},
	props: {
		boardId: { type: String, required: true },
	},
	setup(props) {
		const i18n = injectStrict(I18N_KEY);
		const { showInfo, resetNotifier } = useBoardNotifier();
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
			reloadBoard,
			updateColumnTitle,
		} = useBoardState(toRef(props, "boardId").value);

		const { createPageInformation } = useSharedBoardPageInformation();

		const { isTouchDetected } = useTouchDetection();

		watch(board, async () => {
			await createPageInformation(props.boardId);
		});

		useBodyScrolling();

		const isDesktop = useMediaQuery(DeviceMediaQuery.Desktop);

		const {
			hasMovePermission,
			hasCreateCardPermission,
			hasCreateColumnPermission,
			hasDeletePermission,
			hasEditPermission,
			isTeacher,
		} = useBoardPermissions();

		const placeholderOptions = columnDropPlaceholderOptions;

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

		/**
		 * These classes should be removed automatically by vue-dndrop.
		 * The library has a bug where it is not removing these classes on mobile devices, preventing scrolling and other touch interactions.
		 */
		const onTouchEnd = () => {
			document.body.classList.remove(
				"dndrop-no-user-select",
				"dndrop-disable-touch-action"
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
				if (hasMovePermission) await moveColumn(columnMove);
			}
		};

		const onReloadBoard = async () => {
			await reloadBoard();
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

		onUnmounted(() => {
			resetNotifier();
		});

		return {
			board,
			columnDropPlaceholderOptions,
			hasMovePermission,
			hasCreateCardPermission,
			hasCreateColumnPermission,
			placeholderOptions,
			isEditMode,
			isDesktop,
			isTouchDetected,
			getColumnId,
			onTouchEnd,
			onCreateCard,
			onCreateColumn,
			onCreateColumnWithCard,
			onDeleteCard,
			onDropColumn,
			onDeleteColumn,
			onMoveColumnKeyboard,
			onReloadBoard,
			onUpdateCardPosition,
			onUpdateColumnTitle,
		};
	},
});
</script>

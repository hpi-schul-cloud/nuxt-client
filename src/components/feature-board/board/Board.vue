<template>
	<div>
		<div class="ml-1">
			<h3 aria-level="1" class="mt-0">
				{{ $t("pages.room.boardCard.label.courseBoard") }}
			</h3>
		</div>
		<template v-if="board">
			<div class="d-flex flex-row flex-shrink-1 ml-n4">
				<div>
					<Sortable
						:list="board.columns"
						item-key="id"
						tag="div"
						:options="{
							direction: 'horizontal',
							disabled: isEditMode || !hasMovePermission,
							group: 'columns',
							delay: 300, // isDesktop ? 0 : 300
							delayOnTouchOnly: true,
							ghostClass: 'sortable-drag-ghost',
							easing: 'cubic-bezier(1, 0, 0, 1)',
							dragClass: 'sortable-drag-board-card',
							dragoverBubble: true,
							animation: 250,
							scroll: true,
							forceFallback: true,
							bubbleScroll: true,
						}"
						class="d-flex flex-row flex-shrink-1 ml-n4"
						@end="onDropColumn"
					>
						<template #item="{ element, index }">
							<BoardColumn
								:data-column-id="element.id"
								:column="element"
								:index="index"
								:key="element.id"
								:columnCount="board.columns.length"
								@reload:board="onReloadBoard"
								@create:card="onCreateCard"
								@delete:card="onDeleteCard"
								@delete:column="onDeleteColumn"
								@update:card-position="onUpdateCardPosition(index, $event)"
								@update:column-title="onUpdateColumnTitle(element.id, $event)"
								@move:column-left="onMoveColumnLeft(index, element.id)"
								@move:column-right="onMoveColumnRight(index, element.id)"
							/>
						</template>
					</Sortable>
				</div>
				<div>
					<BoardColumnGhost
						v-if="hasCreateColumnPermission"
						@create:column="onCreateColumn"
					/>
				</div>
			</div>

			<ConfirmationDialog />
			<AddElementDialog />
			<LightBox />
		</template>
	</div>
</template>

<script lang="ts">
import {
	CardMove,
	columnDropPlaceholderOptions,
	ColumnMove,
} from "@/types/board/DragAndDrop";
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import {
	useBoardPermissions,
	useBoardState,
	useSharedBoardPageInformation,
	useSharedEditMode,
} from "@data-board";
import { ConfirmationDialog } from "@ui-confirmation-dialog";
import { LightBox } from "@ui-light-box";
import { extractDataAttribute, useBoardNotifier } from "@util-board";
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
import { useI18n } from "vue-i18n";
import { Sortable } from "sortablejs-vue3";
import { SortableEvent } from "sortablejs";
// eslint-disable-next-line @typescript-eslint/no-var-requires

export default defineComponent({
	components: {
		BoardColumn,
		BoardColumnGhost,
		ConfirmationDialog,
		AddElementDialog,
		LightBox,
		Sortable,
	},
	props: {
		boardId: { type: String, required: true },
	},
	setup(props) {
		const { t } = useI18n();
		const { showInfo, resetNotifier } = useBoardNotifier();
		const { editModeId } = useSharedEditMode();
		const isEditMode = computed(() => editModeId.value !== undefined);
		const {
			board,
			createCard,
			createColumn,
			deleteCard,
			deleteColumn,
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

		const onDeleteCard = async (cardId: string) => {
			if (hasCreateCardPermission) await deleteCard(cardId);
		};

		const onDeleteColumn = async (columnId: string) => {
			if (hasDeletePermission) await deleteColumn(columnId);
		};

		const onDropColumn = async (columnPayload: SortableEvent) => {
			if (!hasMovePermission) return;

			const columnId = extractDataAttribute(columnPayload.item, "columnId");
			if (
				columnId &&
				columnPayload.newIndex !== undefined &&
				columnPayload.oldIndex !== undefined
			) {
				const columnMove: ColumnMove = {
					addedIndex: columnPayload.newIndex,
					removedIndex: columnPayload.oldIndex,
					columnId,
				};
				await moveColumn(columnMove);
			}
		};

		const onMoveColumnLeft = async (columnIndex: number, columnId: string) => {
			if (!hasMovePermission) return;
			if (columnIndex === 0) return;

			const columnMove: ColumnMove = {
				addedIndex: columnIndex - 1,
				removedIndex: columnIndex,
				columnId,
			};

			await moveColumn(columnMove, true);
		};

		const onMoveColumnRight = async (columnIndex: number, columnId: string) => {
			if (!hasMovePermission) return;
			if (board.value && columnIndex === board.value.columns.length - 1) return;

			const columnMove: ColumnMove = {
				addedIndex: columnIndex + 1,
				removedIndex: columnIndex,
				columnId,
			};

			await moveColumn(columnMove, true);
		};

		const onReloadBoard = async () => {
			await reloadBoard();
		};

		const onUpdateCardPosition = async (_: unknown, cardMove: CardMove) => {
			if (hasMovePermission) await moveCard(cardMove);
		};

		const onUpdateColumnTitle = async (columnId: string, newTitle: string) => {
			if (hasEditPermission) await updateColumnTitle(columnId, newTitle);
		};

		onMounted(() => {
			if (isTeacher) {
				showInfo(t("components.board.alert.info.teacher"), false);
			}
		});

		const debounceTime = computed(() => {
			return isTouchDetected.value === true ? 300 : 0;
		});

		onUnmounted(() => {
			resetNotifier();
		});

		return {
			board,
			columnDropPlaceholderOptions,
			debounceTime,
			hasMovePermission,
			hasCreateCardPermission,
			hasCreateColumnPermission,
			placeholderOptions,
			isEditMode,
			isDesktop,
			isTouchDetected,
			onCreateCard,
			onCreateColumn,
			onDeleteCard,
			onDropColumn,
			onDeleteColumn,
			onMoveColumnLeft,
			onMoveColumnRight,
			onReloadBoard,
			onUpdateCardPosition,
			onUpdateColumnTitle,
		};
	},
});
</script>

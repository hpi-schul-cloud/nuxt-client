<template>
	<div>
		<template v-if="board">
			<BoardHeader
				:boardId="board.id"
				:title="board.title"
				:titlePlaceholder="t('pages.room.boardCard.label.courseBoard')"
				:isDraft="!board.isVisible"
				@update:visibility="onUpdateBoardVisibility"
				@update:title="onUpdateBoardTitle"
				@copy:board="onCopyBoard"
				@share:board="onShareBoard"
				@delete:board="openDeleteBoardDialog(boardId)"
			/>
			<div class="d-flex flex-row flex-shrink-1">
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
							filter: '.v-card',
							preventOnFilter: false,
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
			<CopyResultModal
				:is-open="isCopyModalOpen"
				:copy-result-items="copyResultModalItems"
				:copy-result-root-item-type="copyResultRootItemType"
				@dialog-closed="onCopyResultModalClosed"
			/>
			<ShareModal :type="ShareTokenBodyParamsParentTypeEnum.ColumnBoard" />
		</template>
	</div>
</template>

<script setup lang="ts">
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import { useCopy } from "@/composables/copy";
import { useLoadingState } from "@/composables/loadingState";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3";
import { CopyParamsTypeEnum } from "@/store/copy";
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";
import {
	COPY_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	ROOM_MODULE_KEY,
	SHARE_MODULE_KEY,
} from "@/utils/inject";
import {
	useBoardPermissions,
	useBoardState,
	useSharedBoardPageInformation,
	useSharedEditMode,
} from "@data-board";
import { ConfirmationDialog } from "@ui-confirmation-dialog";
import { LightBox } from "@ui-light-box";
import { extractDataAttribute, useBoardNotifier } from "@util-board";
import { useDebounceFn } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { computed, onMounted, onUnmounted, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import AddElementDialog from "../shared/AddElementDialog.vue";
import { useBodyScrolling } from "../shared/BodyScrolling.composable";
import BoardColumn from "./BoardColumn.vue";
import BoardColumnGhost from "./BoardColumnGhost.vue";
import BoardHeader from "./BoardHeader.vue";

const props = defineProps({
	boardId: { type: String, required: true },
});

const { t } = useI18n();
const { resetNotifier, showCustomNotifier } = useBoardNotifier();
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
	updateBoardTitle,
	updateBoardVisibility,
	updateColumnTitle,
} = useBoardState(toRef(props, "boardId").value);

const { createPageInformation } = useSharedBoardPageInformation();

watch(board, async () => {
	await createPageInformation(props.boardId);
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

const onUpdateBoardVisibility = async (newVisibility: boolean) => {
	if (!hasEditPermission) return;

	await updateBoardVisibility(newVisibility);
	await setAlert();
};

const onUpdateCardPosition = async (_: unknown, cardMove: CardMove) => {
	if (hasMovePermission) await moveCard(cardMove);
};

const onUpdateColumnTitle = async (columnId: string, newTitle: string) => {
	if (hasEditPermission) await updateColumnTitle(columnId, newTitle);
};

const onUpdateBoardTitle = async (newTitle: string) => {
	if (hasEditPermission) await updateBoardTitle(newTitle);
};

onMounted(() => {
	setAlert();
});

onUnmounted(() => {
	resetNotifier();
});

const setAlert = useDebounceFn(() => {
	if (!isTeacher) return;

	if (!board.value?.isVisible) {
		showCustomNotifier(t("components.board.alert.info.draft"), "info", 10000);
	} else {
		showCustomNotifier(t("components.board.alert.info.teacher"), "info", 10000);
	}
}, 100);

const { isLoadingDialogOpen } = useLoadingState(
	t("components.molecules.copyResult.title.loading")
);

const { copy } = useCopy(isLoadingDialogOpen);

const copyModule = injectStrict(COPY_MODULE_KEY);

const isCopyModalOpen = computed(() => copyModule.getIsResultModalOpen);

const copyResultModalItems = computed(
	() => copyModule.getCopyResultFailedItems
);

const copyResultRootItemType = computed(() => copyModule.getCopyResult?.type);

const onCopyResultModalClosed = () => {
	copyModule.reset();
};

const router = useRouter();

const onCopyBoard = async () => {
	await copy({ id: props.boardId, type: CopyParamsTypeEnum.ColumnBoard });
	const copyId = copyModule.getCopyResult?.id;
	router.push({ name: "rooms-board", params: { id: copyId } });
};

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const shareModule = injectStrict(SHARE_MODULE_KEY);

const onShareBoard = () => {
	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SHARE) {
		shareModule.startShareFlow({
			id: props.boardId,
			type: ShareTokenBodyParamsParentTypeEnum.ColumnBoard,
		});
	}
};

const roomModule = injectStrict(ROOM_MODULE_KEY);
const openDeleteBoardDialog = async (id: string) => {
	await roomModule.deleteBoard(id);

	router.push({ path: "/rooms/" + roomModule.getRoomId });
};
</script>

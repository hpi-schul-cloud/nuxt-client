<template>
	<div>
		<template v-if="board">
			<DefaultWireframe
				ref="main"
				:breadcrumbs="breadcrumbs"
				max-width="full"
				hide-border
			>
				<template #header>
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
				</template>
				<div :class="boardClass" :style="boardStyle">
					<div>
						<Sortable
							:list="board.columns"
							item-key="id"
							:class="boardColumnClass"
							tag="div"
							:options="{
								direction: 'horizontal',
								disabled: isEditMode || !hasMovePermission,
								group: 'columns',
								delay: isTouchDetected ? 300 : 0,
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
							@end="onDropColumn"
						>
							<template #item="{ element, index }">
								<BoardColumn
									:data-column-id="element.id"
									:column="element"
									:index="index"
									:key="element.id"
									:columnCount="board.columns.length"
									:class="{ 'my-0': isListBoard }"
									:isListBoard="isListBoard"
									@reload:board="onReloadBoard"
									@create:card="onCreateCard"
									@delete:card="onDeleteCard"
									@delete:column="onDeleteColumn"
									@update:column-title="onUpdateColumnTitle(element.id, $event)"
									@move:column-down="onMoveColumnForward(index, element.id)"
									@move:column-left="onMoveColumnBackward(index, element.id)"
									@move:column-right="onMoveColumnForward(index, element.id)"
									@move:column-up="onMoveColumnBackward(index, element.id)"
								/>
							</template>
						</Sortable>
					</div>
					<div :class="{ 'mx-auto mt-9 w-100': isListBoard }">
						<BoardColumnGhost
							v-if="hasCreateColumnPermission"
							@create:column="onCreateColumn"
							:isListBoard="isListBoard"
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
					@copy-dialog-closed="onCopyResultModalClosed"
				/>
				<ShareModal :type="ShareTokenBodyParamsParentTypeEnum.ColumnBoard" />
			</DefaultWireframe>
		</template>
	</div>
</template>

<script setup lang="ts">
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useCopy } from "@/composables/copy";
import { useLoadingState } from "@/composables/loadingState";
import {
	BoardLayout,
	ShareTokenBodyParamsParentTypeEnum,
} from "@/serverApi/v3";
import { CopyParamsTypeEnum } from "@/store/copy";
import { ColumnMove } from "@/types/board/DragAndDrop";
import {
	COPY_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	ROOM_MODULE_KEY,
	SHARE_MODULE_KEY,
} from "@/utils/inject";
import {
	useBoardPermissions,
	useBoardStore,
	useCardStore,
	useSharedBoardPageInformation,
	useSharedEditMode,
	useBoardInactivity,
} from "@data-board";
import { ConfirmationDialog } from "@ui-confirmation-dialog";
import { LightBox } from "@ui-light-box";
import { extractDataAttribute, useBoardNotifier } from "@util-board";
import { useTouchDetection } from "@util-device-detection";
import { useDebounceFn } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { computed, onMounted, onUnmounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import AddElementDialog from "../shared/AddElementDialog.vue";
import { useBodyScrolling } from "../shared/BodyScrolling.composable";
import BoardColumn from "./BoardColumn.vue";
import BoardColumnGhost from "./BoardColumnGhost.vue";
import BoardHeader from "./BoardHeader.vue";

const props = defineProps({
	boardId: { type: String, required: true },
	breadcrumbs: { type: Array, default: () => [] },
});

const { t } = useI18n();
const { resetNotifierModule, showCustomNotifier } = useBoardNotifier();
const { editModeId } = useSharedEditMode();
const isEditMode = computed(() => editModeId.value !== undefined);

const boardStore = useBoardStore();
const cardStore = useCardStore();
const board = computed(() => boardStore.board);

const { createPageInformation, roomId } = useSharedBoardPageInformation();

watch(board, async () => {
	await createPageInformation(props.boardId);
});

useBodyScrolling();
const { isTouchDetected } = useTouchDetection();

const {
	hasMovePermission,
	hasCreateCardPermission,
	hasCreateColumnPermission,
	hasDeletePermission,
	hasEditPermission,
	isTeacher,
} = useBoardPermissions();

const onCreateCard = async (columnId: string) => {
	if (hasCreateCardPermission) boardStore.createCardRequest({ columnId });
};

const onCreateColumn = async () => {
	if (hasCreateCardPermission)
		boardStore.createColumnRequest({ boardId: props.boardId });
};

const onDeleteCard = async (cardId: string) => {
	if (hasCreateCardPermission) {
		cardStore.deleteCardRequest({ cardId });
	}
};

const onDeleteColumn = async (columnId: string) => {
	if (hasDeletePermission) boardStore.deleteColumnRequest({ columnId });
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
		boardStore.moveColumnRequest({ columnMove, byKeyboard: false });
	}
};

const onMoveColumnBackward = async (columnIndex: number, columnId: string) => {
	if (!hasMovePermission) return;
	if (columnIndex === 0) return;

	const columnMove: ColumnMove = {
		addedIndex: columnIndex - 1,
		removedIndex: columnIndex,
		columnId,
	};

	boardStore.moveColumnRequest({ columnMove, byKeyboard: true });
};

const onMoveColumnForward = async (columnIndex: number, columnId: string) => {
	if (!hasMovePermission) return;
	if (board.value && columnIndex === board.value.columns.length - 1) return;

	const columnMove: ColumnMove = {
		addedIndex: columnIndex + 1,
		removedIndex: columnIndex,
		columnId,
	};

	boardStore.moveColumnRequest({ columnMove, byKeyboard: true });
};

const onReloadBoard = async () => {
	boardStore.reloadBoard();
};

const onUpdateBoardVisibility = async (isVisible: boolean) => {
	if (!hasEditPermission) return;

	boardStore.updateBoardVisibilityRequest({
		boardId: props.boardId,
		isVisible,
	});
	await setAlert();
};

const onUpdateColumnTitle = async (columnId: string, newTitle: string) => {
	if (hasEditPermission)
		boardStore.updateColumnTitleRequest({ columnId, newTitle });
};

const onUpdateBoardTitle = async (newTitle: string) => {
	if (hasEditPermission)
		boardStore.updateBoardTitleRequest({ boardId: props.boardId, newTitle });
};

onMounted(() => {
	setAlert();
	useBoardInactivity(2000);
	boardStore.fetchBoardRequest({ boardId: props.boardId });
});

onUnmounted(() => {
	boardStore.disconnectSocketRequest({});
	boardStore.setBoard(undefined);
});

onUnmounted(() => {
	resetNotifierModule();
	cardStore.resetState();
});

const setAlert = useDebounceFn(() => {
	if (!isTeacher) return;

	if (!board.value) {
		return;
	}

	if (!board.value.isVisible) {
		showCustomNotifier(t("components.board.alert.info.draft"), "info");
	} else {
		showCustomNotifier(t("components.board.alert.info.teacher"), "info");
	}
}, 150);

watch(() => board.value?.isVisible, setAlert, { immediate: true });

const { isLoadingDialogOpen } = useLoadingState(
	t("components.molecules.copyResult.title.loading")
);

const { copy } = useCopy(isLoadingDialogOpen);

const copyModule = injectStrict(COPY_MODULE_KEY);

const isCopyModalOpen = computed(() => copyModule.getIsResultModalOpen);

const isListBoard = computed(
	() =>
		envConfigModule.getEnv.FEATURE_BOARD_LAYOUT_ENABLED &&
		board.value?.layout === BoardLayout.List
);

const copyResultModalItems = computed(
	() => copyModule.getCopyResultFailedItems
);

const copyResultRootItemType = computed(() => copyModule.getCopyResult?.type);

const boardClass = computed(() => {
	const classes = ["d-flex", "flex-shrink-1"];
	if (isListBoard.value) {
		classes.push("flex-column", "mx-auto", "my-0");
	} else {
		classes.push("flex-row");
	}
	return classes;
});

const boardStyle = computed(() => {
	if (!isListBoard.value) {
		return;
	}
	const style = { maxWidth: "80ch", minWidth: "20rem" };
	return style;
});

const boardColumnClass = computed(() => {
	const classes = ["d-flex", "flex-shrink-1"];
	if (isListBoard.value) {
		classes.push("flex-column");
	} else {
		classes.push("flex-row", "ml-n4");
	}
	return classes;
});

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
	router.push({ path: "/rooms/" + roomId.value });
};
</script>

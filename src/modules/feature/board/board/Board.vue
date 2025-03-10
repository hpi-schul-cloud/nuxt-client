<template>
	<div>
		<template v-if="board">
			<DefaultWireframe
				ref="main"
				:breadcrumbs="breadcrumbs"
				max-width="full"
				hide-border
				main-without-padding-bottom
			>
				<template #header>
					<BoardHeader
						:boardId="board.id"
						:title="board.title"
						:isDraft="!isBoardVisible"
						class="mb-1"
						@update:visibility="onUpdateBoardVisibility"
						@update:title="onUpdateBoardTitle"
						@copy:board="onCopyBoard"
						@share:board="onShareBoard"
						@delete:board="openDeleteBoardDialog(boardId)"
						@change-layout="onUpdateBoardLayout"
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
								delayOnTouchOnly: true,
								delay: 300,
								touchStartThreshold: 3, // needed for sensitive touch devices
								fallbackTolerance: 3, // specifies how far the mouse should move before it's considered a drag
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
									:data-testid="`board-column-${index}`"
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
				<SelectBoardLayoutDialog
					v-model="isSelectBoardLayoutDialogOpen"
					:current-layout="board.layout"
					@select="onSelectBoardLayout"
				/>
			</DefaultWireframe>
		</template>
	</div>
</template>

<script setup lang="ts">
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useApplicationError } from "@/composables/application-error.composable";
import { useCopy } from "@/composables/copy";
import { useLoadingState } from "@/composables/loadingState";
import {
	BoardLayout,
	ShareTokenBodyParamsParentTypeEnum,
	ToolContextType,
} from "@/serverApi/v3";
import { applicationErrorModule } from "@/store";
import { CopyParamsTypeEnum } from "@/store/copy";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { ColumnMove } from "@/types/board/DragAndDrop";
import {
	COPY_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	SHARE_MODULE_KEY,
} from "@/utils/inject";
import {
	useBoardInactivity,
	useBoardPermissions,
	useBoardStore,
	useCardStore,
	useSharedBoardPageInformation,
} from "@data-board";
import { ConfirmationDialog } from "@ui-confirmation-dialog";
import { LightBox } from "@ui-light-box";
import { SelectBoardLayoutDialog } from "@ui-room-details";
import {
	BOARD_IS_LIST_LAYOUT,
	extractDataAttribute,
	useBoardNotifier,
	useSharedEditMode,
} from "@util-board";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import {
	computed,
	onMounted,
	onUnmounted,
	PropType,
	provide,
	ref,
	watch,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import AddElementDialog from "../shared/AddElementDialog.vue";
import { useBodyScrolling } from "../shared/BodyScrolling.composable";
import BoardColumn from "./BoardColumn.vue";
import BoardColumnGhost from "./BoardColumnGhost.vue";
import BoardHeader from "./BoardHeader.vue";

const props = defineProps({
	boardId: { type: String, required: true },
	breadcrumbs: { type: Array as PropType<Breadcrumb[]>, default: () => [] },
});

const { t } = useI18n();
const { resetNotifierModule } = useBoardNotifier();
const { editModeId } = useSharedEditMode();
const isEditMode = computed(() => editModeId.value !== undefined);
const boardStore = useBoardStore();
const cardStore = useCardStore();
const board = computed(() => boardStore.board);
const { createPageInformation, contextType, roomId, resetPageInformation } =
	useSharedBoardPageInformation();
const { createApplicationError } = useApplicationError();

watch(board, async () => {
	await createPageInformation(props.boardId);
});

const route = useRoute();

watch(
	() => route.params.id,
	() => {
		const boardId = Array.isArray(route.params.id)
			? route.params.id[0]
			: route.params.id;
		boardStore.fetchBoardRequest({ boardId });
	},
	{ immediate: true }
);

useBodyScrolling();

const {
	hasMovePermission,
	hasCreateCardPermission,
	hasCreateColumnPermission,
	hasCreateToolPermission,
	hasDeletePermission,
	hasEditPermission,
	isTeacher,
} = useBoardPermissions();

const isBoardVisible = computed(() => board.value?.isVisible);

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
};

const onUpdateColumnTitle = async (columnId: string, newTitle: string) => {
	if (hasEditPermission)
		boardStore.updateColumnTitleRequest({ columnId, newTitle });
};

const onUpdateBoardTitle = async (newTitle: string) => {
	if (hasEditPermission)
		boardStore.updateBoardTitleRequest({ boardId: props.boardId, newTitle });
};

const scrollToNodeAndFocus = (scrollTargetId: string) => {
	const targetElement: HTMLElement | null = document.querySelector(
		`[data-scroll-target="${scrollTargetId}"]`
	);

	if (targetElement) {
		targetElement.scrollIntoView({ block: "center", inline: "center" });
		targetElement.focus();
	}
};

const focusNodeFromHash = () => {
	if (route.hash) {
		const scrollTargetId: string = route.hash.slice(1);
		scrollToNodeAndFocus(scrollTargetId);
	}
};

onMounted(async () => {
	resetPageInformation();
	useBoardInactivity();
	const boardFetchPromise = boardStore.fetchBoardRequest({
		boardId: props.boardId,
	});

	if (hasCreateToolPermission) {
		cardStore.loadPreferredTools(ToolContextType.BoardElement);
	}

	await boardFetchPromise;

	focusNodeFromHash();
});

onUnmounted(() => {
	boardStore.disconnectSocketRequest();
	boardStore.setBoard(undefined);
	cardStore.resetState();
	resetNotifierModule();
});

watch(
	() => route,
	() => focusNodeFromHash(),
	{ deep: true }
);

watch(
	() => isBoardVisible.value,
	() => {
		if (!(isBoardVisible.value || isTeacher)) {
			router.replace({ name: "room-details", params: { id: roomId.value } });
			applicationErrorModule.setError(
				createApplicationError(
					HttpStatusCode.Forbidden,
					t("components.board.error.403")
				)
			);
		}
	}
);

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

provide(BOARD_IS_LIST_LAYOUT, isListBoard);

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
	router.push({ name: "boards-id", params: { id: copyId } });
};

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const shareModule = injectStrict(SHARE_MODULE_KEY);

const onShareBoard = () => {
	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SHARE) {
		shareModule.startShareFlow({
			id: props.boardId,
			type: ShareTokenBodyParamsParentTypeEnum.ColumnBoard,
			destinationType: contextType.value,
		});
	}
};

const openDeleteBoardDialog = async (id: string) => {
	boardStore.deleteBoardRequest({ boardId: id }, roomId.value);
};

const isSelectBoardLayoutDialogOpen = ref(false);

const onUpdateBoardLayout = async () => {
	if (!hasEditPermission) return;

	isSelectBoardLayoutDialogOpen.value = true;
};

const onSelectBoardLayout = async (layout: BoardLayout) => {
	isSelectBoardLayoutDialogOpen.value = false;

	if (!hasEditPermission || board.value?.layout === layout) return;

	boardStore.updateBoardLayoutRequest({
		boardId: props.boardId,
		layout,
	});
};
</script>

<template>
	<div>
		<CardHostInteractionHandler
			:is-edit-mode="isEditMode"
			@start-edit-mode="onStartEditMode"
			@end-edit-mode="onEndEditMode"
			@move:card-keyboard="onMoveCardKeyboard"
		>
			<VCard
				:id="cardId"
				ref="cardHost"
				:height="isLoadingCard ? height : 'auto'"
				class="card-host"
				:style="{
					backgroundColor: cardBackground,
					borderLeft: cardBorderColor ? `3px solid ${cardBorderColor}` : undefined,
				}"
				:class="{ 'drag-disabled': isEditMode }"
				tabindex="0"
				min-height="120px"
				:elevation="cardElevation"
				:ripple="false"
				:hover="isHovered && allowedOperations?.moveCard"
				:data-testid="cardTestId"
				:data-scroll-target="getShareLinkId(cardId, BoardMenuScope.CARD)"
			>
				<template v-if="isLoadingCard">
					<CardSkeleton :height />
				</template>
				<template v-if="card">
					<CardTitle
						:is-edit-mode="isEditMode"
						:value="card.title"
						scope="card"
						:is-focused="isFocusedById"
						class="mx-n4 mb-n2"
						:has-edit-permission="allowedOperations?.updateCardTitle"
						@update:value="onUpdateCardTitle"
						@enter="onEnter"
					/>

					<div class="board-menu" :class="boardMenuClasses">
						<DetailViewButton class="mr-1" @open-detail-view="onOpenDetailView" />
						<BoardMenu v-if="hasMenuItem" :scope="BoardMenuScope.CARD" has-background :data-testid="boardMenuTestId">
							<KebabMenuActionEdit v-if="allowedOperations?.deleteCard && !isEditMode" @click="onStartEditMode" />
							<SvsColorPickerMenu
								v-if="allowedOperations.updateCardColor"
								:color="card.backgroundColor"
								@update:color="onUpdateColor"
							/>
							<KebabMenuActionDuplicate
								v-if="allowedOperations?.copyCard"
								data-testid="kebab-menu-action-duplicate-card"
								@click="duplicateCard"
							/>
							<KebabMenuActionExport v-if="allowedOperations?.moveCard" @click="onMoveCard(cardId)" />
							<KebabMenuActionShare v-if="allowedOperations?.shareCard" @click="onShareCard" />
							<KebabMenuActionShareLink :scope="BoardMenuScope.CARD" @click="onCopyShareLink" />
							<KebabMenuActionDelete
								v-if="allowedOperations?.deleteCard"
								:name="card.title"
								:scope="BoardMenuScope.CARD"
								@click="onDeleteCard"
							/>
						</BoardMenu>
					</div>

					<div :class="{ 'mt-n2': hasCardTitle }">
						<ContentElementList
							:elements="card.elements"
							:is-edit-mode="isEditMode"
							:is-detail-view="isDetailView"
							:row-index="rowIndex"
							:column-index="columnIndex"
							@delete:element="onDeleteElement"
							@move-down:element="onMoveContentElementDown"
							@move-up:element="onMoveContentElementUp"
							@move-keyboard:element="onMoveContentElementKeyboard"
						/>
						<CardAddElementMenu v-if="isEditMode" @add-element="onAddElement" />
					</div>
				</template>
			</VCard>
		</CardHostInteractionHandler>
		<VCard v-if="isDuplicating" class="mt-3">
			<CardSkeleton :height />
		</VCard>

		<!-- Detail View -->
		<CardHostDetailView
			v-if="card"
			:card="card"
			:is-open="isDetailView"
			:row-index="rowIndex"
			:column-index="columnIndex"
			@delete:element="onDeleteElement"
			@move-down:element="onMoveContentElementDown"
			@move-up:element="onMoveContentElementUp"
			@move-keyboard:element="onMoveContentElementKeyboard"
			@add:element="onAddElement"
			@enter:title="onEnter"
			@update:title="onUpdateCardTitle"
			@close:detail-view="onCloseDetailView"
		/>
	</div>
</template>

<script setup lang="ts">
import { useAddElementDialog } from "../shared/AddElementDialog.composable";
import CardAddElementMenu from "./CardAddElementMenu.vue";
import CardHostDetailView from "./CardHostDetailView.vue";
import CardHostInteractionHandler from "./CardHostInteractionHandler.vue";
import CardSkeleton from "./CardSkeleton.vue";
import CardTitle from "./CardTitle.vue";
import ContentElementList from "./ContentElementList.vue";
import { useSafeTaskRunner } from "@/composables/async-tasks.composable";
import { ElementMove, verticalCursorKeys } from "@/types/board/DragAndDrop";
import { colorToHexLighten3, colorToHexLighten5 } from "@/utils/color.utils";
import { askDeletionForType } from "@/utils/confirmation-dialog.utils";
import { delay } from "@/utils/helpers";
import { Colors } from "@api-server";
import {
	useBoardAllowedOperations,
	useBoardFocusHandler,
	useBoardStore,
	useCardStore,
	useCourseBoardEditMode,
} from "@data-board";
import { BoardMenu, BoardMenuScope, DetailViewButton } from "@ui-board";
import { SvsColorPickerMenu } from "@ui-controls";
import {
	KebabMenuActionDelete,
	KebabMenuActionDuplicate,
	KebabMenuActionEdit,
	KebabMenuActionExport,
	KebabMenuActionShare,
	KebabMenuActionShareLink,
} from "@ui-kebab-menu";
import { useShareBoardLink } from "@util-board";
import { useDebounceFn, useElementHover, useElementSize } from "@vueuse/core";
import { computed, onMounted, ref, toRef } from "vue";
import { useRouter } from "vue-router";

type Props = {
	height: number;
	cardId: string;
	rowIndex: number;
	columnIndex: number;
	detailViewCardId?: string;
};

const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "move:card-keyboard", keycode: string): void;
	(e: "delete:card", cardId: string): void;
	(e: "move:card", cardId: string): void;
	(e: "reload:board"): void;
	(e: "share:card", cardId: string): void;
}>();

const { allowedOperations } = useBoardAllowedOperations();
const cardHost = ref(null);
const cardId = toRef(props, "cardId");
const { isFocusContained, isFocusedById } = useBoardFocusHandler(cardId.value, cardHost);
const { isEditMode, startEditMode, stopEditMode } = useCourseBoardEditMode(cardId.value);

const isHovered = useElementHover(cardHost);
const isDetailView = computed(() => props.detailViewCardId === props.cardId);

const cardStore = useCardStore();
const router = useRouter();
const boardStore = useBoardStore();

const card = computed(() => cardStore.getCard(cardId.value));
const isLoadingCard = computed(() => card.value === undefined);

const hasCardTitle = computed(() => card.value?.title);

const boardMenuTestId = computed(() => `card-menu-btn-${props.columnIndex}-${props.rowIndex}`);
const cardTestId = computed(() => `board-card-${props.columnIndex}-${props.rowIndex}`);

const { height: cardHostHeight } = useElementSize(cardHost);
const cardElevation = computed(() => {
	if (isEditMode.value) {
		return 6;
	}
	if (isHovered.value && allowedOperations.value.moveCard) {
		return 4;
	}
	return 2;
});

const cardBackground = computed(() => colorToHexLighten5(card.value?.backgroundColor ?? Colors.TRANSPARENT));
const cardBorderColor = computed(() => {
	const color = card.value?.backgroundColor;
	if (!color || color === Colors.TRANSPARENT) return undefined;
	return colorToHexLighten3(color);
});

const { askType } = useAddElementDialog(cardStore.createElementRequest, cardId.value);

const hasMenuItem = computed(() =>
	Object.keys(allowedOperations.value || {}).some((key) =>
		["copyCard", "deleteCard", "moveCard", "shareBoard", "shareCard", "updateCardTitle"].includes(key)
	)
);

const onMoveCardKeyboard = (event: KeyboardEvent) => emit("move:card-keyboard", event.code);
const onMoveCard = (cardId: string) => emit("move:card", cardId);
const onShareCard = () => {
	emit("share:card", props.cardId);
};

const _updateCardTitle = (newTitle: string) => {
	cardStore.updateCardTitleRequest({ newTitle, cardId: props.cardId });
};
const _debouncedUpdateCardTitle = useDebounceFn(_updateCardTitle, 600);
const onUpdateCardTitle = (newTitle: string) => _debouncedUpdateCardTitle(newTitle);

const onDeleteCard = async () => {
	stopEditMode();
	const shouldDelete = await askDeletionForType("components.boardCard");
	if (shouldDelete && card.value?.id) {
		emit("delete:card", card.value.id);
	}
};

const onAddElement = () => askType();

const onDeleteElement = (elementId: string) => cardStore.deleteElementRequest({ cardId: cardId.value, elementId });

const onStartEditMode = () => startEditMode();

const onEndEditMode = async () => {
	stopEditMode();
	await delay(300);
	cardStore.updateCardHeightRequest({
		cardId: cardId.value,
		newHeight: Math.round(cardHostHeight.value),
	});
};

const onMoveContentElementDown = async ({ payload: elementId, elementIndex }: ElementMove) =>
	await cardStore.moveElementRequest(props.cardId, elementId, elementIndex, +1);

const onMoveContentElementUp = async ({ payload: elementId, elementIndex }: ElementMove) =>
	await cardStore.moveElementRequest(props.cardId, elementId, elementIndex, -1);

const onMoveContentElementKeyboard = async ({ payload: elementId, elementIndex }: ElementMove, key: string) => {
	if (!verticalCursorKeys.includes(key)) return;

	const delta = key === "ArrowUp" ? -1 : 1;

	await cardStore.moveElementRequest(props.cardId, elementId, elementIndex, delta);
};

const onEnter = () => {
	cardStore.addTextAfterTitle(props.cardId);
};

const { copyShareLink, getShareLinkId } = useShareBoardLink();

const onCopyShareLink = async () => {
	await copyShareLink(props.cardId, BoardMenuScope.CARD);
};

const boardMenuClasses = computed(() => {
	if (isFocusContained.value === true || isHovered.value === true) {
		return "";
	}
	return "hidden";
});

const { run: duplicateCard, isRunning: isDuplicating } = useSafeTaskRunner(async () => {
	await cardStore.duplicateCard({ cardId: props.cardId });
});

const onCloseDetailView = () => {
	const boardId = boardStore.board?.id;
	if (boardId) {
		router.replace(`/boards/${boardId}`);
	}
};

const onOpenDetailView = () => {
	const boardId = boardStore.board?.id;
	if (boardId) {
		router.push(`/boards/${boardId}/cards/${props.cardId}`);
	}
};

onMounted(async () => {
	if (card.value === undefined) {
		await cardStore.fetchCardRequest({ cardIds: [cardId.value] });
	}
});

const onUpdateColor = (backgroundColor: Colors) => {
	cardStore.updateCardColorRequest({ cardId: props.cardId, backgroundColor });
};
</script>

<style scoped>
.board-menu {
	position: absolute;
	top: 0.25rem;
	right: 0.25rem;
	z-index: 1;
}
.hidden {
	transition: opacity 200ms;
	opacity: 0;
}
.card-host {
	background: white;
}
</style>

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
				:class="{ 'drag-disabled': isEditMode }"
				tabindex="0"
				min-height="120px"
				:elevation="isEditMode ? 6 : isHovered ? 4 : 2"
				:ripple="false"
				:hover="isHovered"
				:data-testid="cardTestId"
				:data-scroll-target="getShareLinkId(cardId, BoardMenuScope.CARD)"
			>
				<template v-if="isLoadingCard">
					<CardSkeleton :height="height" />
				</template>
				<template v-if="card">
					<CardTitle
						:is-edit-mode="isEditMode"
						:value="card.title"
						scope="card"
						:is-focused="isFocusedById"
						class="mx-n4 mb-n2"
						@update:value="onUpdateCardTitle($event, cardId)"
						@enter="onEnter"
					/>

					<div class="board-menu" :class="boardMenuClasses">
						<BoardMenu
							v-if="hasEditPermission"
							:scope="BoardMenuScope.CARD"
							has-background
							:data-testid="boardMenuTestId"
						>
							<KebabMenuActionEdit v-if="hasDeletePermission && !isEditMode" @click="onStartEditMode" />
							<KebabMenuActionCopy
								v-if="hasEditPermission"
								data-testid="kebab-menu-action-duplicate-card"
								@click="duplicateCard"
							/>
							<KebabMenuActionShareLink :scope="BoardMenuScope.CARD" @click="onCopyShareLink" />
							<KebabMenuActionDelete
								v-if="hasDeletePermission"
								:name="card.title"
								:scope="BoardMenuScope.CARD"
								scope-language-key="components.boardCard"
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
			@delete:card="onDeleteCard"
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
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import BoardMenu from "@/modules/ui/board/BoardMenu.vue"; // FIX_CIRCULAR_DEPENDENCY
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCourseBoardEditMode } from "@/modules/util/board/editMode.composable"; // FIX_CIRCULAR_DEPENDENCY
import { ElementMove, verticalCursorKeys } from "@/types/board/DragAndDrop";
import { delay } from "@/utils/helpers";
import { useBoardFocusHandler, useBoardPermissions, useCardStore } from "@data-board";
import { BoardMenuScope } from "@ui-board";
import {
	KebabMenuActionCopy,
	KebabMenuActionDelete,
	KebabMenuActionEdit,
	KebabMenuActionShareLink,
} from "@ui-kebab-menu";
import { useShareBoardLink } from "@util-board";
import { useDebounceFn, useElementHover, useElementSize } from "@vueuse/core";
import { computed, onMounted, ref, toRef } from "vue";

type Props = {
	height: number;
	cardId: string;
	rowIndex: number;
	columnIndex: number;
};

const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "move:card-keyboard", keycode: string): void;
	(e: "delete:card", cardId: string): void;
	(e: "reload:board"): void;
}>();

const cardHost = ref(null);
const cardId = toRef(props, "cardId");
const { isFocusContained, isFocusedById } = useBoardFocusHandler(cardId.value, cardHost);

const isHovered = useElementHover(cardHost);
const isDetailView = ref(false);

const cardStore = useCardStore();

const card = computed(() => cardStore.getCard(cardId.value));
const isLoadingCard = computed(() => card.value === undefined);

const hasCardTitle = computed(() => card.value?.title);

const boardMenuTestId = computed(() => `card-menu-btn-${props.columnIndex}-${props.rowIndex}`);
const cardTestId = computed(() => `board-card-${props.columnIndex}-${props.rowIndex}`);

const { height: cardHostHeight } = useElementSize(cardHost);
const { isEditMode, startEditMode, stopEditMode } = useCourseBoardEditMode(cardId.value);
const { hasEditPermission, hasDeletePermission } = useBoardPermissions();

const { askType } = useAddElementDialog(cardStore.createElementRequest, cardId.value);

const onMoveCardKeyboard = (event: KeyboardEvent) => emit("move:card-keyboard", event.code);

const _updateCardTitle = (newTitle: string, cardId: string) => {
	cardStore.updateCardTitleRequest({ newTitle, cardId });
};

const onUpdateCardTitle = useDebounceFn(_updateCardTitle, 600);

const onDeleteCard = async (confirmation: Promise<boolean>) => {
	stopEditMode();
	const shouldDelete = await confirmation;
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

const onCloseDetailView = () => (isDetailView.value = false);

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

const duplicateCard = async () => {
	if (!card.value) return;

	await cardStore.duplicateCardRequest({ cardId: card.value.id });
	emit("reload:board");
};

onMounted(async () => {
	if (card.value === undefined) {
		await cardStore.fetchCardRequest({ cardIds: [cardId.value] });
	}
});
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

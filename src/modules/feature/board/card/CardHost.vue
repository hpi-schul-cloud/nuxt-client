<template>
	<div>
		<CardHostInteractionHandler
			:is-edit-mode="isEditMode"
			@start-edit-mode="onStartEditMode"
			@end-edit-mode="onEndEditMode"
			@move:card-keyboard="onMoveCardKeyboard"
		>
			<VCard
				ref="cardHost"
				:height="isLoadingCard ? height : 'auto'"
				class="card-host"
				:class="{ 'drag-disabled': isEditMode }"
				variant="outlined"
				tabindex="0"
				min-height="120px"
				:elevation="isEditMode ? 6 : isHovered ? 4 : 2"
				:id="cardId"
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
						@update:value="onUpdateCardTitle($event, cardId)"
						:is-focused="isFocusedById"
						@enter="onEnter"
						class="mx-n4 mb-n2"
					/>

					<div class="board-menu" :class="boardMenuClasses">
						<BoardMenu
							v-if="hasEditPermission"
							:scope="BoardMenuScope.CARD"
							has-background
							:data-testid="boardMenuTestId"
						>
							<KebabMenuActionEdit
								v-if="hasDeletePermission && !isEditMode"
								@click="onStartEditMode"
							/>
							<KebabMenuActionShareLink
								:scope="BoardMenuScope.CARD"
								@click="onCopyShareLink"
							/>
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
						<CardAddElementMenu @add-element="onAddElement" v-if="isEditMode" />
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

<script lang="ts">
import { ElementMove, verticalCursorKeys } from "@/types/board/DragAndDrop";
import { delay } from "@/utils/helpers";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useCardStore,
} from "@data-board";
import { mdiArrowExpand } from "@icons/material";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionEdit,
	KebabMenuActionShareLink,
} from "@ui-kebab-menu";
import { useCourseBoardEditMode, useShareBoardLink } from "@util-board";
import { useDebounceFn, useElementHover, useElementSize } from "@vueuse/core";
import { computed, defineComponent, onMounted, ref, toRef } from "vue";
import { useAddElementDialog } from "../shared/AddElementDialog.composable";
import CardAddElementMenu from "./CardAddElementMenu.vue";
import CardHostDetailView from "./CardHostDetailView.vue";
import CardHostInteractionHandler from "./CardHostInteractionHandler.vue";

import CardSkeleton from "./CardSkeleton.vue";
import CardTitle from "./CardTitle.vue";
import ContentElementList from "./ContentElementList.vue";

export default defineComponent({
	name: "CardHost",
	computed: {
		BoardMenuScope() {
			return BoardMenuScope;
		},
	},
	components: {
		CardSkeleton,
		CardTitle,
		BoardMenu,
		KebabMenuActionEdit,
		ContentElementList,
		CardAddElementMenu,
		CardHostInteractionHandler,
		KebabMenuActionDelete,
		CardHostDetailView,
		KebabMenuActionShareLink,
	},
	props: {
		height: { type: Number, required: true },
		cardId: { type: String, required: true },
		rowIndex: { type: Number, required: true },
		columnIndex: { type: Number, required: true },
	},
	emits: ["move:card-keyboard", "delete:card", "reload:board"],
	setup(props, { emit }) {
		const cardHost = ref(null);
		const cardId = toRef(props, "cardId");
		const { isFocusContained, isFocusedById } = useBoardFocusHandler(
			cardId.value,
			cardHost
		);

		const isHovered = useElementHover(cardHost);
		const isDetailView = ref(false);

		const cardStore = useCardStore();

		const card = computed(() => cardStore.getCard(cardId.value));
		const isLoadingCard = computed(() => card.value === undefined);

		const hasCardTitle = computed(() => card.value?.title);

		const boardMenuTestId = computed(
			() => `card-menu-btn-${props.columnIndex}-${props.rowIndex}`
		);
		const cardTestId = computed(
			() => `board-card-${props.columnIndex}-${props.rowIndex}`
		);

		const { height: cardHostHeight } = useElementSize(cardHost);
		const { isEditMode, startEditMode, stopEditMode } = useCourseBoardEditMode(
			cardId.value
		);
		const { hasEditPermission, hasDeletePermission } = useBoardPermissions();

		const { askType } = useAddElementDialog(
			cardStore.createElementRequest,
			cardId.value
		);

		const onMoveCardKeyboard = (event: KeyboardEvent) =>
			emit("move:card-keyboard", event.code);

		const _updateCardTitle = (newTitle: string, cardId: string) => {
			cardStore.updateCardTitleRequest({ newTitle, cardId });
		};

		const onUpdateCardTitle = useDebounceFn(_updateCardTitle, 600);

		const onDeleteCard = async (confirmation: Promise<boolean>) => {
			stopEditMode();
			const shouldDelete = await confirmation;
			if (shouldDelete) {
				emit("delete:card", card.value?.id);
			}
		};

		const onAddElement = () => askType();

		const onDeleteElement = (elementId: string) =>
			cardStore.deleteElementRequest({ cardId: cardId.value, elementId });

		const onStartEditMode = () => startEditMode();

		const onEndEditMode = async () => {
			stopEditMode();
			await delay(300);
			cardStore.updateCardHeightRequest({
				cardId: cardId.value,
				newHeight: Math.round(cardHostHeight.value),
			});
		};

		const onOpenDetailView = () => (isDetailView.value = true);
		const onCloseDetailView = () => (isDetailView.value = false);

		const onMoveContentElementDown = async ({
			payload: elementId,
			elementIndex,
		}: ElementMove) =>
			cardStore.moveElementRequest(props.cardId, elementId, elementIndex, +1);

		const onMoveContentElementUp = async ({
			payload: elementId,
			elementIndex,
		}: ElementMove) =>
			cardStore.moveElementRequest(props.cardId, elementId, elementIndex, -1);

		const onMoveContentElementKeyboard = async (
			{ payload: elementId, elementIndex }: ElementMove,
			key: string
		) => {
			if (!verticalCursorKeys.includes(key)) return;

			const delta = key === "ArrowUp" ? -1 : 1;

			await cardStore.moveElementRequest(
				props.cardId,
				elementId,
				elementIndex,
				delta
			);
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

		onMounted(async () => {
			if (card.value === undefined) {
				await cardStore.fetchCardRequest({ cardIds: [cardId.value] });
			}
		});

		return {
			boardMenuClasses,
			card,
			hasEditPermission,
			hasDeletePermission,
			hasCardTitle,
			isLoadingCard,
			isHovered,
			isFocusedById,
			boardMenuTestId,
			cardTestId,
			onMoveCardKeyboard,
			onUpdateCardTitle,
			onDeleteCard,
			onAddElement,
			onDeleteElement,
			onStartEditMode,
			onEndEditMode,
			onMoveContentElementDown,
			onMoveContentElementUp,
			onMoveContentElementKeyboard,
			cardHost,
			isEditMode,
			onEnter,
			onOpenDetailView,
			onCloseDetailView,
			onCopyShareLink,
			getShareLinkId,
			isDetailView,
			mdiArrowExpand,
		};
	},
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

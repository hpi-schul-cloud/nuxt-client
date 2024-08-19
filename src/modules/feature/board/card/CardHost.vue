<template>
	<div>
		<CardHostInteractionHandler
			:isEditMode="isEditMode"
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
			>
				<template v-if="isLoadingCard">
					<CardSkeleton :height="height" />
				</template>
				<template v-if="card">
					<CardTitle
						:isEditMode="isEditMode"
						:value="card.title"
						scope="card"
						@update:value="onUpdateCardTitle($event, cardId)"
						:isFocused="isFocusedById"
						@enter="onEnter"
					/>

					<div class="board-menu" :class="boardMenuClasses">
						<BoardMenu
							v-if="hasDeletePermission"
							scope="card"
							data-testid="card-menu-btn"
						>
							<BoardMenuActionEdit
								v-if="!isEditMode"
								@click="onStartEditMode"
							/>
							<BoardMenuActionDelete
								data-test-id="board-menu-action-delete"
								:name="card.title"
								@click="onDeleteCard"
							/>
						</BoardMenu>
					</div>

					<div :class="{ 'mt-n2': hasCardTitle }">
						<ContentElementList
							:elements="card.elements"
							:isEditMode="isEditMode"
							:isDetailView="isDetailView"
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
			:isOpen="isDetailView"
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
import {
	DragAndDropKey,
	ElementMove,
	verticalCursorKeys,
} from "@/types/board/DragAndDrop";
import { delay } from "@/utils/helpers";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useCardStore,
	useEditMode,
} from "@data-board";
import { mdiArrowExpand } from "@mdi/js";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionEdit,
} from "@ui-board";
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
	components: {
		CardSkeleton,
		CardTitle,
		BoardMenu,
		BoardMenuActionEdit,
		ContentElementList,
		CardAddElementMenu,
		CardHostInteractionHandler,
		BoardMenuActionDelete,
		CardHostDetailView,
	},
	props: {
		height: { type: Number, required: true },
		cardId: { type: String, required: true },
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

		const { height: cardHostHeight } = useElementSize(cardHost);
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(
			cardId.value
		);
		const { hasDeletePermission } = useBoardPermissions();

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
			keyString: DragAndDropKey
		) => {
			if (!verticalCursorKeys.includes(keyString)) return;

			const delta = keyString === "ArrowUp" ? -1 : 1;

			cardStore.moveElementRequest(
				props.cardId,
				elementId,
				elementIndex,
				delta
			);
		};

		const onEnter = () => {
			cardStore.addTextAfterTitle(props.cardId);
		};

		const boardMenuClasses = computed(() => {
			if (isFocusContained.value === true || isHovered.value === true) {
				return "";
			}
			return "hidden";
		});

		onMounted(async () => {
			await cardStore.fetchCardRequest({ cardIds: [cardId.value] });
		});

		return {
			boardMenuClasses,
			card,
			hasDeletePermission,
			hasCardTitle,
			isLoadingCard,
			isHovered,
			isFocusedById,
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

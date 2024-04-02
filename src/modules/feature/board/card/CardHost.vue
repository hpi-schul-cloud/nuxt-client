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
				:height="isLoading ? height : 'auto'"
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
				<template v-if="isLoading">
					<CardSkeleton :height="height" />
				</template>
				<template v-if="!isLoading && card">
					<CardTitle
						:isEditMode="isEditMode"
						:value="card.title"
						scope="card"
						@update:value="onUpdateCardTitle"
						:isFocused="isFocusedById"
						@enter="addTextAfterTitle"
					/>

					<div class="board-menu" :class="boardMenuClasses">
						<BoardMenu v-if="hasDeletePermission" scope="card">
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
			@enter:title="addTextAfterTitle"
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
	useCardState,
	useEditMode,
} from "@data-board";
import { mdiArrowExpand } from "@mdi/js";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionEdit,
} from "@ui-board";
import { useDebounceFn, useElementHover, useElementSize } from "@vueuse/core";
import { computed, defineComponent, ref, toRef } from "vue";
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
		const {
			isLoading,
			card,
			updateTitle,
			updateCardHeight,
			addElement,
			moveElementDown,
			moveElementUp,
			deleteElement,
			addTextAfterTitle,
		} = useCardState(cardId.value, emit);

		const { height: cardHostHeight } = useElementSize(cardHost);
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(
			cardId.value
		);
		const { hasDeletePermission } = useBoardPermissions();

		const { askType } = useAddElementDialog(addElement);

		const onMoveCardKeyboard = (event: KeyboardEvent) =>
			emit("move:card-keyboard", event.code);

		const onUpdateCardTitle = useDebounceFn(updateTitle, 300);

		const onDeleteCard = async (confirmation: Promise<boolean>) => {
			stopEditMode();
			const shouldDelete = await confirmation;
			if (shouldDelete) {
				emit("delete:card", card.value?.id);
			}
		};

		const onAddElement = () => askType();

		const onDeleteElement = (elementId: string) => deleteElement(elementId);

		const onStartEditMode = () => startEditMode();

		const onEndEditMode = async () => {
			stopEditMode();
			await delay(300);
			updateCardHeight(cardHostHeight.value);
		};

		const onOpenDetailView = () => (isDetailView.value = true);
		const onCloseDetailView = () => (isDetailView.value = false);

		const onMoveContentElementDown = async (payload: ElementMove) =>
			await moveElementDown(payload);

		const onMoveContentElementUp = async (payload: ElementMove) =>
			await moveElementUp(payload);

		const onMoveContentElementKeyboard = async (
			payload: ElementMove,
			keyString: DragAndDropKey
		) => {
			if (!verticalCursorKeys.includes(keyString)) {
				return;
			}
			if (keyString === "ArrowUp") {
				await moveElementUp(payload);
			} else if (keyString === "ArrowDown") {
				await moveElementDown(payload);
			}
		};

		const boardMenuClasses = computed(() => {
			if (isFocusContained.value === true || isHovered.value === true) {
				return "";
			}
			return "hidden";
		});

		return {
			boardMenuClasses,
			isLoading,
			card,
			hasDeletePermission,
			isHovered,
			isFocusedById,
			onMoveCardKeyboard,
			onUpdateCardTitle,
			onDeleteCard,
			onAddElement,
			onDeleteElement,
			deleteElement,
			onStartEditMode,
			onEndEditMode,
			onMoveContentElementDown,
			onMoveContentElementUp,
			onMoveContentElementKeyboard,
			cardHost,
			isEditMode,
			addTextAfterTitle,
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

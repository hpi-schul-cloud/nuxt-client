<template>
	<CardHostInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
		@move:card-keyboard="onMoveCardKeyboard"
	>
		<VCard
			ref="cardHost"
			:height="isLoading ? height : 'auto'"
			:class="{ 'drag-disabled': isEditMode }"
			outlined
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
				>
				</CardTitle>

				<div class="board-menu" :class="boardMenuClasses">
					<BoardMenu v-if="hasDeletePermission" scope="card">
						<BoardMenuAction v-if="!isEditMode" @click="onStartEditMode">
							<template #icon>
								<VIcon>
									{{ mdiPencilOutline }}
								</VIcon>
							</template>
							{{ $t("common.actions.edit") }}
						</BoardMenuAction>
						<BoardMenuAction
							@click="onDeleteCard"
							data-test-id="board-menu-action-delete"
						>
							<template #icon>
								<VIcon>
									{{ mdiTrashCanOutline }}
								</VIcon>
							</template>
							{{ $t("components.board.action.delete") }}
						</BoardMenuAction>
					</BoardMenu>
				</div>

				<ContentElementList
					:card-id="cardId"
					:elements="card.elements"
					:isEditMode="isEditMode"
					@delete:element="onDeleteElement"
					@move-down:element="onMoveContentElementDown"
					@move-up:element="onMoveContentElementUp"
					@move-keyboard:element="onMoveContentElementKeyboard"
				></ContentElementList>
				<CardAddElementMenu
					@add-element="onAddElement"
					v-if="isEditMode"
				></CardAddElementMenu>
			</template>
		</VCard>
	</CardHostInteractionHandler>
</template>

<script lang="ts">
import {
	DragAndDropKey,
	ElementMove,
	verticalCursorKeys,
} from "@/types/board/DragAndDrop";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useCardState,
	useEditMode,
} from "@data-board";
import { useSharedExternalToolElementDisplayState } from "@data-board-external-tool-element";
import { mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import { BoardMenu, BoardMenuAction } from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import {
	useDebounceFn,
	useElementHover,
	useElementSize,
	watchDebounced,
} from "@vueuse/core";
import { computed, defineComponent, onMounted, ref, toRef } from "vue";
import { useAddElementDialog } from "../shared/AddElementDialog.composable";
import CardAddElementMenu from "./CardAddElementMenu.vue";
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
		BoardMenuAction,
		ContentElementList,
		CardAddElementMenu,
		CardHostInteractionHandler,
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
		const { askDeleteConfirmation } = useDeleteConfirmationDialog();

		const { askType } = useAddElementDialog(addElement);

		const onMoveCardKeyboard = (event: KeyboardEvent) => {
			emit("move:card-keyboard", event.code);
		};
		const onUpdateCardTitle = useDebounceFn(updateTitle, 300);

		const onDeleteCard = async () => {
			const shouldDelete = await askDeleteConfirmation(
				card.value?.title,
				"boardCard"
			);

			if (shouldDelete) {
				emit("delete:card", card.value?.id);
			}
		};

		const onAddElement = () => {
			askType();
		};

		const onDeleteElement = (elementId: string) => {
			deleteElement(elementId);
		};

		const onStartEditMode = () => {
			startEditMode();
		};

		const onEndEditMode = () => {
			stopEditMode();
		};

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

		watchDebounced(
			cardHostHeight,
			(newHeight: number) => updateCardHeight(newHeight),
			{
				debounce: 500,
				maxWait: 2000,
			}
		);

		onMounted(async () => {
			const { fetchDisplayData } = useSharedExternalToolElementDisplayState();

			await fetchDisplayData(props.cardId);
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
			mdiTrashCanOutline,
			mdiPencilOutline,
			addTextAfterTitle,
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
</style>

<style>
.v-card:focus::before {
	opacity: 0;
}

.v-card:focus {
	outline: 2px solid var(--v-secondary-lighten1);
	outline-offset: 0;
}
</style>
@data-board"; @data-board"; @data-board";

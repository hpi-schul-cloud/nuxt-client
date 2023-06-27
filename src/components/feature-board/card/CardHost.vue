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
			class="transition-swing"
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
					@enter="addTextElement"
				>
				</CardTitle>

				<div class="board-menu" :class="boardMenuClasses">
					<BoardMenu v-if="hasDeletePermission" scope="card">
						<BoardMenuAction @click="onDeleteCard">
							<VIcon>
								{{ mdiTrashCanOutline }}
							</VIcon>
							{{ $t("components.board.action.delete") }}
						</BoardMenuAction>
					</BoardMenu>
				</div>

				<ContentElementList
					:elements="card.elements"
					:isEditMode="isEditMode"
					:deleteElement="deleteElement"
				></ContentElementList>
				<CardAddElementMenu
					@add-element="onAddElement"
					v-if="isEditMode"
				></CardAddElementMenu>
			</template>
		</VCard>
		<FilePicker
			@update:file="onFileSelect"
			:isFilePickerOpen.sync="isFilePickerOpen"
		/>
	</CardHostInteractionHandler>
</template>

<script lang="ts">
import { mdiTrashCanOutline } from "@mdi/js";
import {
	useDebounceFn,
	useElementHover,
	useElementSize,
	watchDebounced,
} from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import ContentElementList from "../content-elements/ContentElementList.vue";
import { useBoardFocusHandler } from "../shared/BoardFocusHandler.composable";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";
import { useDeleteBoardNodeConfirmation } from "../shared/DeleteBoardNodeConfirmation.composable";
import { useEditMode } from "../shared/EditMode.composable";
import { useElementTypeSelection } from "../shared/ElementTypeSelection.composable";
import FilePicker from "../shared/FilePicker.vue";
import { useCardState } from "../state/CardState.composable";
import CardAddElementMenu from "./CardAddElementMenu.vue";
import CardHostInteractionHandler from "./CardHostInteractionHandler.vue";
import CardSkeleton from "./CardSkeleton.vue";
import CardTitle from "./CardTitle.vue";

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
		FilePicker,
	},
	props: {
		height: { type: Number, required: true },
		cardId: { type: String, required: true },
	},
	emits: ["move:card-keyboard", "delete:card"],
	setup(props, { emit }) {
		const cardHost = ref(undefined);
		const { isFocusContained } = useBoardFocusHandler(props.cardId, cardHost);
		const isHovered = useElementHover(cardHost);
		const {
			isLoading,
			card,
			updateTitle,
			updateCardHeight,
			addElement,
			deleteElement,
			addTextElement,
		} = useCardState(props.cardId);
		const { height: cardHostHeight } = useElementSize(cardHost);
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(
			props.cardId
		);
		const { hasDeletePermission } = useBoardPermissions();
		const { askDeleteBoardNodeConfirmation, isDeleteDialogOpen } =
			useDeleteBoardNodeConfirmation();

		const { askType, onFileSelect, isFilePickerOpen, isDialogOpen } =
			useElementTypeSelection(addElement);

		const onMoveCardKeyboard = (event: KeyboardEvent) => {
			emit("move:card-keyboard", event.code);
		};
		const onUpdateCardTitle = useDebounceFn(updateTitle, 1000);

		const onDeleteCard = async () => {
			const shouldDelete = await askDeleteBoardNodeConfirmation(
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

		const onStartEditMode = () => {
			startEditMode();
		};

		const onEndEditMode = () => {
			if (!isDialogOpen.value && !isDeleteDialogOpen.value) {
				stopEditMode();
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
			{ debounce: 500, maxWait: 2000 }
		);

		return {
			boardMenuClasses,
			isLoading,
			card,
			hasDeletePermission,
			isHovered,
			onMoveCardKeyboard,
			onUpdateCardTitle,
			onDeleteCard,
			onAddElement,
			deleteElement,
			onStartEditMode,
			onEndEditMode,
			cardHost,
			isEditMode,
			mdiTrashCanOutline,
			onFileSelect,
			isFilePickerOpen,
			addTextElement,
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

.v-card:focus,
.v-card:focus-within {
	outline: 2px solid var(--v-secondary-base);
	outline-offset: 0;
}
</style>

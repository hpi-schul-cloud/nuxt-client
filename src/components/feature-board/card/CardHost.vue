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
						@delete:element="onDeleteElement"
					></ContentElementList>
					<CardAddElementMenu
						@add-element="onAddElement"
						v-if="isEditMode"
					></CardAddElementMenu>
				</template>
			</VCard>
		</CardHostInteractionHandler>
		<FilePicker
			@update:file="onFileSelect"
			:isFilePickerOpen="isFilePickerOpen"
			@update:isFilePickerOpen="() => (isFilePickerOpen = false)"
		/>
	</div>
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
		} = useCardState(props.cardId);
		const { height: cardHostHeight } = useElementSize(cardHost);
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(
			props.cardId
		);
		const { hasDeletePermission } = useBoardPermissions();
		const { onDeleteElement, askDeleteBoardNodeConfirmation } =
			useDeleteBoardNodeConfirmation(deleteElement);

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

		const { askType, createFileElement, isFilePickerOpen } =
			useElementTypeSelection(addElement);

		const onAddElement = () => {
			askType();
		};

		const onFileSelect = async (file: File) => {
			await createFileElement(file);
		};

		const onStartEditMode = () => {
			startEditMode();
		};

		const onEndEditMode = () => {
			stopEditMode();
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
			onDeleteElement,
			onStartEditMode,
			onEndEditMode,
			cardHost,
			isEditMode,
			mdiTrashCanOutline,
			onFileSelect,
			isFilePickerOpen,
		};
	},
});
</script>

<style scoped>
.board-menu {
	position: absolute;
	top: 10px;
	right: 5px;
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

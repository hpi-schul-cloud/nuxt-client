<template>
	<CardHostInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
		@move-card-keyboard="onMoveCardKeyboard"
	>
		<div ref="cardHost">
			<VCard
				:height="isLoading ? height : 'auto'"
				class="w-100 transition-swing"
				:class="{ 'drag-disabled': isEditMode }"
				outlined
				tabindex="0"
				min-height="120px"
				:elevation="isEditMode ? 6 : 0"
				:id="cardId"
				:ripple="false"
				:hover="isHovered"
			>
				<template v-if="isLoading">
					<CardSkeleton :height="height" />
				</template>
				<template v-if="!isLoading && card">
					<div class="board-menu" :class="boardMenuClasses">
						<BoardMenu scope="card">
							<BoardMenuAction @click="onTryDelete">
								<VIcon>
									{{ mdiTrashCanOutline }}
								</VIcon>
								{{ $t("components.board.action.delete") }}
							</BoardMenuAction>
						</BoardMenu>
					</div>
					<CardTitle
						:isEditMode="isEditMode"
						:value="card.title"
						scope="card"
						@update:value="onUpdateCardTitle"
					>
					</CardTitle>

					<ContentElementList
						:elements="card.elements"
						:isEditMode="isEditMode"
					></ContentElementList>
					<CardAddElementMenu
						@add-element="onAddElement"
						v-if="isEditMode"
					></CardAddElementMenu>
				</template>
			</VCard>
		</div>
		<DeleteConfirmation
			:is-delete-modal-open="isDeleteModalOpen"
			:title="card ? card.title : ''"
			:typeName="$t('components.boardCard').toString()"
			@delete-confirm="onDeleteConfirm"
			@dialog-cancel="onDeleteCancel"
		></DeleteConfirmation>
	</CardHostInteractionHandler>
</template>

<script lang="ts">
import { mdiTrashCanOutline } from "@mdi/js";
import {
	useDebounceFn,
	useElementHover,
	useElementSize,
	useFocusWithin,
	watchDebounced,
} from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import ContentElementList from "../content-elements/ContentElementList.vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import DeleteConfirmation from "../shared/DeleteConfirmation.vue";
import { useEditMode } from "../shared/EditMode.composable";
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
		DeleteConfirmation,
	},
	props: {
		height: { type: Number, required: true },
		cardId: { type: String, required: true },
	},
	emits: ["move-card-keyboard", "remove-card"],
	setup(props, { emit }) {
		const cardHost = ref(null);
		const { focused: isFocused } = useFocusWithin(cardHost);
		const isHovered = useElementHover(cardHost);
		const {
			isLoading,
			card,
			deleteCard,
			updateTitle,
			updateCardHeight,
			addElement,
		} = useCardState(props.cardId);
		const { height: cardHostHeight } = useElementSize(cardHost);
		const onMoveCardKeyboard = (event: KeyboardEvent) => {
			emit("move-card-keyboard", event.code);
		};
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(card);
		const isDeleteModalOpen = ref<boolean>(false);

		const onUpdateCardTitle = useDebounceFn(updateTitle, 1000);
		const onTryDelete = () => (isDeleteModalOpen.value = true);
		const onDeleteCancel = () => (isDeleteModalOpen.value = false);

		const onDeleteConfirm = async () => {
			await deleteCard();
			isDeleteModalOpen.value = false;
			emit("remove-card", card.value?.id);
		};
		const onAddElement = addElement;
		const onStartEditMode = () => {
			startEditMode();
		};
		const onEndEditMode = () => {
			stopEditMode();
		};

		const boardMenuClasses = computed(() => {
			if (isFocused.value === true || isHovered.value === true) {
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
			isFocused,
			isHovered,
			onMoveCardKeyboard,
			onUpdateCardTitle,
			onTryDelete,
			onAddElement,
			onStartEditMode,
			onEndEditMode,
			cardHost,
			isEditMode,
			mdiTrashCanOutline,
			isDeleteModalOpen,
			onDeleteConfirm,
			onDeleteCancel,
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

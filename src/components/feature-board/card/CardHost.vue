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
							<BoardMenuAction @click="onDelete">
								<v-icon>
									{{ mdiTrashCanOutline }}
								</v-icon>
								{{ $t("components.board.action") }}
							</BoardMenuAction>
						</BoardMenu>
					</div>
					<CardTitle
						:isEditMode="isEditMode"
						:value="card.title"
						:isFocused="canFocusAfterCreate"
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
			@delete-confirm="onDeleteConfirmation"
			@dialog-cancel="onDialogCancel"
		></DeleteConfirmation>
	</CardHostInteractionHandler>
</template>

<script lang="ts">
import {
	useDebounceFn,
	useElementSize,
	useFocusWithin,
	watchDebounced,
	useElementHover,
} from "@vueuse/core";
import { defineComponent, ref, computed, onMounted } from "vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import CardSkeleton from "./CardSkeleton.vue";
import CardAddElementMenu from "./CardAddElementMenu.vue";
import ContentElementList from "../content-elements/ContentElementList.vue";
import CardHostInteractionHandler from "./CardHostInteractionHandler.vue";
import DeleteConfirmation from "../shared/DeleteConfirmation.vue";
import { useCardState } from "../state/CardState.composable";
import { mdiTrashCanOutline } from "@mdi/js";
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
		newlyCreatedCardId: { type: String, default: "" },
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
		const isEditMode = ref<boolean>(false);
		const isDeleteModalOpen = ref<boolean>(false);

		const onUpdateCardTitle = useDebounceFn(updateTitle, 1000);
		const onDelete = () => (isDeleteModalOpen.value = true);
		const onDeleteCancel = () => (isDeleteModalOpen.value = false);

		const onDeleteConfirmation = async () => {
			await deleteCard();
			isDeleteModalOpen.value = false;
			emit("remove-card", card.value?.id);
		};
		const onAddElement = addElement;
		const onStartEditMode = () => {
			isEditMode.value = true;
		};
		const onEndEditMode = () => {
			if (isEditMode.value === true) {
				isEditMode.value = false;
			}
		};

		const boardMenuClasses = computed(() => {
			if (isFocused.value === true || isHovered.value === true) {
				return "";
			}
			return "hidden";
		});

		const canFocusAfterCreate = computed(() => {
			return props.newlyCreatedCardId === props.cardId;
		});

		watchDebounced(
			cardHostHeight,
			(newHeight: number) => updateCardHeight(newHeight),
			{ debounce: 500, maxWait: 2000 }
		);

		onMounted(() => {
			if (props.newlyCreatedCardId === props.cardId) {
				isEditMode.value = true;
			}
		});

		return {
			boardMenuClasses,
			isLoading,
			card,
			isFocused,
			isHovered,
			onMoveCardKeyboard,
			onUpdateCardTitle,
			onDelete,
			onAddElement,
			onStartEditMode,
			onEndEditMode,
			cardHost,
			isEditMode,
			mdiTrashCanOutline,
			isDeleteModalOpen,
			onDeleteConfirmation,
			onDialogCancel: onDeleteCancel,
			canFocusAfterCreate,
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

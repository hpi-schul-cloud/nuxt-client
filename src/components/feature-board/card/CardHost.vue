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
				<CardTitle
					:isEditMode="isEditMode"
					:value="card.title"
					scope="card"
					@update:value="onUpdateCardTitle"
				>
				</CardTitle>

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
	</CardHostInteractionHandler>
</template>

<script lang="ts">
import { useDeleteConfirmation } from "@/components/feature-confirmation-dialog/delete-confirmation.composable";
import { mdiTrashCanOutline } from "@mdi/js";
import {
	useDebounceFn,
	useElementHover,
	useElementSize,
	watchDebounced,
} from "@vueuse/core";
import { computed, defineComponent, inject, ref } from "vue";
import VueI18n from "vue-i18n";
import ContentElementList from "../content-elements/ContentElementList.vue";
import { useBoardFocusHandler } from "../shared/BoardFocusHandler.composable";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import { useEditMode } from "../shared/EditMode.composable";
import { useCardState } from "../state/CardState.composable";
import CardAddElementMenu from "./CardAddElementMenu.vue";
import CardHostInteractionHandler from "./CardHostInteractionHandler.vue";
import CardSkeleton from "./CardSkeleton.vue";
import CardTitle from "./CardTitle.vue";
import { injectStrict } from "@/utils/inject";

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
	emits: ["move:card-keyboard", "delete:card"],
	setup(props, { emit }) {
		const i18n: VueI18n = injectStrict<VueI18n>("i18n");
		const cardHost = ref(undefined);
		const { isFocusContained } = useBoardFocusHandler(props.cardId, cardHost);
		const isHovered = useElementHover(cardHost);
		const { isLoading, card, updateTitle, updateCardHeight, addElement } =
			useCardState(props.cardId);
		const { height: cardHostHeight } = useElementSize(cardHost);
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(
			props.cardId
		);

		const onMoveCardKeyboard = (event: KeyboardEvent) => {
			emit("move:card-keyboard", event.code);
		};
		const onUpdateCardTitle = useDebounceFn(updateTitle, 1000);

		const onTryDelete = async () => {
			const message =
				i18n
					?.t("components.cardHost.deletionModal.confirmation", {
						title: card.value?.title ? `"${card.value.title}"` : "",
						type: i18n?.t("components.boardCard").toString(),
					})
					.toString() ?? "";

			const { askConfirmation } = useDeleteConfirmation();

			const shouldDelete = await askConfirmation({ message });
			if (shouldDelete) {
				emit("delete:card", card.value?.id);
			}
		};

		const onAddElement = addElement;
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

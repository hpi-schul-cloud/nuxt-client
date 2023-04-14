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
				outlined
				tabindex="0"
				:elevation="isEditMode ? 6 : 0"
				:id="cardId"
				:ripple="false"
			>
				<template v-if="isLoading">
					<CardSkeleton :height="height" />
				</template>
				<template v-if="!isLoading && card">
					<CardHeader>
						<template v-slot:title>
							<CardHeaderTitleInput
								:isEditMode="isEditMode"
								:value="card.title"
								@update:value="onUpdateCardTitle"
							></CardHeaderTitleInput>
						</template>
						<template v-slot:menu>
							<BoardMenu scope="card">
								<BoardMenuAction @click="onDelete">
									<v-icon>
										{{ mdiTrashCanOutline }}
									</v-icon>
									{{
										$t(
											"components.cardHost.cardDelete.modal.confirmation.title"
										)
									}}
								</BoardMenuAction>
							</BoardMenu>
						</template>
					</CardHeader>

					<ContentElementList
						:elements="card.elements"
						:isEditMode="isEditMode"
					></ContentElementList>
					<CardAddElementMenu @add-element="onAddElement"></CardAddElementMenu>
				</template>
			</VCard>
		</div>
		<CardDeleteConfirmation
			:is-delete-modal-open="isDeleteModalOpen"
			:card-title="card ? card.title : ''"
			@delete-confirm="onDeleteConfirmation"
			@dialog-cancel="onDialogCancel"
		></CardDeleteConfirmation>
	</CardHostInteractionHandler>
</template>

<script lang="ts">
import { useElementSize, watchDebounced } from "@vueuse/core";
import { defineComponent, ref } from "vue";
import CardHeader from "./CardHeader.vue";
import CardHeaderTitleInput from "./CardHeaderTitleInput.vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import CardSkeleton from "./CardSkeleton.vue";
import CardAddElementMenu from "./CardAddElementMenu.vue";
import ContentElementList from "../content-elements/ContentElementList.vue";
import CardHostInteractionHandler from "./CardHostInteractionHandler.vue";
import CardDeleteConfirmation from "./CardDeleteConfirmation.vue";
import { useCardState } from "../state/CardState.composable";
import { mdiTrashCanOutline } from "@mdi/js";

export default defineComponent({
	name: "CardHost",
	components: {
		CardSkeleton,
		CardHeader,
		BoardMenu,
		BoardMenuAction,
		CardHeaderTitleInput,
		ContentElementList,
		CardAddElementMenu,
		CardHostInteractionHandler,
		CardDeleteConfirmation,
	},
	props: {
		height: { type: Number, required: true },
		cardId: { type: String, required: true },
	},
	emits: ["move-card-keyboard"],
	setup(props, { emit }) {
		const cardHost = ref(null);
		const {
			isLoading,
			card,
			updateTitle,
			deleteCard,
			updateCardHeight,
			addElement,
		} = useCardState(props.cardId);
		const { height: cardHostHeight } = useElementSize(cardHost);
		const onMoveCardKeyboard = (event: KeyboardEvent) => {
			emit("move-card-keyboard", event.code);
		};
		const isEditMode = ref<boolean>(false);
		const isDeleteModalOpen = ref<boolean>(false);

		const onUpdateCardTitle = updateTitle;
		const onDelete = () => (isDeleteModalOpen.value = true);
		const onDialogCancel = () => (isDeleteModalOpen.value = false);

		const onDeleteConfirmation = () => {
			deleteCard(props.cardId);
			isDeleteModalOpen.value = false;
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

		watchDebounced(
			cardHostHeight,
			(newHeight: number) => updateCardHeight(newHeight),
			{ debounce: 500, maxWait: 2000 }
		);

		return {
			isLoading,
			card,
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
			onDialogCancel,
		};
	},
});
</script>

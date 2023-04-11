<template>
	<CardHostInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
		@move-card-keyboard="onMoveCardKeyboard"
	>
		<div class="d-flex" ref="cardHost">
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
							<CardHostMenu>
								<CardHostMenuAction @click="onDelete">
									<v-icon>
										{{ mdiTrashCanOutline }}
									</v-icon>
									Delete Card
								</CardHostMenuAction>
							</CardHostMenu>
						</template>
					</CardHeader>

					<ContentElementList
						:elements="card.elements"
						:isEditMode="isEditMode"
					></ContentElementList>
					<CardAddElementMenu @add-element="onAddElement"></CardAddElementMenu>
				</template>
			</VCard>

			<vCustomDialog
				v-model="isDeleteModalOpen"
				data-testid="delete-dialog-item"
				:size="375"
				has-buttons
				confirm-btn-title-key="common.actions.remove"
				@dialog-confirmed="onDeleteConfirmation"
				:is-open="isDeleteModalOpen"
			>
				<h2 slot="title" class="text-h4 my-2">
					{{ $t("pages.room.itemDelete.title") }}
				</h2>
				<template slot="content">
					<p class="text-md mt-2">
						{{
							$t("components.cardHost.cardDelete.confirmation", {
								cardTitle: card?.title,
							})
						}}
					</p>
				</template>
			</vCustomDialog>
		</div>
	</CardHostInteractionHandler>
</template>

<script lang="ts">
import { useElementSize, watchDebounced } from "@vueuse/core";
import { defineComponent, ref } from "vue";
import CardHeader from "./CardHeader.vue";
import CardHeaderTitleInput from "./CardHeaderTitleInput.vue";
import CardHostMenu from "./CardHostMenu.vue";
import CardHostMenuAction from "./CardHostMenuAction.vue";
import CardSkeleton from "./CardSkeleton.vue";
import CardAddElementMenu from "./CardAddElementMenu.vue";
import ContentElementList from "../content-elements/ContentElementList.vue";
import CardHostInteractionHandler from "./CardHostInteractionHandler.vue";
import { useCardState } from "../state/CardState.composable";
import { mdiTrashCanOutline } from "@mdi/js";

import vCustomDialog from "@/components/organisms/vCustomDialog.vue";

export default defineComponent({
	name: "CardHost",
	components: {
		CardSkeleton,
		CardHeader,
		CardHostMenu,
		CardHostMenuAction,
		CardHeaderTitleInput,
		ContentElementList,
		CardAddElementMenu,
		CardHostInteractionHandler,
		vCustomDialog,
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
		const onDelete = () => {
			isDeleteModalOpen.value = true;
		};
		const onDeleteConfirmation = () => deleteCard(props.cardId);
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
		};
	},
});
</script>

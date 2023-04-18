<template>
	<InlineEditInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
	>
		<div class="mb-4">
			<div class="d-flex align-start justify-space-between py-2">
				<BoardAnyTitleInput
					:value="title"
					scope="column"
					:isEditMode="isEditMode"
					:placeholder="titlePlaceholder"
					@update:value="onUpdateTitle"
				></BoardAnyTitleInput>
				<div class="pt-2">
					<BoardMenu scope="column">
						<BoardMenuAction @click="onDelete">
							<v-icon>
								{{ mdiTrashCanOutline }}
							</v-icon>
							{{ $t("components.cardHost.deletionModal.confirmation.title") }}
						</BoardMenuAction>
					</BoardMenu>
				</div>
			</div>
			<VDivider color="black"></VDivider>
		</div>
		<DeleteConfirmation
			:is-delete-modal-open="isDeleteModalOpen"
			:card-title="title ? title : ''"
			@delete-confirm="onDeleteConfirmation"
			@dialog-cancel="onDeleteCancel"
		></DeleteConfirmation>
	</InlineEditInteractionHandler>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import DeleteConfirmation from "../shared/DeleteConfirmation.vue";
import InlineEditInteractionHandler from "../shared/InlineEditInteractionHandler.vue";
import { mdiTrashCanOutline } from "@mdi/js";
import { BOARD_COLUMN_DELETE, IdHolder } from "../types/BoardInjectionKeys";

export default defineComponent({
	name: "BoardColumnHeader",
	components: {
		BoardMenu,
		BoardAnyTitleInput,
		BoardMenuAction,
		DeleteConfirmation,
		InlineEditInteractionHandler,
	},
	props: {
		columnId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		titlePlaceholder: {
			type: String,
			required: true,
		},
	},
	emits: ["update:title"],
	setup(props, { emit }) {
		const deleteColumn: IdHolder | undefined = inject(BOARD_COLUMN_DELETE);
		if (deleteColumn === undefined) {
			throw new Error("board:delete-column not injected");
		}

		const isEditMode = ref<boolean>(false);
		const isDeleteModalOpen = ref<boolean>(false);

		const onStartEditMode = () => {
			isEditMode.value = true;
		};

		const onEndEditMode = () => {
			isEditMode.value = true;
		};

		const onDelete = () => (isDeleteModalOpen.value = true);
		const onDeleteCancel = () => (isDeleteModalOpen.value = false);
		const onDeleteConfirmation = async () => {
			await deleteColumn(props.columnId);
			isDeleteModalOpen.value = false;
			// emit("remove-card", card.value?.id);
		};

		const onUpdateTitle = (newTitle: string) => {
			emit("update:title", newTitle);
		};
		return {
			isEditMode,
			isDeleteModalOpen,
			mdiTrashCanOutline,
			onStartEditMode,
			onEndEditMode,
			onDelete,
			onDeleteCancel,
			onDeleteConfirmation,
			onUpdateTitle,
		};
	},
});
</script>

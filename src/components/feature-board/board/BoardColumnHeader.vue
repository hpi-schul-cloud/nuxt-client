<template>
	<BoardColumnInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
	>
		<div class="mb-4">
			<div class="d-flex align-start justify-space-between py-2">
				<div tabindex="0">
					<BoardAnyTitleInput
						:value="title"
						scope="column"
						:isEditMode="isEditMode"
						:placeholder="titlePlaceholder"
						@update:value="onUpdateTitle"
					></BoardAnyTitleInput>
				</div>
				<div class="pt-2">
					<BoardMenu scope="column">
						<BoardMenuAction @click="onDelete">
							<VIcon>
								{{ mdiTrashCanOutline }}
							</VIcon>
							{{ $t("components.board.action.delete") }}
						</BoardMenuAction>
					</BoardMenu>
				</div>
			</div>
			<VDivider color="black"></VDivider>
		</div>
		<DeleteConfirmation
			:is-delete-modal-open="isDeleteModalOpen"
			:title="title"
			:typeName="$t('components.boardColumn').toString()"
			@delete-confirm="onDeleteConfirmation"
			@dialog-cancel="onDeleteCancel"
		></DeleteConfirmation>
	</BoardColumnInteractionHandler>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import { useEditMode } from "../shared/EditMode.composable";
import DeleteConfirmation from "../shared/DeleteConfirmation.vue";
import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";
import { mdiTrashCanOutline } from "@mdi/js";

export default defineComponent({
	name: "BoardColumnHeader",
	components: {
		BoardMenu,
		BoardAnyTitleInput,
		BoardMenuAction,
		DeleteConfirmation,
		BoardColumnInteractionHandler,
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
	emits: ["update:title", "delete:column"],
	setup(props, { emit }) {
		const columnId = computed(() => props.columnId);
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(columnId);

		const isDeleteModalOpen = ref<boolean>(false);

		const onStartEditMode = () => startEditMode();
		const onEndEditMode = () => stopEditMode();

		const onDelete = () => (isDeleteModalOpen.value = true);
		const onDeleteCancel = () => (isDeleteModalOpen.value = false);
		const onDeleteConfirmation = async () => {
			emit("delete:column", props.columnId);
			isDeleteModalOpen.value = false;
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

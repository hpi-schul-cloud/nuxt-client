<template>
	<BoardColumnInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
		@move:column-keyboard="onMoveColumnKeyboard"
	>
		<div
			class="column-header mb-4 rounded"
			:class="{ 'grey lighten-2': isFocused }"
			tabindex="0"
			ref="columnHeader"
		>
			<div class="d-flex align-start justify-space-between py-2 pl-1">
				<div>
					<BoardAnyTitleInput
						:value="title"
						scope="column"
						:isEditMode="isEditMode"
						:placeholder="titlePlaceholder"
						@update:value="onUpdateTitle"
					></BoardAnyTitleInput>
				</div>
				<div class="pt-2">
					<BoardMenu v-if="hasDeletePermission" scope="column">
						<BoardMenuAction @click="onTryDelete">
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
	</BoardColumnInteractionHandler>
</template>

<script lang="ts">
import { useDeleteConfirmation } from "@/components/feature-confirmation-dialog/delete-confirmation.composable";
import { mdiTrashCanOutline } from "@mdi/js";
import { defineComponent, inject, ref } from "vue";
import VueI18n from "vue-i18n";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import { useBoardFocusHandler } from "../shared/BoardFocusHandler.composable";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import { useEditMode } from "../shared/EditMode.composable";
import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";

export default defineComponent({
	name: "BoardColumnHeader",
	components: {
		BoardMenu,
		BoardAnyTitleInput,
		BoardMenuAction,
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
	emits: ["delete:column", "move:column-keyboard", "update:title"],
	setup(props, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(
			props.columnId
		);

		const isDeleteModalOpen = ref<boolean>(false);

		const columnHeader = ref(undefined);
		const { isFocused } = useBoardFocusHandler(props.columnId, columnHeader);
		const { hasEditPermission, hasDeletePermission } = useBoardPermissions();

		const onStartEditMode = () => {
			if (!hasEditPermission) return;
			startEditMode();
		};
		const onEndEditMode = () => {
			if (!hasEditPermission) return;
			stopEditMode();
		};

		const onTryDelete = async () => {
			const message =
				i18n
					?.t("components.cardHost.deletionModal.confirmation", {
						title: props.title ? `"${props.title}"` : "",
						type: i18n?.t("components.boardColumn").toString(),
					})
					.toString() ?? "";

			const { askConfirmation } = useDeleteConfirmation();

			const shouldDelete = await askConfirmation({ message });
			if (shouldDelete) {
				emit("delete:column", props.columnId);
			}
		};

		const onMoveColumnKeyboard = (event: KeyboardEvent) => {
			emit("move:column-keyboard", event.code);
		};

		const onUpdateTitle = (newTitle: string) => {
			emit("update:title", newTitle);
		};

		return {
			columnHeader,
			isEditMode,
			isFocused,
			isDeleteModalOpen,
			hasDeletePermission,
			mdiTrashCanOutline,
			onStartEditMode,
			onEndEditMode,
			onTryDelete,
			onMoveColumnKeyboard,
			onUpdateTitle,
		};
	},
});
</script>
<style scoped>
.column-header:focus {
	outline: none;
}
</style>

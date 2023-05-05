<template>
	<BoardColumnInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
		@move:column-keyboard="onMoveColumnKeyboard"
	>
		<div
			class="column-header mb-4 rounded"
			:class="{ 'grey lighten-1': isFocused }"
			ref="columnHeader"
			tabindex="-1"
		>
			<div class="d-flex align-start justify-space-between py-2 pl-1">
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
import { computed, defineComponent, inject, ref } from "vue";
import { useFocusWithin } from "@vueuse/core";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import { useEditMode } from "../shared/EditMode.composable";
import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";
import { mdiTrashCanOutline } from "@mdi/js";
import { useDeleteConfirmation } from "@/components/feature-confirmation-dialog/delete-confirmation.composable";
import VueI18n from "vue-i18n";

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
		const columnId = computed(() => props.columnId);
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(columnId);

		const isDeleteModalOpen = ref<boolean>(false);

		const columnHeader = ref(null);
		const { focused: isFocused } = useFocusWithin(columnHeader);

		const onStartEditMode = () => startEditMode();
		const onEndEditMode = () => stopEditMode();

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

<template>
	<BoardColumnInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
		@move:column-keyboard="onMoveColumnKeyboard"
	>
		<div
			class="column-header mb-4 rounded"
			:class="{ 'grey lighten-2': isFocusContained }"
			tabindex="0"
			ref="columnHeader"
		>
			<div class="d-flex align-start py-2 px-2">
				<BoardAnyTitleInput
					:value="title"
					scope="column"
					:isEditMode="isEditMode"
					:placeholder="titlePlaceholder"
					@update:value="onUpdateTitle"
					class="w-100"
				/>
				<BoardMenu v-if="hasDeletePermission" scope="column">
					<BoardMenuActionEdit v-if="!isEditMode" @click="onStartEditMode" />
					<BoardMenuActionDelete @click="onDelete" :name="title" />
				</BoardMenu>
			</div>
			<VDivider aria-hidden="true" color="black" />
		</div>
	</BoardColumnInteractionHandler>
</template>

<script lang="ts">
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useEditMode,
} from "@data-board";
import { mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import {
	BoardMenu,
	BoardMenuActionEdit,
	BoardMenuActionDelete,
} from "@ui-board";
import { defineComponent, ref, toRef } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";

export default defineComponent({
	name: "BoardColumnHeader",
	components: {
		BoardMenu,
		BoardAnyTitleInput,
		BoardMenuActionEdit,
		BoardColumnInteractionHandler,
		BoardMenuActionDelete,
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
		const columnId = toRef(props, "columnId");
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(
			columnId.value
		);

		const isDeleteModalOpen = ref<boolean>(false);

		const columnHeader = ref<HTMLDivElement | null>(null);
		const { isFocusContained } = useBoardFocusHandler(
			columnId.value,
			columnHeader
		);
		const { hasEditPermission, hasDeletePermission } = useBoardPermissions();

		const onStartEditMode = () => {
			if (!hasEditPermission) return;
			startEditMode();
		};

		const onEndEditMode = () => {
			if (!hasEditPermission) return;
			stopEditMode();
		};

		const onDelete = () => emit("delete:column", props.columnId);

		const onMoveColumnKeyboard = (event: KeyboardEvent) => {
			emit("move:column-keyboard", event.code);
		};

		const onUpdateTitle = (newTitle: string) => {
			emit("update:title", newTitle);
		};

		return {
			columnHeader,
			isEditMode,
			isFocusContained,
			isDeleteModalOpen,
			hasDeletePermission,
			mdiTrashCanOutline,
			mdiPencilOutline,
			onStartEditMode,
			onEndEditMode,
			onDelete,
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

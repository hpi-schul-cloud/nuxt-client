<template>
	<BoardColumnInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
		@move:column-keyboard="onMoveColumnKeyboard"
	>
		<div class="column-header mb-4 rounded" tabindex="0" ref="columnHeader">
			<div class="d-flex align-center py-2 px-2">
				<BoardAnyTitleInput
					:value="title"
					:data-testid="`column-title-${index}`"
					scope="column"
					:isEditMode="isEditMode"
					:placeholder="titlePlaceholder"
					class="w-100"
					:isFocused="isFocusedById"
					@update:value="onUpdateTitle"
				/>
				<BoardMenu
					v-if="hasDeletePermission"
					scope="column"
					:data-testid="`column-menu-btn-${index}`"
				>
					<BoardMenuActionEdit v-if="!isEditMode" @click="onStartEditMode" />
					<BoardMenuActionMoveLeft @click="onMoveColumnLeft" />
					<BoardMenuActionMoveRight @click="onMoveColumnRight" />
					<BoardMenuActionDelete :name="title" @click="onDelete" />
				</BoardMenu>
			</div>
			<VDivider aria-hidden="true" class="border-opacity-100" color="black" />
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
	BoardMenuActionDelete,
	BoardMenuActionEdit,
	BoardMenuActionMoveLeft,
	BoardMenuActionMoveRight,
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
		BoardMenuActionMoveLeft,
		BoardMenuActionMoveRight,
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
		index: {
			type: Number,
		},
	},
	emits: [
		"delete:column",
		"move:column-left",
		"move:column-right",
		"update:title",
	],
	setup(props, { emit }) {
		const columnId = toRef(props, "columnId");
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(
			columnId.value
		);

		const isDeleteModalOpen = ref<boolean>(false);

		const columnHeader = ref<HTMLDivElement | null>(null);
		const { isFocusContained, isFocusedById } = useBoardFocusHandler(
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

		const onDelete = async (confirmation: Promise<boolean>) => {
			const shouldDelete = await confirmation;
			if (shouldDelete) {
				emit("delete:column", props.columnId);
			}
		};

		const onMoveColumnKeyboard = (event: KeyboardEvent) => {
			if (event.code === "ArrowLeft") {
				emit("move:column-left");
			} else if (event.code === "ArrowRight") {
				emit("move:column-right");
			} else {
				console.log("not supported key event");
			}
		};

		const onMoveColumnLeft = () => {
			emit("move:column-left");
		};

		const onMoveColumnRight = () => {
			emit("move:column-right");
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
			onMoveColumnLeft,
			onMoveColumnRight,
			onUpdateTitle,
			isFocusedById,
		};
	},
});
</script>
<style scoped>
.column-header {
	align-items: top;
}
.column-header:focus {
	outline: none;
}
</style>

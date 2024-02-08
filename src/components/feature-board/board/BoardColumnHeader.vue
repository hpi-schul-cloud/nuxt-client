<template>
	<BoardColumnInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
		@move:column-keyboard="onMoveColumnKeyboard"
	>
		<div
			class="column-header mb-4 rounded"
			:class="{ 'bg-grey-lighten-2': isFocusContained && useFocusHighlight }"
			tabindex="0"
			ref="columnHeader"
		>
			<div class="d-flex align-center py-2 px-2">
				<BoardAnyTitleInput
					:value="title"
					scope="column"
					:isEditMode="isEditMode"
					:placeholder="titlePlaceholder"
					@update:value="onUpdateTitle"
					class="w-100"
					:is-focused="isFocusedById"
				/>
				<slot name="menu" />
			</div>
			<VDivider aria-hidden="true" class="border-opacity-100" color="black" />
		</div>
	</BoardColumnInteractionHandler>
</template>

<script lang="ts">
import { useBoardFocusHandler, useEditMode } from "@data-board";
import { mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import { defineComponent, ref, toRef } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";

export default defineComponent({
	name: "BoardColumnHeader",
	components: {
		BoardAnyTitleInput,
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
		canEdit: {
			type: Boolean,
			required: true,
		},
		useFocusHighlight: {
			type: Boolean,
			default: true,
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
		const canEdit = toRef(props, "canEdit");
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(
			columnId.value
		);

		const isDeleteModalOpen = ref<boolean>(false);

		const columnHeader = ref<HTMLDivElement | null>(null);
		const { isFocusContained, isFocusedById } = useBoardFocusHandler(
			columnId.value,
			columnHeader
		);

		const onStartEditMode = () => {
			if (!canEdit.value) return;
			startEditMode();
		};

		const onEndEditMode = () => {
			if (!canEdit.value) return;
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
.column-header:focus {
	outline: none;
}
</style>

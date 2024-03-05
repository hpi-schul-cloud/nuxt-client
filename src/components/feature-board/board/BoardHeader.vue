<template>
	<BoardColumnInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
	>
		<div
			class="board-header rounded"
			:class="{ 'bg-grey-lighten-2': isFocusContained }"
			tabindex="0"
			ref="boardHeader"
		>
			<div class="d-flex align-center gap-5 px-2 py-2">
				<BoardAnyTitleInput
					scope="board"
					:value="title"
					data-testid="board-title"
					:isEditMode="isEditMode"
					:placeholder="titlePlaceholder"
					@update:value="onUpdateTitle"
					:isFocused="isFocusedById"
					:maxLength="100"
				/>
			</div>
		</div>
	</BoardColumnInteractionHandler>
</template>

<script lang="ts">
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useEditMode,
} from "@data-board";
import { useDebounceFn } from "@vueuse/core";
import { defineComponent, ref, toRef } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";

export default defineComponent({
	name: "BoardHeader",
	components: {
		BoardAnyTitleInput,
		BoardColumnInteractionHandler,
	},
	props: {
		boardId: {
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
		const boardId = toRef(props, "boardId");
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(
			boardId.value
		);

		const boardHeader = ref<HTMLDivElement | null>(null);
		const { isFocusContained, isFocusedById } = useBoardFocusHandler(
			boardId.value,
			boardHeader
		);

		const { hasEditPermission } = useBoardPermissions();

		const onStartEditMode = () => {
			if (!hasEditPermission) return;
			startEditMode();
		};

		const onEndEditMode = () => {
			if (!hasEditPermission) return;
			stopEditMode();
		};

		const onUpdateTitle = useDebounceFn((newTitle: string) => {
			emit("update:title", newTitle);
		}, 1000);

		return {
			boardHeader,
			hasEditPermission,
			isEditMode,
			isFocusContained,
			isFocusedById,
			onStartEditMode,
			onEndEditMode,
			onUpdateTitle,
		};
	},
});
</script>

<style scoped>
.board-header {
	align-items: top;
}
.board-header:focus {
	outline: none;
}
</style>

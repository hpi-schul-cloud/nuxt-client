<template>
	<BoardColumnInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
		@move:column-keyboard="onMoveLineKeyboard"
	>
		<div class="line-header mb-4 rounded" tabindex="0" ref="lineHeader">
			<div class="d-flex align-center py-2 px-2">
				<BoardAnyTitleInput
					:value="title"
					scope="column"
					:isEditMode="isEditMode"
					:placeholder="titlePlaceholder"
					class="w-100"
					:isFocused="isFocusedById"
					@update:value="onUpdateTitle"
				/>
				<slot name="menu" />
			</div>
			<VDivider aria-hidden="true" class="border-opacity-100" color="black" />
		</div>
	</BoardColumnInteractionHandler>
</template>

<script setup lang="ts">
import { useBoardFocusHandler } from "@data-board";
import BoardColumnInteractionHandler from "@feature-board/board/BoardColumnInteractionHandler.vue";
import BoardAnyTitleInput from "@feature-board/shared/BoardAnyTitleInput.vue";
import { ref, toRef } from "vue";
import { useEditMode } from "./editMode.composable";

const props = defineProps({
	lineId: {
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
});

const lineIdRef = toRef(props, "lineId");

const emit = defineEmits<{
	(e: "move:line-left"): void;
	(e: "move:line-right"): void;
	(e: "update:title", newTitle: string): void;
}>();

const { isEditMode, startEditMode, stopEditMode } = useEditMode(
	lineIdRef.value
);

const lineHeader = ref<HTMLDivElement | null>(null);
const { isFocusedById } = useBoardFocusHandler(lineIdRef.value, lineHeader);

const onStartEditMode = () => {
	if (!props.canEdit) return;
	startEditMode();
};

const onEndEditMode = () => {
	if (!props.canEdit) return;
	stopEditMode();
};

const onMoveLineKeyboard = (event: KeyboardEvent) => {
	if (event.code === "ArrowLeft") {
		emit("move:line-left");
	} else if (event.code === "ArrowRight") {
		emit("move:line-right");
	}
};

const onUpdateTitle = (newTitle: string) => {
	emit("update:title", newTitle);
};
</script>
<style scoped>
.line-header:focus {
	outline: none;
}
</style>

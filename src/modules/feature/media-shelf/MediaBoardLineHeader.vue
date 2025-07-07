<template>
	<BoardColumnInteractionHandler
		:is-edit-mode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
	>
		<div ref="lineHeader" class="line-header rounded" tabindex="0">
			<div class="d-flex align-center py-2 px-4">
				<BoardAnyTitleInput
					data-testid="media-line-title"
					:value="title"
					scope="column"
					:is-edit-mode="isEditMode"
					:placeholder="titlePlaceholder"
					class="w-100"
					:is-focused="isFocusedById"
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
import {
	BoardAnyTitleInput,
	BoardColumnInteractionHandler,
} from "@feature-board";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useMediaBoardEditMode } from "@/modules/util/board/editMode.composable"; // FIX_CIRCULAR_DEPENDENCY

import { ref, toRef } from "vue";

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
});

const lineIdRef = toRef(props, "lineId");

const emit = defineEmits<{
	(e: "move:line-left"): void;
	(e: "move:line-right"): void;
	(e: "update:title", newTitle: string): void;
}>();

const { isEditMode, startEditMode, stopEditMode } = useMediaBoardEditMode(
	lineIdRef.value
);

const lineHeader = ref<HTMLDivElement | null>(null);
const { isFocusedById } = useBoardFocusHandler(lineIdRef.value, lineHeader);

const onStartEditMode = () => {
	startEditMode();
};

const onEndEditMode = () => {
	stopEditMode();
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

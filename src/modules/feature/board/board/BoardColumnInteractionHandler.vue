<template>
	<InlineEditInteractionHandler
		:is-edit-mode="isEditMode"
		:tabindex="0"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
		@keydown.enter="onKeydownEnter"
	>
		<div
			data-testid="event-handle"
			@keydown.left.right.capture="onKeydownArrow"
			@keydown.tab.capture="onKeydownTab"
			@keydown.enter.capture="onKeydownEnter"
		>
			<slot />
		</div>
	</InlineEditInteractionHandler>
</template>

<script setup lang="ts">
import InlineEditInteractionHandler from "../shared/InlineEditInteractionHandler.vue";

type Props = {
	isEditMode: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "start-edit-mode"): void;
	(e: "end-edit-mode"): void;
	(e: "move:column-keyboard", event: KeyboardEvent): void;
}>();

const onStartEditMode = () => emit("start-edit-mode");
const onEndEditMode = () => emit("end-edit-mode");

const onKeydownArrow = (event: KeyboardEvent) => {
	if (!props.isEditMode) {
		event.preventDefault();
		emit("move:column-keyboard", event);
	}
};

const onKeydownEnter = (event: KeyboardEvent) => {
	if (event.target instanceof HTMLButtonElement) {
		/**
		 * Do not handle key-events on buttons (mainly the BoardMenu) within the column header
		 */
		return;
	}
	if (!props.isEditMode) {
		emit("start-edit-mode");
		event.preventDefault();
	}
};

const onKeydownTab = () => {
	if (props.isEditMode) {
		emit("end-edit-mode");
	}
};
</script>

<template>
	<InlineEditInteractionHandler
		:is-edit-mode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
		@keydown.enter="onKeydownEnter"
		:tabindex="0"
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

<script lang="ts">
import { defineComponent } from "vue";
import InlineEditInteractionHandler from "../shared/InlineEditInteractionHandler.vue";

export default defineComponent({
	name: "BoardColumnInteractionHandler",
	components: {
		InlineEditInteractionHandler,
	},
	props: {
		isEditMode: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["start-edit-mode", "end-edit-mode", "move:column-keyboard"],
	setup(props, { emit }) {
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

		return {
			onStartEditMode,
			onEndEditMode,
			onKeydownArrow,
			onKeydownEnter,
			onKeydownTab,
		};
	},
});
</script>

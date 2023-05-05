<template>
	<InlineEditInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
	>
		<div
			data-testid="event-handle"
			@keydown.up.down.left.right="onKeydownArrow"
			@keydown.enter.capture="onKeydownEnter"
		>
			<slot></slot>
		</div>
	</InlineEditInteractionHandler>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InlineEditInteractionHandler from "../shared/InlineEditInteractionHandler.vue";

export default defineComponent({
	name: "CardHostInteractionHandler",
	components: {
		InlineEditInteractionHandler,
	},
	props: {
		isEditMode: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["start-edit-mode", "end-edit-mode", "move:card-keyboard"],
	setup(props, { emit }) {
		const onStartEditMode = () => {
			emit("start-edit-mode");
		};
		const onEndEditMode = () => {
			emit("end-edit-mode");
		};
		const onKeydownArrow = (event: KeyboardEvent) => {
			if (!props.isEditMode) {
				emit("move:card-keyboard", event);
			}
		};
		const onKeydownEnter = (event: KeyboardEvent) => {
			if (!props.isEditMode) {
				emit("start-edit-mode");
				event.stopPropagation();
				event.stopImmediatePropagation();
				event.preventDefault();
			}
		};
		return {
			onStartEditMode,
			onEndEditMode,
			onKeydownArrow,
			onKeydownEnter,
		};
	},
});
</script>

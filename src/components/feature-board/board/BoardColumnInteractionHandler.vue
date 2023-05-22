<template>
	<InlineEditInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
	>
		<div
			data-testid="event-handle"
			@keydown.left.right="onKeydownArrow"
			@keydown.enter="onKeydownEnter"
			@keydown.tab="onKeydownTab"
		>
			<slot></slot>
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
			if (!props.isEditMode) {
				emit("start-edit-mode");
				event.stopPropagation();
				event.stopImmediatePropagation();
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

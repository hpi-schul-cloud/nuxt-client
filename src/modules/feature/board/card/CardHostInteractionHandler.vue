<template>
	<InlineEditInteractionHandler
		:is-edit-mode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
	>
		<div
			data-testid="event-handle"
			@keydown.up.down.left.right="onKeydownArrow"
			@keydown.enter="onKeydownEnter"
		>
			<slot />
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
				event.preventDefault();
				emit("move:card-keyboard", event);
			}
		};
		const onKeydownEnter = (event: KeyboardEvent) => {
			const element = event.target as HTMLElement;
			const classNames = event.target ? element.getAttribute("class") : "";
			const isCardHost = classNames?.split(" ").includes("card-host");
			if (!props.isEditMode && isCardHost) {
				emit("start-edit-mode");
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

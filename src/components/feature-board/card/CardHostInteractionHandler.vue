<template>
	<OnClickOutside @trigger="onClickOutside">
		<div
			data-testid="event-handle"
			@dblclick.prevent.stop="onDoubleClick"
			@keydown.escape.capture.stop="onKeydownEscape"
			@keydown.up.down.left.right="onKeydownArrow"
		>
			<slot></slot>
		</div>
	</OnClickOutside>
</template>

<script lang="ts">
import { defineComponent, provide, shallowRef } from "vue";

import { OnClickOutside } from "@vueuse/components";
export default defineComponent({
	name: "CardHostInteractionHandler",
	components: {
		OnClickOutside,
	},
	props: {
		isEditMode: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["start-edit-mode", "end-edit-mode", "move-card-keyboard"],
	setup(props, { emit }) {
		const interactionEvent = shallowRef<{ x: number; y: number } | undefined>();
		provide("CARD_HOST_INTERACTION_EVENT", interactionEvent);
		const onClickOutside = () => {
			if (props.isEditMode) {
				emit("end-edit-mode");
			}
		};

		const onDoubleClick = (event: MouseEvent) => {
			if (!props.isEditMode) {
				interactionEvent.value = { x: event.x, y: event.y };
				emit("start-edit-mode");
			}
		};
		const onKeydownEscape = () => {
			if (props.isEditMode) {
				emit("end-edit-mode");
			}
		};
		const onKeydownArrow = (event: KeyboardEvent) => {
			if (!props.isEditMode) {
				emit("move-card-keyboard", event);
			}
		};
		return {
			onClickOutside,
			onDoubleClick,
			onKeydownEscape,
			onKeydownArrow,
			interactionEvent,
		};
	},
});
</script>

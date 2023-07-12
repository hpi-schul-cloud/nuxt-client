<template>
	<OnClickOutside @trigger="onClickOutside">
		<div
			ref="event-handle"
			data-testid="event-handle"
			@dblclick.prevent.stop="onDoubleClick"
			@keydown.escape="onKeydownEscape"
		>
			<slot></slot>
		</div>
	</OnClickOutside>
</template>

<script lang="ts">
import { defineComponent, provide, shallowRef } from "vue";

import { OnClickOutside } from "@vueuse/components";
import { InlineEditInteractionEvent } from "../types/InlineEditInteractionEvent.symbol";

export default defineComponent({
	name: "InlineEditInteractionHandler",
	components: {
		OnClickOutside,
	},
	props: {
		isEditMode: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["start-edit-mode", "end-edit-mode"],
	setup(props, { emit }) {
		const interactionEvent = shallowRef<{ x: number; y: number } | undefined>();
		provide(InlineEditInteractionEvent, interactionEvent);

		const checkEventTarget = (event: MouseEvent): boolean => {
			if (!(event.target instanceof HTMLElement)) return false;

			return (event.target as HTMLElement)?.className?.includes("v-list-item");
		};

		const onClickOutside = (event: MouseEvent) => {
			const isMenuEvent = checkEventTarget(event);
			if (props.isEditMode && !isMenuEvent) {
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
		return {
			onClickOutside,
			onDoubleClick,
			onKeydownEscape,
		};
	},
});
</script>

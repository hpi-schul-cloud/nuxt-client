<template>
	<OnClickOutside @trigger="onClickOutside" :options="{ capture: false }">
		<div
			ref="event-handle"
			data-testid="event-handle"
			@dblclick.prevent.stop="onDoubleClick"
			@keydown.escape="onKeydownEscape"
		>
			<slot />
		</div>
	</OnClickOutside>
</template>

<script lang="ts">
import { defineComponent, provide, shallowRef } from "vue";

import { OnClickOutside } from "@vueuse/components";
import { InlineEditInteractionEvent } from "@/types/board/InlineEditInteractionEvent.symbol";

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

		const isDatePicker = (target: HTMLElement): any => {
			if (target.className?.includes("v-picker--date")) {
				return true;
			}

			if (
				target.className?.includes("v-menu__content") ||
				!target.parentElement
			) {
				return false;
			} else {
				return isDatePicker(target.parentElement);
			}
		};

		const isAllowedTarget = (event: MouseEvent): boolean => {
			if (!(event.target instanceof HTMLElement)) return true;

			return (
				!event.target?.className?.includes("v-list-item") &&
				!isDatePicker(event.target)
			);
		};

		const onClickOutside = (event: MouseEvent) => {
			if (props.isEditMode && isAllowedTarget(event)) {
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

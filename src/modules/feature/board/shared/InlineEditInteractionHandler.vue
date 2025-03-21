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

		const isDatePicker = (target: HTMLElement | SVGElement): boolean | void => {
			return !!target.closest(".v-date-picker");
		};

		const isLinkElement = (target: HTMLElement | SVGElement): boolean => {
			const linkTestId = target
				.closest("a")
				?.attributes.getNamedItem("data-testid")?.value;

			return linkTestId === "board-file-element-edit-menu-download";
		};

		const isListItem = (target: HTMLElement | SVGElement): boolean => {
			if (target instanceof SVGElement) return false;

			return target.className?.includes("v-list-item");
		};

		const isAllowedTarget = (event: MouseEvent): boolean => {
			if (
				!(event.target instanceof HTMLElement) &&
				!(event.target instanceof SVGElement)
			)
				return true;

			return (
				event.target &&
				[isListItem, isDatePicker, isLinkElement].every(
					(fn) => !fn(event.target as HTMLElement | SVGElement)
				)
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

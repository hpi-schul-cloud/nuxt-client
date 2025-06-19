<template>
	<OnClickOutside :options="{ capture: false }" @trigger="onClickOutside">
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

<script setup lang="ts">
import { provide, shallowRef } from "vue";
import { OnClickOutside } from "@vueuse/components";
import { InlineEditInteractionEvent } from "@/types/board/InlineEditInteractionEvent.symbol";

type Props = {
	isEditMode: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "start-edit-mode"): void;
	(e: "end-edit-mode"): void;
}>();

const interactionEvent = shallowRef<{ x: number; y: number } | undefined>();
provide(InlineEditInteractionEvent, interactionEvent);

const isDatePicker = (target: HTMLElement | SVGElement): boolean | void => {
	return !!target.closest(".v-date-picker");
};

const isFileElementLink = (target: HTMLElement | SVGElement): boolean => {
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
	const target = event.target as HTMLElement | SVGElement;
	if (!(target instanceof HTMLElement) && !(target instanceof SVGElement))
		return true;

	const disallowedConditions = [isListItem, isDatePicker, isFileElementLink];

	return target && disallowedConditions.every((fn) => !fn(target));
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
</script>

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
import { InlineEditInteractionEvent } from "@/types/board/InlineEditInteractionEvent.symbol";
import { InlineEditInteractionHandled } from "@/types/board/InlineEditInteractionHandled.symbol";
import { OnClickOutside } from "@vueuse/components";
import { nextTick, onMounted, provide, shallowRef, useTemplateRef } from "vue";

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

const interactionHandled = shallowRef(false);
provide(InlineEditInteractionHandled, interactionHandled);

const eventHandle = useTemplateRef<HTMLElement>("event-handle");

// Pre-computed once the component is in its final (possibly teleported) DOM position.
// null -> handler is not inside any .v-dialog
// Element -> the nearest .v-dialog ancestor of this handler
let handlerContainingDialog: Element | null = null;
onMounted(() => {
	handlerContainingDialog = eventHandle.value?.closest(".v-dialog") ?? null;
});

const isDatePicker = (target: HTMLElement | SVGElement): boolean | void => !!target.closest(".v-date-picker");

const isFileElementLink = (target: HTMLElement | SVGElement): boolean => {
	const linkTestId = target.closest("a")?.attributes.getNamedItem("data-testid")?.value;

	return linkTestId === "board-file-element-edit-menu-download";
};

const isListItem = (target: HTMLElement | SVGElement): boolean => {
	if (target instanceof SVGElement) return false;

	return target.className?.includes("v-list-item");
};

const isKeepInlineEditModeButton = (target: HTMLElement | SVGElement): boolean => {
	if (target instanceof SVGElement) return false;
	const button = target.closest("button");
	if (!button) return false;

	return button.className?.includes("keep-inline-edit-mode");
};

const isDialog = (target: HTMLElement | SVGElement): boolean => {
	const targetDialog = (target as Element).closest(".v-dialog");
	if (!targetDialog) return false;
	// Only suppress end-edit-mode when the click lands in a different dialog
	// (e.g. a confirmation overlay on top). If both this handler and the click
	// target share the same .v-dialog ancestor (e.g. CardHostDetailView), a click
	// outside the card should still end edit mode normally.
	return targetDialog !== handlerContainingDialog;
};

const hasTextSelection = (): boolean => {
	const selection = window.getSelection();
	return selection !== null && selection.toString().length > 0;
};

const isAllowedTarget = (event: Event): boolean => {
	const target = event.target as HTMLElement | SVGElement;
	if (!(target instanceof HTMLElement) && !(target instanceof SVGElement)) return true;

	const disallowedConditions = [isListItem, isDatePicker, isFileElementLink, isKeepInlineEditModeButton, isDialog];

	return target && disallowedConditions.every((fn) => !fn(target));
};

const onClickOutside = (event: Event) => {
	if (props.isEditMode && isAllowedTarget(event) && !hasTextSelection()) {
		interactionEvent.value = undefined;
		emit("end-edit-mode");
	}
};

const onDoubleClick = async (event: MouseEvent) => {
	if (!props.isEditMode) {
		interactionHandled.value = false;
		interactionEvent.value = { x: event.x, y: event.y };
		emit("start-edit-mode");
		await nextTick();
		interactionEvent.value = undefined;
	}
};
const onKeydownEscape = () => {
	if (props.isEditMode) {
		interactionEvent.value = undefined;
		emit("end-edit-mode");
	}
};
</script>

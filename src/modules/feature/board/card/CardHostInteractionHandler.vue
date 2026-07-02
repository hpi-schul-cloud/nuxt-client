<template>
	<OnClickOutside :options="{ capture: false }" @trigger="onClickOutside">
		<div
			data-testid="event-handle"
			@dblclick="onDoubleClick"
			@keydown.esc="onKeydownEscape"
			@keydown.up.down.left.right="onKeydownArrow"
			@keydown.enter="onKeydownEnter"
		>
			<slot />
		</div>
	</OnClickOutside>
</template>

<script setup lang="ts">
import { OnClickOutside } from "@vueuse/components";

type Props = {
	isEditMode: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "start-edit-mode"): void;
	(e: "end-edit-mode"): void;
	(e: "move:card-keyboard", event: KeyboardEvent): void;
}>();

const onDoubleClick = () => {
	if (!props.isEditMode) {
		emit("start-edit-mode");
	}
};

const onClickOutside = () => {
	if (props.isEditMode) {
		emit("end-edit-mode");
	}
};

const onKeydownEscape = () => {
	if (props.isEditMode) {
		emit("end-edit-mode");
	}
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
</script>

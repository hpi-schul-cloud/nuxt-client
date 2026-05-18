<template>
	<div style="position: fixed; top: 0; left: 0; z-index: 99999; background: black; color: white">
		stack length: {{ stack.length }}
	</div>
	<component
		:is="registry[dialog.type].component"
		v-for="dialog in stack"
		:key="dialog.id"
		:model-value="dialog.modelValue"
		v-bind="dialog.props"
		@update:model-value="setDialogModelValue(dialog.id, $event)"
		@complete="completeDialog(dialog.id, $event)"
		@cancel="cancelDialog(dialog.id)"
		@after-leave="onDialogAfterLeave(dialog.id)"
	/>
</template>

<script setup lang="ts">
import { useDialogStack } from "./dialog-stack";
import { onBeforeUnmount } from "vue";

const {
	stack,
	registry,
	setDialogModelValue,
	completeDialog,
	cancelDialog,
	onDialogAfterLeave,
	cancelAllDialogsImmediately,
} = useDialogStack();

onBeforeUnmount(() => {
	// Critical guard against dangling promises if host is destroyed mid-transition.
	cancelAllDialogsImmediately();
});
</script>

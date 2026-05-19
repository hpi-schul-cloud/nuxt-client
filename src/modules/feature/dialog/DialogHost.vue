<template>
	<component
		:is="registry[activeDialog.type].component"
		v-if="activeDialog"
		:key="activeDialog.id"
		:model-value="activeDialog.modelValue"
		v-bind="activeDialog.props"
		@update:model-value="setDialogModelValue(activeDialog.id, $event)"
		@complete="completeDialog(activeDialog.id, $event)"
		@cancel="cancelDialog(activeDialog.id)"
		@after-leave="onDialogAfterLeave(activeDialog.id)"
	/>
</template>

<script setup lang="ts">
import { useDialogManager } from "./dialog-manager";
import { onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";

const {
	activeDialog,
	registry,
	setDialogModelValue,
	completeDialog,
	cancelDialog,
	onDialogAfterLeave,
	cancelAllDialogsImmediately,
} = useDialogManager();

const route = useRoute();
watch(() => route.path, cancelAllDialogsImmediately);

onBeforeUnmount(() => {
	cancelAllDialogsImmediately();
});
</script>

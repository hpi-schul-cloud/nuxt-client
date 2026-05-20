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
import { useDialogStore } from "./dialog-manager.store";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";

const dialogStore = useDialogStore();
const { activeDialog } = storeToRefs(dialogStore);
const { registry, setDialogModelValue, completeDialog, cancelDialog, onDialogAfterLeave, cancelAllDialogsImmediately } =
	dialogStore;

const route = useRoute();
watch(() => route.path, cancelAllDialogsImmediately);

onBeforeUnmount(() => {
	cancelAllDialogsImmediately();
});
</script>

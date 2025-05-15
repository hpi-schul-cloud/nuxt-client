<template>
	<Dialog
		:is-dialog-open="isDialogOpen"
		:message="message"
		:confirm-btn-lang-key="confirmBtnLangKey"
		@confirm="confirm"
		@cancel="cancel"
	/>
</template>

<script setup lang="ts">
import { Dialog } from "@ui-dialog";
import { computed } from "vue";
import { useInternalConfirmationDialog } from "./Confirmation.composable";

const { confirm, cancel, dialogOptions, isDialogOpen } =
	useInternalConfirmationDialog();

const message = computed(() =>
	dialogOptions.value ? dialogOptions.value.message : ""
);

const confirmBtnLangKey = computed(
	() => dialogOptions.value?.confirmActionLangKey ?? "common.actions.confirm"
);
</script>

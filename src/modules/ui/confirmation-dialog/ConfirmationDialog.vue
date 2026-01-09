<template>
	<Dialog
		v-model="isDialogOpen"
		:title
		:confirm-btn-lang-key
		data-testid="confirmation-dialog"
		@confirm="confirm"
		@cancel="cancel"
	>
		<template #content>
			<slot />
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { useInternalConfirmationDialog } from "./Confirmation.composable";
import { Dialog } from "@ui-dialog";
import { computed } from "vue";

const { confirm, cancel, dialogOptions, isDialogOpen } = useInternalConfirmationDialog();

const title = computed(() => (dialogOptions.value ? dialogOptions.value.message : ""));

const confirmBtnLangKey = computed(() => dialogOptions.value?.confirmActionLangKey ?? "common.actions.confirm");
</script>

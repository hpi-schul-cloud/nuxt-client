<template>
	<SvsDialog
		v-model="isDialogOpen"
		:title
		:confirm-btn-lang-key="dialogOptions?.confirmActionLangKey"
		data-testid="confirmation-dialog"
		@confirm="confirm"
		@cancel="cancel"
	>
		<template #content>
			<slot />
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { useInternalConfirmationDialog } from "./Confirmation.composable";
import { SvsDialog } from "@ui-dialog";
import { computed } from "vue";

const { confirm, cancel, dialogOptions, isDialogOpen } = useInternalConfirmationDialog();

const title = computed(() => (dialogOptions.value ? dialogOptions.value.message : ""));
</script>

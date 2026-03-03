<template>
	<SvsDialog
		v-model="isDialogOpen"
		data-testid="confirmation-dialog"
		:confirm-btn-lang-key="dialogOptions?.confirmActionLangKey"
		:title
		@confirm="confirm"
		@cancel="cancel"
	>
		<template #content>
			<div v-if="$slots.alert" class="alert-text mx-6 mb-4">
				<slot name="alert" />
			</div>
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

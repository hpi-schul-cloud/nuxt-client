<template>
	<Dialog v-model="isDialogOpen" :title :confirm-btn-lang-key data-testid="confirmation-dialog">
		<template #content>
			<div v-if="$slots.alert" class="alert-text">
				<slot name="alert" />
			</div>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { useInternalConfirmationDialog } from "./Confirmation.composable";
import { Dialog } from "@ui-dialog";
import { computed } from "vue";

const { dialogOptions, isDialogOpen } = useInternalConfirmationDialog();

const title = computed(() => (dialogOptions.value ? dialogOptions.value.message : ""));

const confirmBtnLangKey = computed(() => dialogOptions.value?.confirmActionLangKey ?? "common.actions.confirm");
</script>

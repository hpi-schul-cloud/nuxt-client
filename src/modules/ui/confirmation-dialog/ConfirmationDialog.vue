<template>
	<!-- ToDo: replace vCustomDialog with v-dailog, use component <UseFocusTrap>  -->
	<vCustomDialog
		data-testid="delete-dialog-item"
		has-buttons
		:confirm-btn-title-key="confirmBtnLangKey"
		@dialog-confirmed="onConfirmation"
		:is-open="isDialogOpen"
		@dialog-closed="onCloseDialog"
	>
		<template #title>
			<h2 class="text-h4 my-2 text-break-word">
				{{ message }}
			</h2>
		</template>
	</vCustomDialog>
</template>

<script setup lang="ts">
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { computed } from "vue";
import { useInternalConfirmationDialog } from "./Confirmation.composable";

const { confirm, cancel, dialogOptions, isDialogOpen } =
	useInternalConfirmationDialog();

const onConfirmation = () => confirm();
const onCloseDialog = () => cancel();

const message = computed(() =>
	dialogOptions.value ? dialogOptions.value.message : ""
);

const confirmBtnLangKey = computed(() =>
	dialogOptions.value ? dialogOptions.value.confirmActionLangKey : undefined
);
</script>

<style scoped>
.text-break-word {
	word-break: break-word;
}
</style>

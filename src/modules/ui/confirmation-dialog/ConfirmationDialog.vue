<template>
	<vCustomDialog
		data-testid="delete-dialog-item"
		:has-buttons="true"
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

<script lang="ts">
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { computed, defineComponent } from "vue";
import { useInternalConfirmationDialog } from "./Confirmation.composable";

export default defineComponent({
	name: "ConfirmationDialog",
	components: {
		vCustomDialog,
	},
	setup() {
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

		return {
			message,
			isDialogOpen,
			confirmBtnLangKey,
			onConfirmation,
			onCloseDialog,
		};
	},
});
</script>
<style scoped>
.text-break-word {
	word-break: break-word;
	white-space: normal;
}
</style>

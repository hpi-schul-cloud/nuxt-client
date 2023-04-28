<template>
	<vCustomDialog
		data-testid="delete-dialog-item"
		has-buttons
		confirm-btn-title-key="common.actions.remove"
		@dialog-confirmed="onDeleteConfirmation"
		:is-open="isDialogOpen"
		@dialog-closed="onCloseDialog"
	>
		<h2 slot="title" class="text-h4 my-2">
			{{ dialogOptions?.message }}
		</h2>
	</vCustomDialog>
</template>

<script lang="ts">
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { defineComponent, inject } from "vue";
import { useInternalDeleteConfirmation } from "./delete-confirmation.composable";

export default defineComponent({
	name: "CardDeleteConfirmation",
	components: {
		vCustomDialog,
	},
	setup() {
		const { confirm, cancel, dialogOptions, isDialogOpen } =
			useInternalDeleteConfirmation();

		const onDeleteConfirmation = () => confirm();
		const onCloseDialog = () => cancel();

		return {
			dialogOptions,
			isDialogOpen,
			onDeleteConfirmation,
			onCloseDialog,
		};
	},
});
</script>

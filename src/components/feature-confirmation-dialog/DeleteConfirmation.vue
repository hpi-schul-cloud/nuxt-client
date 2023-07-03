<template>
	<vCustomDialog
		data-testid="delete-dialog-item"
		:has-buttons="true"
		confirm-btn-title-key="common.actions.remove"
		@dialog-confirmed="onDeleteConfirmation"
		:is-open="isDialogOpen"
		@dialog-closed="onCloseDialog"
	>
		<h2 slot="title" class="text-h4 my-2 text-break-word">
			{{ message }}
		</h2>
	</vCustomDialog>
</template>

<script lang="ts">
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { computed, defineComponent } from "vue";
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

		const message = computed(() =>
			dialogOptions.value ? dialogOptions.value.message : ""
		);

		return {
			message,
			dialogOptions,
			isDialogOpen,
			onDeleteConfirmation,
			onCloseDialog,
		};
	},
});
</script>
<style scoped>
.text-break-word {
	word-break: break-word;
}
</style>

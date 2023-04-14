<template>
	<vCustomDialog
		data-testid="delete-dialog-item"
		:size="375"
		has-buttons
		confirm-btn-title-key="common.actions.remove"
		@dialog-confirmed="onDeleteConfirmation"
		:is-open="isOpen"
		@dialog-closed="onCloseDialog"
	>
		<h2 slot="title" class="text-h4 my-2">
			{{ $t("components.cardHost.cardDelete.modal.confirmation.title") }}
		</h2>
		<p slot="content" class="text-md mt-2">
			{{
				cardTitle == ""
					? $t("components.cardHost.cardDelete.modal.confirmation.text")
					: $t(
							"components.cardHost.cardDelete.modal.confirmation.textWithTitle",
							{
								cardTitle,
							}
					  )
			}}
		</p>
	</vCustomDialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { useVModel } from "@vueuse/core";

export default defineComponent({
	name: "CardDeleteConfirmation",
	components: {
		vCustomDialog,
	},
	props: {
		isDeleteModalOpen: {
			type: Boolean,
			required: true,
		},
		cardTitle: {
			type: String,
			default: "",
		},
	},
	emits: ["delete-confirm", "dialog-cancel"],
	setup(props, { emit }) {
		const isOpen = useVModel(props, "isDeleteModalOpen", emit);
		const onDeleteConfirmation = () => emit("delete-confirm");
		const onCloseDialog = () => emit("dialog-cancel");

		return {
			isOpen,
			onDeleteConfirmation,
			onCloseDialog,
		};
	},
});
</script>

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
			{{ $t("components.cardHost.deletionModal.confirmation.title") }}
		</h2>
		<p slot="content" class="text-md mt-2">
			{{ confirmationMessage }}
		</p>
	</vCustomDialog>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import VueI18n from "vue-i18n";
import { useVModel } from "@vueuse/core";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";

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
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const isOpen = useVModel(props, "isDeleteModalOpen", emit);

		const confirmationMessage = computed(() =>
			i18n?.t("components.cardHost.deletionModal.confirmation.text", {
				cardTitle: props.cardTitle ? `"${props.cardTitle}"` : "",
			})
		);

		const onDeleteConfirmation = () => emit("delete-confirm");
		const onCloseDialog = () => emit("dialog-cancel");

		return {
			confirmationMessage,
			isOpen,
			onDeleteConfirmation,
			onCloseDialog,
		};
	},
});
</script>

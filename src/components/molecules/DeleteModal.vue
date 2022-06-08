<template>
	<base-modal :active.sync="showDeleteModal" @onBackdropClick="closeModal">
		<template #header></template>
		<template #body>
			<modal-body-info
				:title="confirmationText"
				:description="$t('pages.courses._id.modal.description')"
			>
				<template #icon>
					<base-icon
						source="material"
						icon="report_problem"
						style="color: var(--color-danger)"
					/>
				</template>
			</modal-body-info>
		</template>
		<template #footerRight>
			<base-button design="text" @click="closeModal">
				{{ $t("common.actions.cancel") }}
			</base-button>
			<base-button class="delete-btn" @click="confirmDelete">
				<base-icon source="material" icon="delete" />
				{{ $t("common.actions.remove") }}
			</base-button>
		</template>
	</base-modal>
</template>

<script>
import BaseButton from "@basecomponents/BaseButton";
import BaseIcon from "@basecomponents/BaseIcon";

import BaseModal from "@basecomponents/BaseModal";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
export default {
	components: {
		BaseModal,
		ModalBodyInfo,
		BaseIcon,
		BaseButton,
	},
	props: {
		confirmationText: {
			type: String,
			required: true,
		},
		showDeleteModal: {
			type: Boolean,
		},
	},
	methods: {
		closeModal() {
			this.$emit("update:show-delete-modal", false);
		},
		confirmDelete() {
			this.$emit("delete");
			this.closeModal();
		},
	},
};
</script>

<style lang="scss" scoped>
.delete-btn {
	background-color: var(--color-danger) !important;
	&:hover {
		background-color: var(--color-danger-dark) !important;
	}
}
</style>

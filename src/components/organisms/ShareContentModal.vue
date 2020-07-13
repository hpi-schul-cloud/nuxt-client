<template>
	<div>
		<base-button
			:design="btnDesign"
			:class="btnClass"
			:size="btnSize"
			role="button"
			:aria-label="
				btnLabel ? btnLabel : `$t('components.molecules.ShareContentModal')`
			"
			@click.prevent="openModal"
		>
			<base-icon source="fa" icon="share-alt" />
			{{ btnLabel }}
		</base-button>
		<qr-modal :show-qr-modal.sync="showQrModal" @close="showQrModal = false">
		</qr-modal>
	</div>
</template>

<script>
import QrModal from "@components/molecules/QrModal";

export default {
	name: "ShareContentModal",
	components: {
		QrModal,
	},
	props: {
		btnLabel: { type: String, default: "" },
		btnDesign: { type: String, default: "" },
		btnSize: { type: String, default: "medium" },
		btnClass: { type: String, default: "" },
	},
	data() {
		return {
			showQrModal: false,
		};
	},
	methods: {
		openModal() {
			this.showQrModal = true;
		},
	},
};
</script>

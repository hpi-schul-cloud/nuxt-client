<template>
	<base-modal
		class="modal"
		:active="showShareModal"
		@onBackdropClick="closeModal"
	>
		<template v-slot:header>
			{{ $t("pages.content.modal.qr.title") }}
		</template>
		<template v-slot:body>
			<label class="token">
				{{ $t("pages.content.modal.qr.sub_title") }}
			</label>
			<input type="text" :value="getContentId" />
			<p class="qr-description">
				{{ $t("pages.content.modal.qr.description") }}
			</p>
			<menu-qr-code :print="false" :url="getQrLink"></menu-qr-code>
		</template>
		<template v-slot:footer>
			<modal-footer>
				<template v-slot:right>
					<base-button design="text" @click="closeModal">
						{{ $t("common.actions.close") }}
					</base-button>
				</template>
			</modal-footer>
		</template>
	</base-modal>
</template>

<script>
import ModalFooter from "@components/molecules/ModalFooter";
import MenuQrCode from "../legacy/MenuQrCode";
import BaseButton from "../base/BaseButton";
import BaseModal from "../base/BaseModal";

export default {
	name: "NotificationModal",
	components: {
		BaseModal,
		BaseButton,
		ModalFooter,
		MenuQrCode,
	},
	props: {
		showShareModal: {
			type: Boolean,
			required: true,
		},
		resource: { type: Object, default: () => {} },
		contentid: { type: String, default: "" },
	},
	data() {
		return {};
	},
	computed: {
		getContentId() {
			return this.resource.ref.id;
		},
		getQrLink() {
			return `${window.location.origin}/${this.resource.ref.id}`
		}
	},
	methods: {
		closeModal() {
			this.$emit("update:show-share-modal", false);
			this.$emit("close");
		},
	},
};
</script>

<style lang="scss" scoped>
.token {
	margin-bottom: var(--radius-lg);
	font-weight: var(--font-weight-bold);
}
	.qr-description {
		margin-top: var(--radius-lg);
	}
</style>

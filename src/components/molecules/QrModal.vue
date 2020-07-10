<template>
	<base-modal :active="showQrModal">
		<template v-slot:body>
			<modal-body-info
				title="Kopiercode wurde generiert"
				description="blah blah blah"
			/>
			<input type="text" :value="getContentId" />
			<p class="qr-description">
				{{ $t("pages.content.modal.qr.alternative") }}
			</p>
			<menu-qr-code :print="false"></menu-qr-code>
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
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import ModalFooter from "@components/molecules/ModalFooter";
import MenuQrCode from "../legacy/MenuQrCode";
import BaseButton from "../base/BaseButton";

export default {
	name: "NotificationModal",
	components: {
		BaseButton,
		ModalBodyInfo,
		ModalFooter,
		MenuQrCode,
	},
	props: {
		showQrModal: {
			type: Boolean,
			required: true,
		},
		resource: { type: Object, default: () => {} },
	},
	data() {
		return {};
	},
	computed: {
		getContentId () {
			return window.location.pathname.replace('/content/', '');
		}
	},
	methods: {
		closeModal() {
			this.$emit("update:show-qr-modal", false);
			this.$emit("close");
		},
	},
};
</script>

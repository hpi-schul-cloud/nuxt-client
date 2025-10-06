<template>
	<base-modal :active="showNotificationModal">
		<template #body>
			<modal-body-info :title="msg" :description="description">
				<template v-if="isSuccess" #icon>
					<v-icon size="60" color="success" :icon="mdiCheckCircle" />
				</template>
				<template v-else #icon>
					<v-icon size="60" color="error" :icon="mdiAlertCircle" />
				</template>
			</modal-body-info>
		</template>
		<template #footer>
			<modal-footer-confirm :is-error="!isSuccess" text="Ok" @click="closeModal" />
		</template>
	</base-modal>
</template>

<script>
import BaseModal from "../base/BaseModal.vue";
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo.vue";
import ModalFooterConfirm from "@/components/molecules/ModalFooterConfirm.vue";
import { mdiAlertCircle, mdiCheckCircle } from "@icons/material";
export default {
	name: "NotificationModal",
	components: {
		BaseModal,
		ModalBodyInfo,
		ModalFooterConfirm,
	},
	props: {
		showNotificationModal: {
			type: Boolean,
			required: true,
		},
		successMsg: {
			type: String,
			default: "",
		},
		errorMsg: {
			type: String,
			default: "",
		},
		description: {
			type: String,
			default: "",
		},
		isSuccess: {
			type: Boolean,
		},
	},
	emits: ["update:show-notification-modal", "close"],
	data() {
		return {
			mdiAlertCircle,
			mdiCheckCircle,
		};
	},
	computed: {
		msg: {
			get() {
				return this.isSuccess ? this.successMsg : this.errorMsg;
			},
			set: () => ({}),
		},
	},
	methods: {
		closeModal() {
			this.$emit("update:show-notification-modal", false);
			this.$emit("close");
		},
	},
};
</script>

<template>
	<base-modal :active="showNotificationModal">
		<template #body>
			<modal-body-info :title="msg" :description="description">
				<template v-if="isSuccess" #icon>
					<v-icon class="material-icon" color="var(--v-success-base)">
						$mdiCheckCircle
					</v-icon>
				</template>
				<template v-else #icon>
					<v-icon class="material-icon" color="var(--v-error-base)">
						$mdiAlertCircle
					</v-icon>
				</template>
			</modal-body-info>
		</template>
		<template #footer>
			<modal-footer-confirm
				:is-error="!isSuccess"
				text="Ok"
				@click="closeModal"
			/>
		</template>
	</base-modal>
</template>

<script>
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo";
import ModalFooterConfirm from "@/components/molecules/ModalFooterConfirm";
export default {
	name: "NotificationModal",
	components: {
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

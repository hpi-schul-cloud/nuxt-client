<template>
	<base-modal :active="showNotificationModal">
		<template v-slot:body>
			<modal-body-info :title="msg" :description="description">
				<template v-if="isSuccess" v-slot:icon>
					<base-icon
						source="material"
						icon="check_circle"
						:style="{ color: backgroundcolor }"
					/>
				</template>
				<template v-else v-slot:icon>
					<base-icon
						source="material"
						icon="error"
						:style="{ color: backgroundcolor }"
					/>
				</template>
			</modal-body-info>
		</template>
		<template v-slot:footer>
			<modal-footer-confirm
				:style="{ backgroundColor: backgroundcolor }"
				:is-erros="!isSuccess"
				text="Ok"
				@click="closeModal"
			/>
		</template>
	</base-modal>
</template>

<script>
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import ModalFooterConfirm from "@components/molecules/ModalFooterConfirm";
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
		backgroundcolor: {
			type: String,
			default() {
				return "var(--color-success)";
			},
		},
	},
	computed: {
		msg: {
			get() {
				return this.isSuccess ? this.successMsg : this.errorMsg;
			},
			set() {},
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

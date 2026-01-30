<template>
	<VDialog :model-value="showNotificationModal" width="480">
		<VCard>
			<VCardText class="d-flex flex-column align-center">
				<div class="my-4">
					<template v-if="isSuccess">
						<VIcon size="60" color="success" :icon="mdiCheckCircle" />
					</template>
					<template v-else>
						<VIcon size="60" color="error" :icon="mdiAlertCircle" />
					</template>
				</div>
				<h2 class="my-4">{{ msg }}</h2>
			</VCardText>
			<VCardActions>
				<VBtn
					:text="$t('common.actions.ok')"
					variant="flat"
					block
					:color="isSuccess ? 'success' : 'error'"
					@click="closeModal"
				/>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import { mdiAlertCircle, mdiCheckCircle } from "@icons/material";

export default {
	name: "NotificationModal",
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

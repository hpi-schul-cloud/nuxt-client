<template>
	<v-alert
		v-model="isAlertShown"
		:icon
		:type="notification.status"
		class="alert"
		closable
		max-width="400"
		min-width="200"
		border="start"
		@update:model-value="closeNotification"
	>
		<div class="alert-text mr-2" data-testId="alert-text">
			{{ notification.text }}
		</div>
	</v-alert>
</template>

<script setup lang="ts">
import {
	mdiAlert,
	mdiAlertCircle,
	mdiCheckCircle,
	mdiInformation,
} from "@icons/material";
import { computed, PropType, ref } from "vue";
import { AlertPayload, AlertStatus, useNotificationStore } from "@data-app";

const props = defineProps({
	notification: {
		type: Object as PropType<AlertPayload>,
		required: true,
	},
});
const { removeNotifier } = useNotificationStore();

const isAlertShown = ref(true);

const closeNotification = () => {
	removeNotifier(props.notification);
	isAlertShown.value = false;
};

const statusIcons: { [status in AlertStatus]: string } = {
	success: mdiCheckCircle,
	warning: mdiAlert,
	error: mdiAlertCircle,
	info: mdiInformation,
};

const icon = computed(
	() => statusIcons[props.notification.status] ?? undefined
);
</script>

<style lang="scss" scoped>
.alert {
	margin: 0 12px 12px 0;
	overflow: hidden;
	background-color: rgba(var(--v-theme-white)) !important;
}

:deep(.v-btn__content .v-icon),
.alert-text {
	color: rgba(var(--v-theme-on-background)) !important;
}
</style>

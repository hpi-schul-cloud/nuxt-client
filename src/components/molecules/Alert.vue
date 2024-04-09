<template>
	<v-alert
		v-model="showNotifier"
		:icon="icon"
		:type="status"
		class="alert"
		closable
		max-width="400"
		min-width="200"
		:close-label="$t('common.labels.close')"
		border="start"
		@update:modelValue="closeNotification"
	>
		<div v-if="messages" class="alert_text mr-2">
			<div v-for="(message, index) in messages" :key="index" class="mb-1">
				<b>{{ message.title }}</b>
				<p class="mb-0">{{ message.text }}</p>
			</div>
		</div>
		<div v-else class="alert_text mr-2">
			{{ text }}
		</div>
	</v-alert>
</template>

<script setup lang="ts">
import {
	mdiAlert,
	mdiAlertCircle,
	mdiCheckCircle,
	mdiInformation,
} from "@mdi/js";
import { computed } from "vue";

const props = defineProps({
	notification: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["remove:notification"]);

const closeNotification = () => {
	emit("remove:notification", props.notification);
};

const icon = computed(() => {
	if (props.notification.status === "success") return mdiCheckCircle;
	if (props.notification.status === "warning") return mdiAlert;
	if (props.notification.status === "error") return mdiAlertCircle;
	if (props.notification.status === "info") return mdiInformation;
	return undefined;
});

const messages = computed(() => props.notification.messages);

const showNotifier = computed({
	get() {
		return props.notification !== undefined;
	},
	set() {
		closeNotification();
	},
});

const status = computed(() => props.notification.status);

const text = computed(() => props.notification.text);
</script>

<style lang="scss" scoped>
.alert {
	margin: 0 var(--space-sm) var(--space-sm) 0;
	overflow: hidden;
	background-color: rgba(var(--v-theme-white)) !important;
}

:deep(.v-btn__content .v-icon),
.alert_text {
	color: rgba(var(--v-theme-black)) !important;
}
</style>

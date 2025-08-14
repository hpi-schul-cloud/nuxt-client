<template>
	<v-alert
		v-model="showNotifier"
		:icon="icon"
		:type="status"
		class="alert"
		closable
		max-width="400"
		min-width="200"
		border="start"
		@update:model-value="closeNotification"
	>
		<div class="alert-text mr-2" data-testId="alert-text">
			{{ text }}
		</div>
	</v-alert>
</template>

<script setup lang="ts">
import { AlertPayload } from "@/store/types/alert-payload";
import {
	mdiAlert,
	mdiAlertCircle,
	mdiCheckCircle,
	mdiInformation,
} from "@icons/material";
import { computed, PropType, Ref, ref } from "vue";

const props = defineProps({
	notification: {
		type: Object as PropType<AlertPayload>,
		required: true,
	},
});

const showNotifier: Ref<boolean> = ref(true);

const emit = defineEmits(["remove:notification"]);

const closeNotification = () => {
	emit("remove:notification", props.notification);
	showNotifier.value = false;
};

const icon = computed(() => {
	if (props.notification.status === "success") return mdiCheckCircle;
	if (props.notification.status === "warning") return mdiAlert;
	if (props.notification.status === "error") return mdiAlertCircle;
	if (props.notification.status === "info") return mdiInformation;
	return undefined;
});

const status = computed(() => props.notification.status);

const text = computed(() => props.notification.text);
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

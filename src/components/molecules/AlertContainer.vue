<template>
	<div
		:class="{
			'alert-wrapper-mobile': isMobile,
			'alert-wrapper': !isMobile,
		}"
	>
		<transition-group :name="transition">
			<v-alert
				v-for="notification in notifierItems"
				:key="notification.id"
				:type="notification.status"
				:icon="statusIcons[notification.status]"
				class="alert"
				closable
				max-width="400"
				min-width="200"
				border="start"
				@click:close="removeNotifier(notification.id)"
			>
				<div class="alert-text mr-2" data-testId="alert-text">
					{{ notification.text }}
				</div>
			</v-alert>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { AlertStatus, useNotificationStore } from "@data-app";
import { storeToRefs } from "pinia";
import {
	mdiAlert,
	mdiAlertCircle,
	mdiCheckCircle,
	mdiInformation,
} from "@icons/material";

const { notifierItems } = storeToRefs(useNotificationStore());
const { removeNotifier } = useNotificationStore();

const { xs: isMobile } = useDisplay();

const transition = computed(() =>
	isMobile.value ? "scale-transition" : "scroll-x-reverse-transition"
);

const statusIcons: { [status in AlertStatus]: string } = {
	success: mdiCheckCircle,
	warning: mdiAlert,
	error: mdiAlertCircle,
	info: mdiInformation,
};
</script>

<style lang="scss" scoped>
.alert-wrapper {
	position: fixed;
	right: 0;
	z-index: 50;
	overflow: visible;
}

.alert-wrapper-mobile {
	position: fixed;
	right: 0;
	bottom: 5vh;
	left: 0;
	z-index: 50;
	overflow: visible;
}

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

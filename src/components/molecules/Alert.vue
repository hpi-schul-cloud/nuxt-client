<template>
	<div
		:class="{
			'alert-wrapper-mobile': isMobile,
			'alert-wrapper': !isMobile,
		}"
	>
		<Transition :name="transition">
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
		</Transition>
	</div>
</template>

<script>
import { notifierModule } from "@/store";
import {
	mdiAlert,
	mdiAlertCircle,
	mdiCheckCircle,
	mdiClose,
	mdiInformation,
} from "@mdi/js";

export default {
	data() {
		return {
			mdiClose,
			mdiAlert,
			mdiAlertCircle,
			mdiCheckCircle,
			mdiInformation,
		};
	},
	inject: ["mq"],
	computed: {
		notifierData() {
			return notifierModule.getNotifier;
		},
		status() {
			return this.notifierData?.status;
		},
		isMobile() {
			return this.mq.current === "mobile";
		},
		text() {
			return this.notifierData?.text;
		},
		messages() {
			return this.notifierData?.messages;
		},
		transition() {
			return this.isMobile ? "scale-transition" : "scroll-x-reverse-transition";
		},
		icon() {
			if (this.status === "success") return mdiCheckCircle;
			if (this.status === "warning") return mdiAlert;
			if (this.status === "error") return mdiAlertCircle;
			if (this.status === "info") return mdiInformation;
			return undefined;
		},
		showNotifier: {
			get() {
				return this.notifierData !== undefined;
			},
			set() {
				this.closeNotification();
			},
		},
	},
	methods: {
		closeNotification() {
			notifierModule.setNotifier(undefined);
		},
	},
};
</script>

<style lang="scss" scoped>
.alert-wrapper {
	position: fixed;
	right: 0;
	z-index: var(--layer-tooltip);
	overflow: visible;
}

.alert-wrapper-mobile {
	position: fixed;
	right: 0;
	bottom: 5vh;
	left: 0;
	z-index: var(--layer-tooltip);
	overflow: visible;
}

.alert {
	margin: 0 var(--space-sm);
	overflow: hidden;
	background-color: rgba(var(--v-theme-white)) !important;
}

:deep(.v-btn__content .v-icon),
.alert_text {
	color: rgba(var(--v-theme-black)) !important;
}
</style>

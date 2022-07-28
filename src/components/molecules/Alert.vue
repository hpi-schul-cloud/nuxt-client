<template>
	<div :class="{ 'alert_wrapper-mobile': isMobile, alert_wrapper: !isMobile }">
		<v-alert
			v-model="show"
			:icon="icon"
			:transition="
				isMobile ? 'scale-transition' : 'scroll-x-reverse-transition'
			"
			:type="status"
			class="alert"
			dismissible
			max-width="400"
			min-width="200"
			text
			:close-icon="mdiClose"
			border="left"
		>
			<div class="alert_text mr-2">
				{{ text }}
			</div>
		</v-alert>
	</div>
</template>

<script>
import { notifierModule } from "@/store";
import { mdiAlert, mdiCheckCircle, mdiClose, mdiInformation } from "@mdi/js";

const DEFAULT_TIMEOUT = 5000;

export default {
	data() {
		return {
			show: false,
			timeoutId: undefined,
			mdiClose,
			mdiAlert,
			mdiCheckCircle,
			mdiInformation,
		};
	},
	computed: {
		notifierData() {
			return notifierModule.getNotifier;
		},
		status() {
			return this.notifierData?.status;
		},
		isMobile() {
			return this.$mq === "mobile";
		},
		text() {
			return this.notifierData?.text;
		},
		icon() {
			if (this.status === "success") return mdiCheckCircle;
			if (this.status === "warning") return mdiAlert;
			if (this.status === "error") return mdiAlert;
			if (this.status === "info") return mdiInformation;
			return undefined;
		},
	},
	watch: {
		notifierData() {
			this.show = true;
			if (this.notifierData.timeout === 0) return;
			clearTimeout(this.timeoutId);
			this.timeoutId = setTimeout(() => {
				this.show = false;
			}, this.notifierData.timeout || DEFAULT_TIMEOUT);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.alert_wrapper {
	position: absolute;
	top: 0;
	right: 0;
	z-index: var(--layer-tooltip);
	overflow: visible;
}

.alert_wrapper-mobile {
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
	background-color: var(--color-white) !important;
}

::v-deep .v-btn__content .v-icon,
.alert_text {
	color: var(--color-black) !important;
}

::v-deep .v-alert__border {
	opacity: 1;
}
</style>

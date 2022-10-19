<template>
	<div
		:class="{ 'alert-wrapper-mobile': isMobile, 'alert-wrapper': !isMobile }"
	>
		<v-alert
			v-model="show"
			:icon="icon"
			:transition="transition"
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
		transition() {
			return this.isMobile ? "scale-transition" : "scroll-x-reverse-transition";
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
			if (this.notifierData.autoClose === false) return;
			clearTimeout(this.timeoutId);
			this.timeoutId = setTimeout(() => {
				this.show = false;
			}, this.notifierData.timeout);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/variables";

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
	background-color: var(--v-white-base) !important;
}

::v-deep .v-btn__content .v-icon,
.alert_text {
	color: var(--v-black-base) !important;
}

::v-deep .v-alert__border {
	opacity: 1;
}
</style>

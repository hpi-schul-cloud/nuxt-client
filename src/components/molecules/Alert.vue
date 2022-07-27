<template>
	<div :class="{ 'alert_wrapper-mobile': isMobile, alert_wrapper: !isMobile }">
		<v-alert
			v-model="show"
			:type="status"
			text
			dismissible
			class="alert"
			:icon="icon"
			max-width="400"
			min-width="200"
			:transition="
				isMobile ? 'scale-transition' : 'scroll-x-reverse-transition'
			"
		>
			<div class="alert_accent" :class="[status]"></div>
			<div class="alert_text mr-2">
				{{ text }}
			</div>
		</v-alert>
	</div>
</template>

<script>
import { notifierModule } from "@/store";
import { mdiClose, mdiAlert, mdiCheckCircle, mdiInformation } from "@mdi/js";
export default {
	data() {
		return {
			show: false,
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
			return this.notifierData?.status || "info";
		},
		isMobile() {
			return this.$mq === "mobile";
		},
		text() {
			return (
				this.notifierData?.text || `Ich bin ein Alert mit sehr langer message `
			);
		},
		icon() {
			if (this.status === "success") return mdiCheckCircle;
			if (this.status === "warning") return mdiAlert;
			if (this.status === "danger") return mdiAlert;
			if (this.status === "info") return mdiInformation;
			return undefined;
		},
	},
	watch: {
		notifierData() {
			this.show = true;

			// todo improve timeout to cancel old one
			setTimeout(() => {
				this.show = false;
			}, this.timeout || 5000);
		},
	},
	created() {
		setTimeout(() => {
			notifierModule.show({
				text: "Test aus created",
				status: "success",
				timeout: 500,
			});
		}, 500);
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.alert_wrapper {
	position: absolute;
	top: 0;
	right: 0;
	overflow: visible;
	z-index: 50; // TODO where are z-index vars?
}
.alert_wrapper-mobile {
	position: fixed;
	bottom: 5vh;
	right: 0;
	left: 0;
	overflow: visible;
	z-index: 50;
}

.alert {
	margin: 0 12px 0 12px;
	overflow: hidden;
	background-color: white !important;
}

.alert_text {
	color: var(--color-black);
}

.alert_accent {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	width: 5px;
	background-color: transparent;

	&.success {
		background-color: var(--color-success-dark);
	}

	&.warning {
		background-color: var(--color-warning-dark);
	}

	&.danger {
		background-color: var(--color-danger-dark);
	}
}
</style>

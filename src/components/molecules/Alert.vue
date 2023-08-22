<template>
	<div
		:class="{
			'alert-wrapper-mobile': isMobile,
			'alert-wrapper': !isMobile,
		}"
	>
		<v-alert
			v-model="isVisible"
			:icon="icon"
			:transition="transition"
			:type="status"
			class="alert"
			dismissible
			max-width="400"
			min-width="200"
			text
			close-icon="$mdiClose"
			:close-label="$t('common.labels.close')"
			border="left"
			@input="onCloseNotification"
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
	</div>
</template>

<script lang="ts">
import { notifierModule } from "@/store";
import { computed, defineComponent } from "vue";
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { useMediaQuery } from "@vueuse/core";

export default defineComponent({
	setup: () => {
		const notifierData = computed(() => notifierModule.getNotifier);

		const isMobile = useMediaQuery(DeviceMediaQuery.Mobile);
		const isVisible = computed(() => notifierData.value !== undefined);
		const status = computed(() => notifierData.value?.status);
		const text = computed(() => notifierData.value?.text);
		const messages = computed(() => notifierData.value?.messages);
		const icon = computed(() => {
			if (status.value === "success") return "$mdiCheckCircle";
			if (status.value === "warning") return "$mdiAlert";
			if (status.value === "error") return "$mdiAlert";
			if (status.value === "info") return "$mdiInformation";
			return undefined;
		});
		const transition = isMobile
			? "scale-transition"
			: "scroll-x-reverse-transition";

		const onCloseNotification = () => {
			notifierModule.setNotifier(undefined);
		};

		return {
			status,
			text,
			messages,
			icon,
			isVisible,
			isMobile,
			transition,
			onCloseNotification,
		};
	},
});
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

<template>
	<div
		:class="{
			'alert-wrapper-mobile': isMobile,
			'alert-wrapper': !isMobile,
		}"
	>
		<transition-group :name="transition">
			<Alert
				v-for="(notification, index) in notifierItems"
				:notification="notification"
				:key="index"
				@remove:notification="onRemoveNotification"
			/>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
import Alert from "./Alert.vue";
import { AlertPayload } from "@/store/types/alert-payload";
import { computed, inject } from "vue";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

const mq: { current: string } | undefined = inject("mq");
if (mq === undefined) {
	throw new Error("mq is undefined");
}

const isMobile = computed(() => {
	return mq.current === "mobile";
});

const notifierItems: AlertPayload[] = notifierModule.getNotifierItems;

const onRemoveNotification = (notification: AlertPayload) => {
	notifierModule.removeNotifier(notification);
};

const transition = computed(() => {
	return isMobile.value ? "scale-transition" : "scroll-x-reverse-transition";
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
</style>

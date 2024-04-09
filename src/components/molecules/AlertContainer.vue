<template>
	<div
		:class="{
			'alert-wrapper-mobile': isMobile,
			'alert-wrapper': !isMobile,
		}"
	>
		<transition-group :name="transition">
			<Alert
				v-for="notification in notifierData"
				:notification="notification"
				:key="notification"
				@remove:notification="onRemoveNotification"
			/>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
import { notifierModule } from "@/store";
import Alert from "./Alert.vue";
import { AlertPayload } from "@/store/types/alert-payload";
import { computed, inject } from "vue";

const isMobile = computed(() => {
	return mq.current === "mobile";
});

const mq = inject("mq");

const notifierData: AlertPayload[] = notifierModule.getNotifier;

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

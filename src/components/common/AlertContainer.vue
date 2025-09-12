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
				:key="index"
				:notification="notification"
				@remove:notification="onRemoveNotification"
			/>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import Alert from "./Alert.vue";
import { AlertPayload } from "@/store/types/alert-payload";

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { xs } = useDisplay();

const isMobile = computed(() => {
	return xs.value;
});

const transition = computed(() => {
	return isMobile.value ? "scale-transition" : "scroll-x-reverse-transition";
});

const notifierItems = computed(() => {
	return notifierModule.getNotifierItems;
});

const onRemoveNotification = (notification: AlertPayload) => {
	notifierModule.removeNotifier(notification);
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
</style>

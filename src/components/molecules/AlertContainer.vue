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
import Alert from "./Alert.vue";
import { AlertPayload } from "@/store/types/alert-payload";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { computed } from "vue";
import { useDisplay } from "vuetify";

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { xs } = useDisplay();

const isMobile = computed(() => xs.value);

const transition = computed(() => (isMobile.value ? "scale-transition" : "scroll-x-reverse-transition"));

const notifierItems = computed(() => notifierModule.getNotifierItems);

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

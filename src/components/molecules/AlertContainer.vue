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
			/>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import Alert from "./Alert.vue";
import { useNotificationStore } from "@data-app";
import { storeToRefs } from "pinia";

const { notifierItems } = storeToRefs(useNotificationStore());
const { xs: isMobile } = useDisplay();

const transition = computed(() =>
	isMobile.value ? "scale-transition" : "scroll-x-reverse-transition"
);
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

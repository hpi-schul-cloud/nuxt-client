<template>
	<VToolbar color="white" density="compact" elevation="2">
		<VContainer :class="{ 'center-xs-logo': isExtraSmallDevice }" class="top-container pa-0">
			<a href="/">
				<img :src="logo" class="logo" alt="Schulcloud Logo" :class="{ 'center-xs-img': isExtraSmallDevice }" />
			</a>
		</VContainer>
	</VToolbar>
	<VMain>
		<ApplicationError>
			<AlertContainer />
		</ApplicationError>
		<VContainer :class="['main-container', { 'main-container-xs': isExtraSmallDevice }]">
			<slot />
		</VContainer>
	</VMain>
	<TheFooter />
</template>

<script setup lang="ts">
import logo from "@/assets/img/logo/logo-image-mono.svg";
import TheFooter from "@/components/legacy/TheFooter.vue";
import { AlertContainer, ApplicationError } from "@ui-layout";
import { computed } from "vue";
import { useDisplay } from "vuetify";

const { xs } = useDisplay();
const isExtraSmallDevice = computed(() => xs.value);
</script>

<style lang="scss" scoped>
.main-container {
	width: 70vw;
}
.main-container-xs {
	width: 100%;
}
.center-xs-logo {
	justify-content: center !important;
}
.center-xs-img {
	display: block;
	margin-left: auto;
	margin-right: auto;
}
.top-container {
	margin-left: calc((100vw - 70vw) / 2);
}
.logo {
	height: var(--topbar-height);
}
</style>

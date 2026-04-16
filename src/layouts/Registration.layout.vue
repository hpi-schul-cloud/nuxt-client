<template>
	<VToolbar color="white" density="compact" elevation="2">
		<VContainer class="top-container pa-0">
			<a href="/">
				<img :src="logo" class="logo" alt="Schulcloud Logo" :class="{ 'centered-img': isSmallDevice }" />
			</a>
		</VContainer>
	</VToolbar>
	<VMain>
		<ApplicationError>
			<AlertContainer />
		</ApplicationError>
		<VContainer :class="['main-container', { 'main-container-sm': isSmallDevice }]">
			<slot />
		</VContainer>
	</VMain>
	<TheFooter />
</template>

<script setup lang="ts">
import TheFooter from "@/components/legacy/TheFooter.vue";
import { useEnvConfig } from "@data-env";
import { AlertContainer, ApplicationError } from "@ui-layout";
import { computed } from "vue";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();
const isSmallDevice = computed(() => smAndDown.value);

const themeAssets = {
	brb: { logo: new URL("/src/assets/img/logo/brb/logo-image-mono.svg", import.meta.url).href },
	n21: { logo: new URL("/src/assets/img/logo/n21/logo-image-mono.svg", import.meta.url).href },
	thr: { logo: new URL("/src/assets/img/logo/thr/logo-image-mono.svg", import.meta.url).href },
	default: { logo: new URL("/src/assets/img/logo/default/logo-image-mono.svg", import.meta.url).href },
};

const logo = computed(() => themeAssets[useEnvConfig().value.SC_THEME]?.logo);
</script>

<style lang="scss" scoped>
.main-container {
	width: 70vw;
}
.main-container-sm {
	width: 100%;
}
.centered-img {
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

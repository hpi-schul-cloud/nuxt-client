<template>
	<a href="/dashboard">
		<img :src="logo" :alt="altText" />
	</a>
</template>

<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const themeAssets = {
	brb: { logo: new URL("/src/assets/img/logo/brb/nav-cloud-logo.svg", import.meta.url).href },
	n21: { logo: new URL("/src/assets/img/logo/n21/nav-cloud-logo.svg", import.meta.url).href },
	thr: { logo: new URL("/src/assets/img/logo/thr/nav-cloud-logo.svg", import.meta.url).href },
	default: { logo: new URL("/src/assets/img/logo/default/nav-cloud-logo.svg", import.meta.url).href },
};

const logo = computed(() => themeAssets[useEnvConfig().value.SC_THEME]?.logo);

const altText = useEnvConfig().value.SC_TITLE + " " + t("global.cloudLogo");
</script>

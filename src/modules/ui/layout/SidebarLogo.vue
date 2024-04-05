<template>
	<a href="/">
		<img src="@/assets/img/logo/logo-image-mono.svg" :alt="altText" />
	</a>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";

const { t } = useI18n();
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

const altText =
	envConfigModule.getEnv.SC_TITLE + " " + t("global.sidebar.logo");
</script>

<template>
	<a href="/dashboard">
		<img :src="logo" :alt="altText" />
	</a>
</template>

<script setup lang="ts">
import { imgCloudLogoAssets } from "@/utils/image.utils";
import { useEnvConfig } from "@data-env";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const logo = computed(() => imgCloudLogoAssets[useEnvConfig().value.SC_THEME]?.logo);

const altText = useEnvConfig().value.SC_TITLE + " " + t("global.cloudLogo");
</script>

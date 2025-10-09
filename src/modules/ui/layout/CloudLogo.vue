<template>
	<a href="/dashboard">
		<img src="@/assets/img/logo/nav-cloud-logo.svg" :alt="altText" />
	</a>
</template>

<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const altText = useEnvConfig().value.SC_TITLE + " " + t("global.cloudLogo");
</script>

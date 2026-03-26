<template>
	<div class="container">
		<h1>{{ t("pages.security.headline") }}</h1>
		<p>
			<span>{{ t("pages.security.text") }}</span>
			<a href="mailto:security@dbildungscloud.de">security@dbildungscloud.de</a>
		</p>
	</div>
</template>

<script setup>
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useTitle(buildPageTitle(t("pages.security.headline")));
</script>

<style scoped>
.container {
	max-width: 900px;
	margin: auto;
}
</style>

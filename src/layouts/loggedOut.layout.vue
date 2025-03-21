<template>
	<div class="page">
		<div class="topbar" data-testid="logged-out-top-bar">
			<navigation-bar :img="Logo" :links="navbarItems" />
		</div>
		<div :class="isMobile ? 'small-wrapper' : 'wrapper'">
			<slot />
		</div>
		<the-footer class="footer" />
		<application-error-routing />
	</div>
</template>

<script setup lang="ts">
import NavigationBar from "@/components/legacy/NavigationBar.vue";
import TheFooter from "@/components/legacy/TheFooter.vue";
import ApplicationErrorRouting from "@/components/molecules/ApplicationErrorRouting.vue";
import Logo from "@/assets/img/logo/logo-image-mono.svg";
import { injectStrict, ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const { t } = useI18n();
const { xs } = useDisplay();

const ghostBaseUrl = computed(() => envConfigModule.getEnv.GHOST_BASE_URL);

const navbarItems = computed(() => [
	{
		title: t("global.topbar.loggedOut.actions.steps"),
		href: `${ghostBaseUrl.value}/erste-schritte/`,
		target: "_blank",
	},
	{
		title: t("global.topbar.loggedOut.actions.blog"),
		href: `${ghostBaseUrl.value}/`,
		target: "_blank",
	},
	{
		title: t("global.topbar.loggedOut.actions.faq"),
		href: `${ghostBaseUrl.value}/faqs/`,
		target: "_blank",
	},
]);

const isMobile = computed(() => {
	return xs.value;
});
</script>

<style lang="scss" scoped>
.page {
	display: grid;
	grid-template-areas:
		"side top"
		"side content"
		"side footer";
	grid-template-rows: auto 1fr auto;
	grid-template-columns: 0 1fr;
	max-width: 100%;
	min-height: 100vh;
}

.topbar {
	grid-area: top;
}

.footer {
	grid-area: footer;
}

.small-wrapper {
	grid-area: content;
	min-height: 100vh;
	padding: var(--space-md);
}

.wrapper {
	grid-area: content;
	min-height: calc(100vh - var(--legacy-topbar-height));
	padding-right: calc(15 * var(--border-width));
	padding-left: calc(15 * var(--border-width));
	margin: var(--space-lg) auto;
}

@media (min-width: 576px) {
	.wrapper {
		width: 540px;
		max-width: 100%;
	}
}

@media (min-width: 768px) {
	.wrapper {
		width: 720px;
		max-width: 100%;
	}
}

@media (min-width: 992px) {
	.wrapper {
		width: 960px;
		max-width: 100%;
	}
}

@media (min-width: 1200px) {
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 1140px;
		max-width: 100%;
	}
}
</style>

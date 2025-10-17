<template>
	<div class="page">
		<div class="topbar" data-testid="logged-out-top-bar">
			<NavigationBar :img="Logo" :links="navbarItems" />
		</div>
		<div :class="isMobile ? 'small-wrapper' : 'wrapper'">
			<slot />
		</div>
		<TheFooter />
	</div>
</template>

<script setup lang="ts">
import Logo from "@/assets/img/logo/logo-image-mono.svg";
import NavigationBar from "@/components/legacy/NavigationBar.vue";
import TheFooter from "@/components/legacy/TheFooter.vue";
import { useAppStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { xs } = useDisplay();
const { applicationError } = useAppStoreRefs();
const router = useRouter();

const ghostBaseUrl = computed(() => useEnvConfig().value.GHOST_BASE_URL);

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

const isMobile = computed(() => xs.value);

watch(
	() => applicationError.value?.status,
	(to) => {
		if (to !== undefined) {
			// prevent NavigationDuplicated error: "navigationduplicated avoided redundant navigation to current location"
			if (router.currentRoute.value.path !== "/error") {
				router.replace("/error");
			}
		}
	},
	{ immediate: true }
);
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
	padding: 16px;
}

.wrapper {
	grid-area: content;
	min-height: calc(100vh - var(--legacy-topbar-height));
	padding-right: 15px;
	padding-left: 15px;
	margin: 24px auto;
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

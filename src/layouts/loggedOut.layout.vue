<template>
	<div class="page">
		<div class="topbar" data-testid="logged-out-top-bar">
			<navigation-bar
				:buttons="true"
				:img="require('@/assets/img/logo/logo-image-mono.svg')"
				:links="navbarItems"
			/>
		</div>
		<div :class="isMobile ? 'small-wrapper' : 'wrapper'">
			<slot />
		</div>
		<the-footer class="footer" />
		<application-error-routing />
	</div>
</template>

<script>
import NavigationBar from "@/components/legacy/NavigationBar";
import TheFooter from "@/components/legacy/TheFooter.vue";
import ApplicationErrorRouting from "@/components/molecules/ApplicationErrorRouting";
import { envConfigModule } from "@/store";

export default {
	name: "LoggedOutLayout",

	components: {
		ApplicationErrorRouting,
		NavigationBar,
		TheFooter,
	},

	inject: { mq: "mq" },

	computed: {
		ghostBaseUrl() {
			return envConfigModule.getEnv.GHOST_BASE_URL;
		},
		navbarItems() {
			return [
				{
					title: this.$t("global.topbar.loggedOut.actions.steps"),
					href: `${this.ghostBaseUrl}/erste-schritte/`,
					target: "_blank",
				},
				{
					title: this.$t("global.topbar.loggedOut.actions.blog"),
					href: `${this.ghostBaseUrl}/`,
					target: "_blank",
				},
				{
					title: this.$t("global.topbar.loggedOut.actions.faq"),
					href: `${this.ghostBaseUrl}/faqs/`,
					target: "_blank",
				},
			];
		},
		isMobile() {
			return this.mq.current === "mobile";
		},
	},
};
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
	min-height: calc(100vh - var(--topbar-height));
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

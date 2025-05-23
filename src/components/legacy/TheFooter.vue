<template>
	<!-- HINT for Devs – dBildungscloud (default theme) footer is the only one with he link 'Secuurity'; the other instances are not using this link.  -->
	<footer class="footer">
		<div>
			<template v-for="(link, index) in links">
				<span v-if="index !== 0" :key="index"> - </span>
				<template v-if="!link.innerlinks">
					<base-link :key="link.text" class="footer-link" v-bind="link">{{
						link.text
					}}</base-link>
				</template>
				<template v-else>
					<span :key="link.text">{{ link.text }}: </span>
					<template
						v-for="(innerlink, innerindex) in link.innerlinks"
						:key="innerlink.text"
					>
						<span v-if="innerindex !== 0" :key="`${index}-${innerindex}`">
							/
						</span>
						<base-link v-bind="innerlink" class="footer-link">{{
							innerlink.text
						}}</base-link>
					</template>
				</template>
			</template>
		</div>
		<p class="bottom-line">
			<span>©{{ currentYear }} {{ $theme.name }}</span>
			| Made with
			<span class="heart">❤</span> in Potsdam |
			{{ $t("components.legacy.footer.powered_by") }}
			<base-link href="https://lokalise.com" target="_blank" :no-styles="true"
				><img
					class="poweredby-logo"
					src="@/assets/img/lokalise_logo.svg"
					:alt="$t('components.legacy.footer.lokalise_logo_alt')"
			/></base-link>
		</p>
	</footer>
</template>

<script>
import { authModule, envConfigModule } from "@/store";

export default {
	computed: {
		school() {
			return authModule.getSchool;
		},
		currentYear() {
			return new Date().getFullYear();
		},
		links() {
			const links = [
				{
					to: "/imprint",
					text: this.$t("components.legacy.footer.imprint"),
				},
				{
					href: "/termsofuse",
					text: this.$t("components.legacy.footer.terms"),
					target: "_blank",
					rel: "noopener",
				},
				{
					to: "/privacypolicy",
					text: this.$t("components.legacy.footer.privacy_policy"),
					target: "_blank",
					rel: "noopener",
				},
				{
					href: "mailto:support@dbildungscloud.de?subject=dBildungscloud%20Anfrage",
					text: this.$t("components.legacy.footer.contact"),
				},
				{
					href: "https://github.com/hpi-schul-cloud",
					text: this.$t("components.legacy.footer.github"),
				},
			];
			if (envConfigModule.getEnv.ALERT_STATUS_URL) {
				links.push({
					href: envConfigModule.getEnv.ALERT_STATUS_URL,
					text: this.$t("components.legacy.footer.status"),
					target: "_blank",
					rel: "noopener",
				});
			}
			links.push({
				to: "/security",
				text: this.$t("components.legacy.footer.security"),
			});
			return links;
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/styles/mixins" as *;

.footer {
	width: 100%;
	padding: 0 var(--space-md);
	margin: var(--space-lg) 0 var(--space-md);
	text-align: center;

	@include breakpoint(tablet) {
		max-width: calc(100vw - var(--sidebar-width-tablet));
	}

	@include breakpoint(desktop) {
		max-width: calc(100vw - var(--sidebar-width));
	}
}

.top-line {
	display: flex;
	align-items: center;
	justify-content: center;

	.hpi-logo {
		display: block;
		height: var(--heading-3);
		margin: 0;
	}
}

.bottom-line {
	margin-top: var(--space-xs);

	.heart {
		color: rgba(var(--v-theme-primary));
	}

	.poweredby-logo {
		height: 1em;
		vertical-align: middle;
	}
}

.footer-link {
	color: rgba(var(--v-theme-primary));
	border: none;

	&:focus,
	&:hover {
		color: rgba(var(--v-theme-primary-darken-1));
		text-decoration: underline;
	}

	&:visited {
		color: rgba(var(--v-theme-primary));
	}
}
</style>

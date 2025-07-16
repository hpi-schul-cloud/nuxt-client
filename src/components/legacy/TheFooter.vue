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

<script setup lang="ts">
import { envConfigModule } from "@/store";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const currentYear = computed(() => new Date().getFullYear());
const links = computed(() => {
	const baseLinks = [
		{
			to: "/imprint",
			text: t("components.legacy.footer.imprint"),
		},
		{
			href: "/termsofuse",
			text: t("components.legacy.footer.terms"),
			target: "_blank",
			rel: "noopener",
		},
		{
			to: "/privacypolicy",
			text: t("components.legacy.footer.privacy_policy"),
			target: "_blank",
			rel: "noopener",
		},
		{
			href: "mailto:support@dbildungscloud.de?subject=dBildungscloud%20Anfrage",
			text: t("components.legacy.footer.contact"),
		},
		{
			href: "https://github.com/hpi-schul-cloud",
			text: t("components.legacy.footer.github"),
		},
	];

	if (envConfigModule.getEnv.ALERT_STATUS_URL) {
		baseLinks.push({
			href: envConfigModule.getEnv.ALERT_STATUS_URL,
			text: t("components.legacy.footer.status"),
			target: "_blank",
			rel: "noopener",
		});
	}
	baseLinks.push({
		to: "/security",
		text: t("components.legacy.footer.security"),
	});

	return baseLinks;
});
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

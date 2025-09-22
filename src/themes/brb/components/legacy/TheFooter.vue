<template>
	<footer class="footer">
		<div class="top-line">
			<span class="current-year">© {{ currentYear }} {{ theme.name }}</span>
		</div>

		<div>
			<template v-for="(link, index) in links" :key="link.text">
				<span v-if="index !== 0" :key="index" aria-hidden="true"> - </span>
				<base-link class="footer-link" v-bind="link">{{ link.text }}</base-link>
			</template>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { filePathsModule } from "@/store";
import { injectStrict, THEME_KEY } from "@/utils/inject";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useEnvConfig } from "@data-env";

const { t } = useI18n();
const theme = injectStrict(THEME_KEY);

const currentYear = computed(() => new Date().getFullYear());

const links = computed(() => {
	const links = [
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
			href: "/privacypolicy",
			text: t("components.legacy.footer.privacy_policy"),
			target: "_blank",
			rel: "noopener",
		},
		{
			href: "mailto:schul-cloud@bildungsserver.berlin-brandenburg.de?subject=Schul-Cloud%20Brandenburg%20Anfrage",
			text: t("components.legacy.footer.contact"),
		},
		{
			href: "https://github.com/hpi-schul-cloud",
			text: t("components.legacy.footer.github"),
		},
	];
	if (useEnvConfig().value.ALERT_STATUS_URL) {
		links.push({
			href: useEnvConfig().value.ALERT_STATUS_URL as string,
			text: t("components.legacy.footer.status"),
			target: "_blank",
			rel: "noopener",
		});
	}
	if (useEnvConfig().value.ACCESSIBILITY_REPORT_EMAIL) {
		links.push({
			href:
				"mailto:" +
				useEnvConfig().value.ACCESSIBILITY_REPORT_EMAIL +
				"?subject=" +
				t("components.legacy.footer.accessibility.report"),
			text: t("components.legacy.footer.accessibility.report"),
			target: "_blank",
			rel: "noopener",
		});
	}
	links.push({
		href: filePathsModule.getSpecificFiles.accessibilityStatement.toString(),
		text: t("components.legacy.footer.accessibility.statement"),
		target: "_blank",
		rel: "noopener",
	});
	return links;
});
</script>

<style lang="scss" scoped>
.current-year {
	margin-bottom: 8px;
	font-size: var(--text-lg);
}

.footer {
	width: 100%;
	padding: 0 16px;
	margin: 24px 0 16px;
	text-align: center;
}

.top-line {
	display: flex;
	align-items: center;
	justify-content: center;
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

<template>
	<footer class="footer">
		<div>
			<template v-for="(link, index) in links" :key="link.text">
				<span v-if="index !== 0" :key="index" aria-hidden="true"> - </span>
				<base-link class="footer-link" v-bind="link">{{ link.text }}</base-link>
			</template>
		</div>
		<p class="bottom-line">
			<span>©{{ currentYear }} {{ theme.name }}</span>
			| Made with
			<span class="heart">❤</span> in Potsdam |
			{{ t("components.legacy.footer.powered_by") }}
			<base-link href="https://lokalise.com" target="_blank" :no-styles="true"
				><img
					class="poweredby-logo"
					src="@/assets/img/lokalise_logo.svg"
					:alt="t('components.legacy.footer.lokalise_logo_alt')"
			/></base-link>
		</p>
	</footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { filePathsModule, envConfigModule } from "@/store";
import { injectStrict, THEME_KEY } from "@/utils/inject";

const { t } = useI18n();
const theme = injectStrict(THEME_KEY);

const currentYear = computed(() => new Date().getFullYear());
const links = computed(() => {
	const linksArr = [
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
			text: t("components.legacy.footer.privacy_policy_thr"),
			target: "_blank",
			rel: "noopener",
		},
		{
			href: "mailto:schulcloud-support@thillm.de?subject=THR%20Schul-Cloud%20Anfrage",
			text: t("components.legacy.footer.contact"),
		},
		{
			href: "https://github.com/hpi-schul-cloud",
			text: t("components.legacy.footer.github"),
		},
	];

	if (envConfigModule.getEnv.ALERT_STATUS_URL) {
		linksArr.push({
			href: envConfigModule.getEnv.ALERT_STATUS_URL,
			text: t("components.legacy.footer.status"),
			target: "_blank",
			rel: "noopener",
		});
	}

	if (envConfigModule.getEnv.ACCESSIBILITY_REPORT_EMAIL) {
		linksArr.push({
			href:
				"mailto:" +
				envConfigModule.getEnv.ACCESSIBILITY_REPORT_EMAIL +
				"?subject=" +
				t("components.legacy.footer.accessibility.report"),
			text: t("components.legacy.footer.accessibility.report"),
			target: "_blank",
			rel: "noopener",
		});
	}

	linksArr.push({
		href: filePathsModule.getSpecificFiles.accessibilityStatement.toString(),
		text: t("components.legacy.footer.accessibility.statement"),
		target: "_blank",
		rel: "noopener",
	});

	return linksArr;
});
</script>

<style lang="scss" scoped>
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

	.hpi-logo {
		display: block;
		height: var(--heading-3);
		margin: 0;
	}
}

.bottom-line {
	margin-top: 8px;

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

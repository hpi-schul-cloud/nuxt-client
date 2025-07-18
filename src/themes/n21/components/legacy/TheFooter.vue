<template>
	<footer class="footer">
		<div class="top-line">
			<span class="current-year">© {{ currentYear }} {{ $theme.name }}</span>
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
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { envConfigModule, filePathsModule } from "@/store";

const { t } = useI18n();

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
			text: t("components.legacy.footer.privacy_policy"),
			target: "_blank",
			rel: "noopener",
		},
		{
			href:
				"mailto:" +
				envConfigModule.getContactEmail +
				"?subject=Niedersächsische%20Bildungscloud%20Anfrage",
			text: t("components.legacy.footer.contact"),
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
		href: filePathsModule.getSpecificFiles.accessibilityStatement,
		text: t("components.legacy.footer.accessibility.statement"),
		target: "_blank",
		rel: "noopener",
	});
	return linksArr;
});
</script>

<style lang="scss" scoped>
.current-year {
	margin-bottom: var(--space-xs);
	font-size: var(--text-lg);
}

.footer {
	width: 100%;
	padding: 0 var(--space-md);
	margin: var(--space-lg) 0 var(--space-md);
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

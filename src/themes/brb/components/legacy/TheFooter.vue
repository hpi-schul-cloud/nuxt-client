<template>
	<VFooter class="d-flex align-center justify-center flex-wrap mb-3 footer">
		<VBtn
			v-for="(link, index) in links"
			:key="index"
			class="footer-btn text-lg"
			color="primary"
			variant="plain"
			:href="link.href"
			:to="link.to"
			:text="link.text"
			:target="link.target"
		/>
	</VFooter>
</template>

<script setup lang="ts">
import { filePathsModule } from "@/store";
import { useEnvConfig } from "@data-env";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const links = computed(() => {
	const baseLinks: Array<{ text: string; to?: string; href?: string; target?: string }> = [
		{
			to: "/imprint",
			text: t("components.legacy.footer.imprint"),
		},
		{
			href: "/termsofuse",
			text: t("components.legacy.footer.terms"),
			target: "_blank",
		},
		{
			href: "/privacypolicy",
			text: t("components.legacy.footer.privacy_policy"),
			target: "_blank",
		},
		{
			href: "mailto:schul-cloud@bildungsserver.berlin-brandenburg.de?subject=Schul-Cloud%20Brandenburg%20Anfrage",
			text: t("components.legacy.footer.contact"),
		},
	];
	if (useEnvConfig().value.ALERT_STATUS_URL) {
		baseLinks.push({
			href: useEnvConfig().value.ALERT_STATUS_URL as string,
			text: t("components.legacy.footer.status"),
			target: "_blank",
		});
	}
	if (useEnvConfig().value.ACCESSIBILITY_REPORT_EMAIL) {
		baseLinks.push({
			href:
				"mailto:" +
				useEnvConfig().value.ACCESSIBILITY_REPORT_EMAIL +
				"?subject=" +
				t("components.legacy.footer.accessibility.report"),
			text: t("components.legacy.footer.accessibility.report"),
			target: "_blank",
		});
	}
	baseLinks.push({
		href: filePathsModule.getSpecificFiles.accessibilityStatement.toString(),
		text: t("components.legacy.footer.accessibility.statement"),
		target: "_blank",
	});
	return baseLinks;
});
</script>

<style lang="scss" scoped>
.footer {
	max-height: var(--footer-height);
}
.footer-btn {
	opacity: 1;
	font-weight: normal;
}
</style>

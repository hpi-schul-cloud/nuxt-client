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
import { useEnvConfig } from "@data-env";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { VFooter } from "vuetify/components";

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
			to: "/privacypolicy",
			text: t("components.legacy.footer.privacy_policy"),
			target: "_blank",
		},
		{
			href: "mailto:support@dbildungscloud.de?subject=dBildungscloud%20Anfrage",
			text: t("components.legacy.footer.contact"),
		},
		{
			to: "/system/security",
			text: t("components.legacy.footer.security"),
		},
	];

	return useEnvConfig().value.ALERT_STATUS_URL
		? [
				...baseLinks,
				{
					href: useEnvConfig().value.ALERT_STATUS_URL as string,
					text: t("components.legacy.footer.status"),
					target: "_blank",
				},
			]
		: baseLinks;
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

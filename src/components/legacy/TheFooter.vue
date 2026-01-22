<template>
	<VContainer justify="center" md="auto" class="d-flex justify-center align-center flex-wrap">
		<template v-for="(link, index) in links" :key="link.text">
			<span v-if="index !== 0" class="ma-1"> - </span>
			<VBtn
				variant="plain"
				class="footer-link pa-0 mx-1"
				color="primary"
				:href="link.href"
				:to="link.to"
				:target="link.target"
			>
				<!-- :rel="link.rel" -->
				{{ link.text }}
			</VBtn>
		</template>
	</VContainer>
</template>

<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
	];

	if (useEnvConfig().value.ALERT_STATUS_URL) {
		baseLinks.push({
			href: useEnvConfig().value.ALERT_STATUS_URL as string,
			text: t("components.legacy.footer.status"),
			target: "_blank",
		});
	}

	return baseLinks;
});
</script>

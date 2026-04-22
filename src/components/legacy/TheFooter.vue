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
import { useFooterLinks } from "@ui-layout";
import { VFooter } from "vuetify/components";

const { links } = useFooterLinks({
	contactEmail: "support@dbildungscloud.de",
	contactSubject: "dBildungscloud Anfrage",
	privacyPolicyAsRoute: true,
	includeSecurityLink: true,
	includeAccessibilityStatement: false,
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

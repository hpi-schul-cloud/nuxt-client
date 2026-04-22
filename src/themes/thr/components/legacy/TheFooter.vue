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

const { links } = useFooterLinks({
	contactEmail: "schulcloud-support@thillm.de",
	contactSubject: "THR Schul-Cloud Anfrage",
	privacyPolicyKey: "components.legacy.footer.privacy_policy_thr",
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

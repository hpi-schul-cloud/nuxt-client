<template>
	<div>
		<common-terms-of-use />
		<div>
			<h2 class="h3">
				B. Datenschutzerklärung
			</h2>
			<base-button
				v-if="consentVersion && consentVersion.schoolId"
				@click="download"
			>
				Download Datenschutzerklärung
			</base-button>
			<base-button
				v-else
				:href="defaultDocuments.specificFiles().privacyExemplary"
			>
				{{ $t("components.legacy.footer.privacy_policy_HPI") }}
			</base-button>
		</div>
	</div>
</template>

<script>
import CommonTermsOfUse from "@components/templates/CommonTermsOfUse";
import BaseButton from "@components/base/BaseButton";
import defaultDocuments from "@utils/documents.js";

export default {
	components: { CommonTermsOfUse, BaseButton },
	data() {
		return {
			defaultDocuments,
		};
	},
	computed: {
		consentVersion() {
			return this.$store.state["terms-and-conditions"].consentVersion;
		},
	},
	mounted() {
		if (this.$user && this.$user.schoolId) {
			this.$store.dispatch(
				"terms-and-conditions/schoolTermsPresent",
				this.$user.schoolId
			);
		}
	},
	methods: {
		async download() {
			const data = await this.$axios.$get(
				`base64Files/${this.consentVersion.consentDataId}?download=true`
			);
			const downloadLink = document.createElement("a");
			downloadLink.href = data;
			downloadLink.download = "Datenschutzerklärung-der-Schule.pdf";
			downloadLink.click();
		},
	},
	meta: {
		isPublic: true,
		populateNeeded: true,
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";
</style>

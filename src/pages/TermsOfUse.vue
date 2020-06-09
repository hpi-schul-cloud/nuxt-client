<template>
	<div>
		<common-terms-of-use />
		<div v-if="consentVersion && consentVersion.schoolId">
			<h2 class="h3">
				B. Nutzungsbedingungen der Schule
			</h2>
			<base-button @click="download">
				Download Nutzungsbedingungen
			</base-button>
		</div>
	</div>
</template>

<script>
import CommonTermsOfUse from "@components/templates/CommonTermsOfUse";
import BaseButton from "@components/base/BaseButton";

export default {
	components: { CommonTermsOfUse, BaseButton },
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

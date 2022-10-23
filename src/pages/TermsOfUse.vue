<template>
	<default-wireframe :full-width="false">
		<common-terms-of-use
			:show-school-terms="!!(consentVersion && consentVersion.schoolId)"
			@download="download"
		/>
	</default-wireframe>
</template>

<script>
import CommonTermsOfUse from "@/components/templates/CommonTermsOfUse";
import DefaultWireframe from "@/components/templates/DefaultWireframe";

export default {
	components: { CommonTermsOfUse, DefaultWireframe },
	computed: {
		consentVersion() {
			return this.$store.getters["terms-and-conditions/getConsentVersion"];
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
			const data = await this.$axios.get(
				`/v1/base64Files/${this.consentVersion.consentDataId}`
			);
			const downloadLink = document.createElement("a");
			downloadLink.href = data.data;
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

<template>
	<div>
		<common-terms-of-use />
		<div v-if="consentVersion && consentVersion.schoolId">
			<h2 class="h3">
				B. Nutzungsbedingungen der Schule
			</h2>
			<button class="btn" @click="download">
				Download Nutzungsbedingungen
			</button>
		</div>
	</div>
</template>

<script>
import CommonTermsOfUse from "@components/templates/CommonTermsOfUse";

export default {
	components: { CommonTermsOfUse },
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

			const win = window.open();
			if (win != null) {
				// chrome compatible way to open the file
				win.document.write(
					`<iframe src="${data}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
				);
			} else {
				// firefox compatible way to open the file
				location.href = data;
			}
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

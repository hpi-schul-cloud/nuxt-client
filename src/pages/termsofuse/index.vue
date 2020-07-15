<template>
	<div>
		<common-terms-of-use
			:show-school-terms="!!(consentVersion && consentVersion.schoolId)"
			@download="$_downloadContent_download"
		/>
	</div>
</template>

<script>
	import CommonTermsOfUse from "@components/templates/CommonTermsOfUse";
import downloadMixin from "@mixins/downloadPrivacyStatement";

export default {
	components: { CommonTermsOfUse },
	mixins: [downloadMixin],
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
	meta: {
		isPublic: true,
		populateNeeded: true,
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";
</style>

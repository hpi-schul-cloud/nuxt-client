<template>
	<terms-of-use />
</template>

<script>
import TermsOfUse from "@components/templates/TermsOfUse";

export default {
	components: { TermsOfUse },
	meta: {
		isPublic: true,
		populateNeeded: true,
	},
};
</script>

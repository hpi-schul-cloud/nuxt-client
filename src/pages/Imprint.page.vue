<template>
	<impressum />
</template>

<script>
import Impressum from "@/components/templates/impressum";

export default {
	components: { Impressum },
	layout(content) {
		const userId = content.store.getters["auth/getUser"].id;
		return userId && userId !== "" ? "default" : "loggedOut";
	},
	meta: {
		isPublic: true,
		populateNeeded: true,
	},
};
</script>

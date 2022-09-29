<template>
	<impressum />
</template>

<script>
import Impressum from "@components/templates/impressum";

export default {
	components: { Impressum },
	layout(content) {
		const userId = content.store.getters["auth/getUser"].id;
		return userId && userId !== "" ? "defaultVuetify" : "loggedOut";
	},
	meta: {
		isPublic: true,
		populateNeeded: true,
	},
};
</script>

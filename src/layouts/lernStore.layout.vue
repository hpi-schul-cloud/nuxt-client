<template>
	<newLoggedIn v-if="isCollection" />
	<router-view v-else />
</template>

<script>
import { contentModule } from "@/store";
import newLoggedIn from "./newLoggedIn.layout.vue";

export default {
	name: "lernStoreLayout",
	components: {
		newLoggedIn,
	},
	computed: {
		isCollection() {
			return (
				String(this.$route.query.isCollection) === "true" &&
				contentModule.getCollectionsFeatureFlag === true
			);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.content {
	grid-area: content;
	width: inherit;
	max-width: 100vw;

	@include breakpoint(tablet) {
		max-width: calc(100vw - var(--sidebar-width-tablet));
	}

	@include breakpoint(desktop) {
		max-width: calc(100vw - var(--sidebar-width));
	}
}
</style>

<template>
	<span v-if="!!role">({{ role }})</span>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		...mapGetters("auth", {
			userRoles: "getUserRolesDisplayName",
		}),
		role() {
			return this.userRoles ? this.userRoles[0] : "";
		},
	},
};
</script>

<template>
	<span v-if="!!role">({{ role }})</span>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState({
			userRoles: (state) =>
				state && state.auth && state.auth.user && state.auth.user.roles
					? state.auth.user.roles.map((r) => r.displayName)
					: [],
		}),
		role() {
			return this.userRoles ? this.userRoles[0] : "";
		},
	},
};
</script>

<template>
	<div v-if="hasRole" class="user-has-role">
		<slot />
		<slot name="true" />
	</div>
	<div v-else class="user-has-not-role">
		<slot name="false" />
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	props: {
		role: {
			type: String,
			default: "",
		},
	},
	computed: {
		...mapState({
			userRoles: (state) =>
				state && state.auth && state.auth.user ? state.auth.user.roles : [],
		}),
		hasRole() {
			return this.userRoles.includes(this.role);
		},
	},
};
</script>

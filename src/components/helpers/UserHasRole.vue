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
import { useAuthStore } from "@data-auth";

export default {
	props: {
		role: {
			type: [String, Function],
			default: () => () => false,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		userRoles() {
			return useAuthStore().userRoles;
		},
		hasRole() {
			return typeof this.role === "string"
				? this.userRoles.includes(this.role.toLowerCase())
				: this.role(this.userRoles);
		},
	},
};
</script>

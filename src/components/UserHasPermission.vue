<template>
	<div v-if="hasPermission" class="user-has-permission">
		<slot />
		<slot name="true" />
	</div>
	<div v-else class="user-has-no-permission">
		<slot name="false" />
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	props: {
		permission: {
			type: [String, Function],
			default: () => () => false,
		},
	},
	computed: {
		...mapState({
			userPermissions: (state) =>
				state && state.auth && state.auth.user && state.auth.user.permissions
					? state.auth.user.permissions.map(p => p.toLowerCase())
					: [],
		}),
		hasPermission() {
			return typeof this.permission === "string"
				? this.userPermissions.includes(this.permission.toLowerCase())
				: this.permission(this.userPermissions);
		},
	},
};
</script>

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
					? state.auth.user.permissions.map((p) => p.toLowerCase())
					: [],
		}),
		$_hasPermission() {
			return typeof this.permission === "string"
				? !this.permission ||
						this.userPermissions.includes(this.permission.toLowerCase())
				: !this.permission() || this.permission(this.userPermissions);
		},
	},
};

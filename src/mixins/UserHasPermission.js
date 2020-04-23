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
			return this.$_userHasPermission(this.permission);
		},
	},
	methods: {
		$_userHasPermission(permission) {
			if (!permission) {
				throw new Error("parameter permission is missing");
			}
			return typeof permission === "string"
				? !permission || this.userPermissions.includes(permission.toLowerCase())
				: !permission() || permission(this.userPermissions);
		},
	},
};

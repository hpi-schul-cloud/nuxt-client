import { mapState } from "vuex";

const UserHasPermission = {
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
			// empty or undefined permission will return true
			// console.log(this.permission);
			// console.log(
			// 	typeof this.permission === "string"
			// 		? !this.permission ||
			// 				this.userPermissions.includes(this.permission.toLowerCase())
			// 		: !this.permission() || this.permission(this.userPermissions)
			// );
			return typeof this.permission === "string"
				? !this.permission ||
						this.userPermissions.includes(this.permission.toLowerCase())
				: !this.permission() || this.permission(this.userPermissions);
		},
	},
};

export default UserHasPermission;

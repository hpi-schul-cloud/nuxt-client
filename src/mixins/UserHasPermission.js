import { useAuthStore } from "@data-auth";

export default {
	props: {
		permission: {
			type: [String, Function],
			default: () => () => false,
		},
	},
	computed: {
		userPermissions() {
			return useAuthStore().userPermissions;
		},
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
				? !permission || this.userPermissions.includes(permission)
				: !permission() || permission(this.userPermissions);
		},
	},
};

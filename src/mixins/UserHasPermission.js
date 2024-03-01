import { authModule } from "@/store";

export default {
	props: {
		permission: {
			type: [String, Function],
			default: () => () => false,
		},
	},
	computed: {
		userPermissions() {
			return authModule.getPermissions;
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
				? !permission || this.userPermissions.includes(permission.toLowerCase())
				: !permission() || permission(this.userPermissions);
		},
	},
};

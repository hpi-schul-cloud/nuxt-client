import { useAppStore } from "@data-app";

export default {
	props: {
		permission: {
			type: [String, Function],
			default: () => () => false,
		},
	},
	computed: {
		userPermissions() {
			return useAppStore().userPermissions;
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

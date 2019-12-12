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
					? state.auth.user.permissions.map((p) => p.toLowerCase())
					: [],
		}),
		hasPermission() {
			return typeof this.permission === "string"
				? this.userPermissions.includes(this.permission.toLowerCase())
				: this.permission(this.userPermissions);
		},
	},
	render() {
		const slots = this.$slots;
		if (this.hasPermission) {
			return slots.true || slots.default;
		}
		return slots.false;
	},
};
</script>

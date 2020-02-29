<template>
		<div v-show="isActive && hasPermission" class="tab-content">
			<slot></slot>
		</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true,
		},
		permission: {
			type: String,
			default: "",
		},
		selected: {
			type: Boolean,
		},
	},
	data() {
		return {
			isActive: false,
			hasPermission: true,
		};
	},
	created() {
		this.isActive = this.selected;
		this.hasPermission = this.checkPermission();
	},
	methods: {
		checkPermission() {
			return (
				!this.permission || this.$user.permissions.includes(this.permission)
			);
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";
.tab-content {
	width: 100%;
	overflow-wrap: normal;
}
</style>

<template>
	<div v-show="isActive">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "Tab",
	props: {
		name: {
			type: String,
			required: true,
		},
		selected: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			isActive: false,
		};
	},
	mounted() {
		this.isActive = this.selected;
	},
};
</script>
<style lang="scss" scoped>
@import "@variables";
</style>

<template>
	<div v-show="isActive" id="tab-content">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "TemplateTab",
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
	created() {
		this.isActive = this.selected;
	},
};
</script>
<style lang="scss" scoped>
@import "@variables";
#tab-content {
	width: 100%;
	overflow-wrap: normal;
}
</style>

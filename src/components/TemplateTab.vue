<template>
	<div v-show="isActive" class="tab-content">
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
		selected: {
			type: Boolean,
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
@import "@styles";
.tab-content {
	width: 100%;
	overflow-wrap: normal;
}
</style>

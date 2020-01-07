<template>
	<div class="grid" :style="col">
		<slot />
	</div>
</template>
<script>
export default {
	props: {
		columnWidth: {
			type: String,
			default: "15rem",
		},
		gridGap: {
			type: String,
			default: "var(--space-lg)",
		},
	},
	computed: {
		col() {
			return `grid-template-columns: repeat(auto-fill, minmax(${this.columnWidth}, 1fr));
				grid-gap: ${this.gridGap};
				`;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.grid {
	display: grid;
}
</style>

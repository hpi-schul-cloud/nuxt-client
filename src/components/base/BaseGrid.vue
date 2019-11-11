<template>
	<div class="grid" :style="col">
		<slot />
	</div>
</template>
<script>
export default {
	props: {
		columnWidthRem: {
			type: Number,
			required: false,
			default: 14,
		},
	},
	computed: {
		col() {
			return (
				"grid-template-columns: repeat(auto-fill, minmax(" +
				this.columnWidthRem +
				"rem, 1fr))"
			);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.grid {
	display: grid;
	grid-gap: var(--space-lg);
	border: 2px dotted green;
}
</style>

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
	},
	data() {
		return {};
	},
	computed: {
		col() {
			return `grid-template-columns: repeat(auto-fill, minmax(${this.columnWidth}, 1fr));`;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.grid {
	display: grid;
	grid-gap: var(--space-md);
	width: 100%;
	margin: 0 calc(10 * var(--border-width-bold)); /* 20px */

	@include breakpoint(tablet) {
		grid-gap: calc(9 * var(--border-width-bold)); /* 18px */
		margin: 0 calc(18 * var(--border-width-bold)); /* 36px */
	}

	@include breakpoint(desktop) {
		grid-gap: var(--space-lg);
		margin: 0 calc(41 * var(--border-width)); /* 41px */
	}
}
</style>

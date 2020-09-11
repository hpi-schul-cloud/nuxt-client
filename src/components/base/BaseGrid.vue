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
		// This solely exists to appear in the coverage report
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
	margin: 0 var(--space-lg) !important;

	@include breakpoint(tablet) {
		margin: 0 var(--space-xl) !important;
	}

	@include breakpoint(desktop) {
		grid-gap: var(--space-lg);
		margin: 0 var(--space-xl) !important;
	}
}
</style>

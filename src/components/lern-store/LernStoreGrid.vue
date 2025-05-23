<template>
	<div class="grid" :style="col">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
	props: {
		columnWidth: {
			type: String,
			default: "15rem",
		},
	},
	setup(props) {
		const col = computed(() => {
			return `grid-template-columns: repeat(auto-fill, minmax(${props.columnWidth}, 1fr));`;
		});

		return {
			col,
		};
	},
});
</script>

<style lang="scss" scoped>
@use "@/styles/mixins" as *;

.grid {
	display: grid;
	grid-gap: var(--space-md);
	width: 100%;

	@include breakpoint(tablet) {
		grid-gap: calc(9 * var(--border-width-bold)); /* 18px */
	}

	@include breakpoint(desktop) {
		grid-gap: var(--space-lg);
	}
}

.grid.no-margin {
	margin: 0;
}
</style>

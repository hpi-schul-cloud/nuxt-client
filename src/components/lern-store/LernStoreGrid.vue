<template>
	<div class="grid" :style="col">
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Props = {
	columnWidth?: string;
};
const props = withDefaults(defineProps<Props>(), {
	columnWidth: "15rem",
});

const col = computed(() => {
	return `grid-template-columns: repeat(auto-fill, minmax(${props.columnWidth}, 1fr));`;
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

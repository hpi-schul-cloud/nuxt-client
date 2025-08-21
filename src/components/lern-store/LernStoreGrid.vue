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
@use "sass:map";
@use "@/styles/settings.scss" as *;

.grid {
	display: grid;
	grid-gap: 16px;
	width: 100%;

	@media #{map.get($display-breakpoints, 'sm')} {
		grid-gap: calc(9 * var(--border-width-bold)); /* 18px */
	}

	@media #{map.get($display-breakpoints, 'md-and-up')} {
		grid-gap: 24px;
	}
}

.grid.no-margin {
	margin: 0;
}
</style>

<template>
	<div v-if="isLoading" class="d-flex my-10 justify-center align-center">
		<slot name="loading">
			<VProgressCircular indeterminate :size />
		</slot>
	</div>
	<slot v-else />
</template>
#

<script setup lang="ts">
// It is recommended to pass a debounced `isLoading` value to this component to avoid
// flickering on fast operations and ensure the indicator is shown long enough to be noticed.
//
// Debounced loading state is provided out of the box by:
// - `useSafeAxiosTask` / `useSafeAxiosRunner` (via the `isLoading` return value)
//
// For custom cases, use `withDebouncedLoading` from `@/utils/loading-utils` directly.
withDefaults(
	defineProps<{
		isLoading?: boolean;
		size?: number | string;
	}>(),
	{
		isLoading: false,
		size: 115,
	}
);
</script>

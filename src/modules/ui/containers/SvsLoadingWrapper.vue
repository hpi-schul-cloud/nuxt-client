<template>
	<div v-if="isLoading" class="d-flex my-10 justify-center align-center">
		<slot name="loading">
			<VProgressCircular indeterminate :size />
		</slot>
	</div>
	<slot v-else />
</template>

<script setup lang="ts">
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

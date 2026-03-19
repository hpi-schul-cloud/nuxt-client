<template>
	<div v-if="debouncedIsLoading" class="d-flex mt-10 justify-center align-center">
		<VProgressCircular indeterminate :size />
	</div>
	<slot v-else />
</template>

<script setup lang="ts">
import { refDebounced } from "@vueuse/core";
import { toRef } from "vue";

const props = withDefaults(
	defineProps<{
		loading?: boolean;
		size?: number | string;
	}>(),
	{
		loading: false,
		size: 115,
	}
);

const debouncedIsLoading = refDebounced(toRef(props, "loading"), 200);
</script>

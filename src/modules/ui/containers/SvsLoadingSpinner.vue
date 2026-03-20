<template>
	<div v-if="displaySpinner" class="d-flex mt-10 justify-center align-center">
		<VProgressCircular indeterminate :size />
	</div>
	<slot v-else />
</template>

<script setup lang="ts">
import { refDebounced } from "@vueuse/core";
import { computed, toRef } from "vue";

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

const loadingRef = toRef(props, "loading");
const debouncedIsLoading = refDebounced(loadingRef, 200);

const displaySpinner = computed(() => loadingRef.value && debouncedIsLoading.value);
</script>

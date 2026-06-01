<template>
	<div v-if="isLoading" class="d-flex my-10 justify-center align-center">
		<slot name="loading">
			<VProgressCircular indeterminate :size />
		</slot>
	</div>
	<slot v-else-if="isLoaded" />
</template>

<script setup lang="ts">
import { DebouncedLoadingState } from "@/types/loading.types";
import { computed } from "vue";

const props = withDefaults(
	defineProps<{
		loadingState?: DebouncedLoadingState;
		size?: number | string;
	}>(),
	{
		loadingState: "idle",
		size: 115,
	}
);

const isLoading = computed(() => props.loadingState === "loading" || props.loadingState === "extLoading");
const isLoaded = computed(() => props.loadingState === "loaded");
</script>

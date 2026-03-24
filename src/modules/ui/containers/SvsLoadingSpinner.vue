<template>
	<div v-if="displaySpinner" class="d-flex my-10 justify-center align-center">
		<VProgressCircular indeterminate :size />
	</div>
	<slot v-else-if="!loading" />
</template>

<script setup lang="ts">
import { ref, toRef, watch } from "vue";

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

const displaySpinner = ref(false);
let timeout: ReturnType<typeof setTimeout> | undefined;

watch(
	loadingRef,
	(val) => {
		if (val) {
			timeout = setTimeout(() => {
				if (loadingRef.value) {
					displaySpinner.value = true;
				}
			}, 200);
		} else {
			if (timeout) {
				clearTimeout(timeout);
				timeout = undefined;
			}
			displaySpinner.value = false;
		}
	},
	{ immediate: true }
);
</script>

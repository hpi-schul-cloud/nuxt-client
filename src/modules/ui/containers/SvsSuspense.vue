<template>
	<div v-if="displayLoader" class="d-flex my-10 justify-center align-center">
		<slot name="loading">
			<VProgressCircular indeterminate :size />
		</slot>
	</div>
	<slot v-else-if="!loading" />
</template>

<script setup lang="ts">
/**
 * A component to actually do, what vue wants to offer also:
 * https://vuejs.org/guide/built-ins/suspense
 *
 * Potentially replaced by <suspense> in the future.
 */
import { onBeforeUnmount, ref, toRef, watch } from "vue";

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

const displayLoader = ref(false);
let timeout: ReturnType<typeof setTimeout> | undefined;

onBeforeUnmount(() => clearTimeout(timeout));

watch(
	loadingRef,
	(val) => {
		if (val) {
			timeout = setTimeout(() => {
				if (loadingRef.value) {
					displayLoader.value = true;
				}
			}, 200);
		} else {
			if (timeout) {
				clearTimeout(timeout);
				timeout = undefined;
			}
			displayLoader.value = false;
		}
	},
	{ immediate: true }
);
</script>

<template>
	<div class="d-flex justify-center align-center" :style="{ 'min-height': height - 24 + 'px' }">
		<VProgressCircular color="primary" indeterminate :size="36" />
	</div>
</template>

<script setup lang="ts">
type Props = {
	height: number;
};
defineProps<Props>();
</script>

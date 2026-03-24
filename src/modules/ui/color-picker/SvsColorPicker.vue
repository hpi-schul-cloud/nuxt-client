<template>
	<VColorPicker
		v-model="color"
		:swatches="swatches"
		hide-sliders
		hide-inputs
		hide-canvas
		show-swatches
		elevation="0"
		class="ma-2"
	/>
</template>

<script setup lang="ts">
defineProps<{
	swatches: string[][];
}>();

const color = defineModel({
	type: String,
	default: undefined,
});
</script>

<template>
	<VColorPicker
		v-model="color"
		hide-sliders
		hide-inputs
		hide-canvas
		show-swatches
		:swatches
		elevation="0"
		class="ma-2"
	/>
</template>

<script setup lang="ts">
import { ColorNameToHexMap, ColorPickerDefaultColors } from "./default-colors";
import { computed } from "vue";

const props = withDefaults(
	defineProps<{
		swatchColors?: string[];
	}>(),
	{
		swatchColors: () => Object.values(ColorNameToHexMap),
	}
);

const swatches = computed<string[][]>(() => {
	const swatchesPerColumn = 3;
	const swatchRows = [];

	for (let i = 0; i < props.swatchColors.length; i += swatchesPerColumn) {
		swatchRows.push(props.swatchColors.slice(i, i + swatchesPerColumn));
	}

	return swatchRows;
});

const color = defineModel({
	type: String,
	default: ColorNameToHexMap[ColorPickerDefaultColors.WHITE],
});
</script>

<style scoped>
:deep(.v-color-picker-swatches__color) {
	border: 1px solid lightgray;
}
</style>

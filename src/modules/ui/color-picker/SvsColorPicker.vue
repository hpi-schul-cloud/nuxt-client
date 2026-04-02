<template>
	<VColorPicker v-model="hexValue" hide-sliders hide-inputs hide-canvas show-swatches :swatches elevation="0" />
</template>

<script setup lang="ts">
import { COLORS_LIGHTEN3, colorToHexLighten3, hexToColorLighten3 } from "@/utils/color.utils";
import { Colors } from "@api-server";
import { chunk } from "lodash-es";
import { computed } from "vue";

const model = defineModel<Colors>({
	default: Colors.TRANSPARENT,
});

const hexValue = computed({
	get: () => colorToHexLighten3(model.value),
	set: (hex: string) => {
		const match = hexToColorLighten3(hex);
		if (match !== undefined) model.value = match as Colors;
	},
});

const swatches = computed(() => chunk(Object.values(COLORS_LIGHTEN3), 3));
</script>

<style scoped>
:deep(.v-color-picker-swatches__color) {
	border: 1px solid lightgray;
}

.v-color-picker {
	width: auto;
}
</style>

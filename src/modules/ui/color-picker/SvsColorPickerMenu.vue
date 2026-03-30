<template>
	<VListGroup value="Farbe auswählen">
		<template #activator="{ props }">
			<VListItem v-bind="props" title="Farbe auswählen" :prepend-icon="mdiPalette" @click.prevent.stop />
		</template>
		<SvsColorPicker v-model="color" data-testid="color-picker" @update:model-value="emit('update:color', color)" />
	</VListGroup>
</template>

<script setup lang="ts">
import { ColorNameToHexMap, ColorPickerDefaultColors } from "./default-colors";
import SvsColorPicker from "./SvsColorPicker.vue";
import { mdiPalette } from "@icons/material";

const emit = defineEmits<{
	(e: "update:color", value: string | undefined): void;
}>();

const color = defineModel("color", {
	type: String,
	default: ColorNameToHexMap[ColorPickerDefaultColors.WHITE],
});
</script>

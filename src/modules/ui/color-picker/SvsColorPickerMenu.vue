<template>
	<VListGroup value="color-picker">
		<template #activator="{ props }">
			<VListItem v-bind="props" :title="t('common.actions.pickColor')" :prepend-icon="mdiPalette" @click.prevent.stop />
		</template>
		<SvsColorPicker v-model="color" data-testid="color-picker" @update:model-value="emit('update:color', color)" />
	</VListGroup>
</template>

<script setup lang="ts">
import { ColorNameToHexMap, ColorPickerDefaultColors } from "./default-colors";
import SvsColorPicker from "./SvsColorPicker.vue";
import { mdiPalette } from "@icons/material";
import { useI18n } from "vue-i18n";

const emit = defineEmits<{
	(e: "update:color", value: string): void;
}>();

const color = defineModel("color", {
	type: String,
	default: ColorNameToHexMap[ColorPickerDefaultColors.WHITE],
});

const { t } = useI18n();
</script>

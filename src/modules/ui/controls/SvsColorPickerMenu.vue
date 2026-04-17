<template>
	<VListGroup data-testid="color-picker-menu" value="color-picker">
		<template #activator="{ props }">
			<VListItem v-bind="props" :title="t('common.actions.pickColor')" :prepend-icon="mdiPalette" @click.prevent.stop />
		</template>
		<SvsColorPicker v-model="color" data-testid="color-picker" />
	</VListGroup>
</template>

<script setup lang="ts">
import SvsColorPicker from "./SvsColorPicker.vue";
import { Colors } from "@api-server";
import { mdiPalette } from "@icons/material";
import { useI18n } from "vue-i18n";

const color = defineModel<Colors>("color", {
	default: Colors.TRANSPARENT,
});

const { t } = useI18n();
</script>

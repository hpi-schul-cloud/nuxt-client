<!-- TasksFilterControls.vue -->
<template>
	<div class="filter-controls">
		<VAutocomplete
			:model-value="courseNames"
			closable-chips
			multiple
			clearable
			hide-details="auto"
			variant="solo-filled"
			flat
			chips
			data-testid="courseFilter"
			item-title="text"
			item-value="value"
			:prepend-inner-icon="mdiMagnify"
			:menu-props="{ closeOnContentClick: false, zIndex: 30 }"
			:items="courseFilters"
			:label="t('pages.tasks.labels.filter')"
			:aria-label="t('pages.tasks.labels.filter')"
			@update:model-value="courseNames = $event"
		/>
		<VSwitch
			:model-value="substitute"
			:label="t('components.organisms.TasksDashboardMain.filter.substitute')"
			:true-icon="mdiCheck"
			hide-details
			@update:model-value="substitute = $event"
		/>
	</div>
</template>

<script setup lang="ts">
import { mdiCheck, mdiMagnify } from "@icons/material";
import { useI18n } from "vue-i18n";

defineProps<{
	courseFilters: { text: string; value: string; isSubstitution?: boolean }[];
}>();

const courseNames = defineModel<string[]>("courseNames", { required: true });
const substitute = defineModel<boolean>("substitute", { required: true });

const { t } = useI18n();
</script>

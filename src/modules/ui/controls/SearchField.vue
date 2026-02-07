<template>
	<VTextField
		v-model="searchQuery"
		:prepend-inner-icon="mdiMagnify"
		variant="solo-filled"
		density="compact"
		single-line
		flat
		hide-details
		clearable
		:label="t('common.labels.search')"
		data-testid="search-field"
	/>
</template>

<script setup lang="ts">
import { mdiMagnify } from "@icons/material";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const searchQuery = defineModel({
	type: String,
	default: "",
});
</script>

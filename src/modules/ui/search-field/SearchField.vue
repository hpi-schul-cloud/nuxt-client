<template>
	<VTextField v-model="searchQuery" :label="t('common.labels.search')" :prepend-inner-icon="mdiMagnify" clearable />
</template>

<script setup lang="ts">
import { mdiMagnify } from "@icons/material";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{
	hideLabel?: boolean;
}>();

const searchQuery = defineModel({
	type: String,
	default: "",
});
</script>

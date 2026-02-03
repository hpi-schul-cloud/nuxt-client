<template>
	<VTextField
		v-model="searchQuery"
		:prepend-inner-icon="mdiMagnify"
		variant="solo-filled"
		density="compact"
		flat
		hide-details
		clearable
		:aria-label="ariaLabel"
		:data-testid="testId"
	/>
	<!-- <VTextField
			v-model="search"
			density="compact"
			flat
			hide-details
			mobile-breakpoint="sm"
			single-line
			variant="solo-filled"
			:class="{ 'order-1 w-100 mt-2': isExtraSmallDisplay }"
			:label="t('common.labels.search')"
			:prepend-inner-icon="mdiMagnify"
			:aria-label="t('pages.rooms.members.filter')"
			data-testid="table-search"
		/> -->
</template>

<script setup lang="ts">
import { mdiMagnify } from "@icons/material";
import { useAttrs } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const attrs = useAttrs();

defineProps<{
	hideLabel?: boolean;
}>();

const searchQuery = defineModel({
	type: String,
	default: "",
});

const ariaLabel = attrs["aria-label"] || t("common.labels.search");
const testId = attrs["data-testid"] || "search-field";
</script>

<template>
	<v-menu>
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props">
				<v-icon class="filter-icon mr-2">$mdiTune</v-icon>
				Add Filter
				<v-icon class="filter-icon">$mdiMenuDown</v-icon>
			</v-btn>
		</template>

		<v-list>
			<v-list-item v-for="(item, index) in filterMenuItems" :key="index">
				<v-list-item-title @click="onClick(item.value)">
					{{ item.title }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>

	<FilterDialog :isOpen="dialogOpen" @dialog-closed="onDialogClose">
		<template #title> title </template>
		<template #content>
			<Registration
				v-if="filterSelectionType == filterOptions.REGISTRATION"
				@update:filter="onUpdateFilter"
			/>
			<Classes
				v-if="filterSelectionType == filterOptions.CLASSES"
				@update:filter="onUpdateFilter"
			/>
			<TimeBetween v-if="isDateFiltering" @update:filter="onUpdateFilter" />
		</template>
	</FilterDialog>
</template>

<script setup lang="ts">
import FilterDialog from "./FilterDialog.vue";
import { Registration, Classes, TimeBetween } from "./filterComponents";
import { filterOptions, FilterQuery } from "./types/filterTypes";
import { ref, unref } from "vue";

const dialogOpen = ref(false);
const filterSelectionType = ref<filterOptions | undefined>(undefined);

const filterMenuItems = [
	{ title: "Registration", value: filterOptions.REGISTRATION },
	{ title: "Classes", value: filterOptions.CLASSES },
	{ title: "Creation date", value: filterOptions.CREATION_DATE },
	{ title: "Last migrated on", value: filterOptions.LAST_MIGRATION_ON },
	{ title: "Obsolete since", value: filterOptions.OBSOLOTE_SINCE },
];
const isDateFiltering = ref<boolean>(false);

const onClick = (filter: filterOptions) => {
	filterSelectionType.value = filter;

	isDateFiltering.value =
		filterSelectionType.value == filterOptions.CREATION_DATE ||
		filterSelectionType.value == filterOptions.LAST_MIGRATION_ON ||
		filterSelectionType.value == filterOptions.OBSOLOTE_SINCE;

	dialogOpen.value = true;
};

// isDateFiltering.value =
// 	filterSelectionType.value == filterOptions.CREATION_DATE;

// (filterOptions.CREATION_DATE ||
// 	filterOptions.LAST_MIGRATION_ON ||
// 	filterOptions.OBSOLOTE_SINCE);

// const isTimeFiltering = () => {
// 	return (
// 		filterSelectionType.value ===
// 		(filterOptions.CREATION_DATE ||
// 			filterOptions.LAST_MIGRATION_ON ||
// 			filterOptions.OBSOLOTE_SINCE)
// 	);
// };

const onDialogClose = () => (dialogOpen.value = false);

const filterQuery: FilterQuery = {};

const onUpdateFilter = (value: string) => {
	console.log("update-filter", value);

	console.log(typeof value);

	if (filterSelectionType.value == filterOptions.REGISTRATION) {
		filterQuery.consentStatus = `{$in: ${unref(value)}`;
	}
	if (filterSelectionType.value == filterOptions.CLASSES) {
		filterQuery.classes = `{$in: ${unref(value)}`;
	}
	if (filterSelectionType.value == filterOptions.CREATION_DATE) {
		filterQuery.createdAt = `{$in: ${unref(value)}`;
	}
	if (filterSelectionType.value == filterOptions.LAST_MIGRATION_ON) {
		filterQuery.lastLoginSystemChange = `{$in: ${unref(value)}`;
	}
	if (filterSelectionType.value == filterOptions.OBSOLOTE_SINCE) {
		filterQuery.outdatedSince = `{$in: ${unref(value)}`;
	}
	console.log(filterQuery);
	dialogOpen.value = false;
};
</script>

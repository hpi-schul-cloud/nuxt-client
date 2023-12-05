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
				<v-list-item-title
					@click="onMenuClick(item.value)"
					class="menu-text"
					hover
				>
					{{ item.title }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>

	<FilterDialog
		:isOpen="dialogOpen"
		@dialog-closed="onDialogClose"
		@remove:filter="onRemoveFilter"
	>
		<template #title> {{ modalTitle }} </template>
		<template #content>
			<Registration
				v-if="filterSelectionType == FilterOptions.REGISTRATION"
				@update:filter="onUpdateFilter"
				@remove:filter="onRemoveFilter"
			/>
			<Classes
				v-if="filterSelectionType == FilterOptions.CLASSES"
				:classes="classes"
				@update:filter="onUpdateFilter"
				@remove:filter="onRemoveFilter"
			/>
			<TimeBetween
				v-if="isDateFiltering"
				@update:filter="onUpdateFilter"
				@remove:filter="onRemoveFilter"
			/>
		</template>
	</FilterDialog>
</template>

<script setup lang="ts">
import FilterDialog from "./FilterDialog.vue";
import { Registration, Classes, TimeBetween } from "./filterComponents";
import {
	FilterOptions,
	FilterQuery,
	SelectOptionsType,
} from "./types/filterTypes";
import { ref, computed } from "vue";

const classes = ["1A", "1B", "2C"];

const dialogOpen = ref(false);
const filterSelectionType = ref<FilterOptions | undefined>(undefined);

const filterMenuItems: SelectOptionsType[] = [
	{ title: "Registration", value: FilterOptions.REGISTRATION },
	{ title: "Classes", value: FilterOptions.CLASSES },
	{ title: "Creation date", value: FilterOptions.CREATION_DATE },
	{ title: "Last migrated on", value: FilterOptions.LAST_MIGRATION_ON },
	{ title: "Obsolete since", value: FilterOptions.OBSOLOTE_SINCE },
];

const isDateFiltering = ref<boolean>(false);

const modalTitle = computed(
	() =>
		filterMenuItems.find(
			(item: SelectOptionsType) => item.value == filterSelectionType.value
		)?.title
);

const onMenuClick = (filter: FilterOptions) => {
	filterSelectionType.value = filter;

	isDateFiltering.value =
		filterSelectionType.value == FilterOptions.CREATION_DATE ||
		filterSelectionType.value == FilterOptions.LAST_MIGRATION_ON ||
		filterSelectionType.value == FilterOptions.OBSOLOTE_SINCE;

	dialogOpen.value = true;
};

const onDialogClose = () => (dialogOpen.value = false);

const filterQuery: FilterQuery = {};

const onUpdateFilter = (value: string) => {
	if (filterSelectionType.value) filterQuery[filterSelectionType.value] = value;

	dialogOpen.value = false;
};

const onRemoveFilter = () => {
	if (filterSelectionType.value) delete filterQuery[filterSelectionType.value];
	dialogOpen.value = false;
};
</script>

<style lang="scss" scoped>
.menu-text {
	cursor: pointer;
}
</style>

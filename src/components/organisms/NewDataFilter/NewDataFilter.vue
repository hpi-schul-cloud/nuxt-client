<template>
	<v-menu>
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props" variant="flat">
				<v-icon class="filter-icon mr-2">$mdiTune</v-icon>
				Add Filter
				<v-icon class="filter-icon">$mdiMenuDown</v-icon>
			</v-btn>
		</template>

		<v-list>
			<v-list-item v-for="(item, index) in filterMenuItems" :key="index">
				<v-list-item-title
					@click="onFilterClick(item.value as FilterOptions)"
					class="menu-text"
					hover
				>
					{{ item.label }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
	<FilterChips
		:filter="filterChipTitles"
		@remove:filter="onRemoveChipFilter"
		@click:filter="onFilterClick"
	/>

	<FilterDialog
		:isOpen="dialogOpen"
		@dialog-closed="onCloseDialog"
		@remove:filter="onRemoveFilter"
	>
		<template #title> {{ modalTitle }} </template>
		<template #content>
			<!-- TODO: investigate error -->
			<ListSelection
				v-if="isSelectFiltering"
				:selection-list="selectionProps"
				:selected-list="filteredValues"
				@update:filter="onUpdateFilter"
				@remove:filter="onRemoveFilter"
				@dialog-closed="onCloseDialog"
			/>
			<!-- TODO: investigate error -->
			<TimeBetween
				v-if="isDateFiltering"
				:selected-date="filteredValues"
				@update:filter="onUpdateFilter"
				@remove:filter="onRemoveFilter"
				@dialog-closed="onCloseDialog"
			/>
		</template>
	</FilterDialog>
</template>

<script setup lang="ts">
import FilterDialog from "./FilterDialog.vue";
import { TimeBetween, FilterChips, ListSelection } from "./filterComponents";
import {
	FilterOptions,
	SelectOptionsType,
	FilterOptionsType,
	UserType,
} from "./types/filterTypes";
import { ref, computed, onMounted } from "vue";
import { useDataTableFilter } from "./composables/filter.composable";
import { useDataTableFilterApi } from "./composables/filterApi.composable";

const props = defineProps({
	filterFor: {
		type: String,
		default: () => UserType.STUDENT,
	},
});

const emit = defineEmits(["update:filter"]);

const dialogOpen = ref(false);

const filterForUser = computed(() => props.filterFor);

const {
	defaultFilterMenuItems,
	filterChipTitles,
	filterMenuItems,
	filterQuery,
	isDateFiltering,
	isSelectFiltering,
	registrationOptions,
	selectedFilterType,
	removeChipFilter,
	removeFilter,
	updateFilter,
} = useDataTableFilter(filterForUser.value as UserType);

const { classNamesList } = await useDataTableFilterApi();

const modalTitle = computed(
	() =>
		defaultFilterMenuItems.find(
			(item: SelectOptionsType) => item.value == selectedFilterType.value
		)?.label
);

const selectionProps = computed(() => {
	return selectedFilterType.value == FilterOptions.CLASSES
		? classNamesList
		: registrationOptions[filterForUser.value as UserType];
});

const filteredValues = computed(() => {
	if (!selectedFilterType.value) return undefined;

	const filterObject = filterQuery.value[selectedFilterType.value];

	if (!filterObject) return undefined;

	return filterObject;
});

const onCloseDialog = () => {
	selectedFilterType.value = undefined;
	dialogOpen.value = false;
};

const onFilterClick = (val: FilterOptionsType) => {
	selectedFilterType.value = val;
	dialogOpen.value = true;
};

const onRemoveChipFilter = (val: FilterOptions) => {
	removeChipFilter(val);
	emit("update:filter", filterQuery.value);
};

const onRemoveFilter = () => {
	removeFilter();
	dialogOpen.value = false;
	emit("update:filter", filterQuery.value);
};

const onUpdateFilter = (value: FilterOptions) => {
	updateFilter(value);
	dialogOpen.value = false;
	emit("update:filter", filterQuery.value);
};

onMounted(() => {
	filterMenuItems.value = defaultFilterMenuItems;
});
</script>

<style lang="scss" scoped>
.menu-text {
	cursor: pointer;
}
</style>

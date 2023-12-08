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
					@click="onFilterClick(item.value)"
					class="menu-text"
					hover
				>
					{{ item.title }}
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
			<ListSelection
				v-if="
					filterSelection == FilterOptions.CLASSES || FilterOptions.REGISTRATION
				"
				:classes="selectionProps"
				@update:filter="onUpdateFilter"
				@remove:filter="onRemoveFilter"
				@dialog-closed="onCloseDialog"
			/>
			<TimeBetween
				v-if="isDateFiltering"
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
} from "./types/filterTypes";
import { ref, computed, onMounted } from "vue";
import { useDataTableFilter } from "./composables/filter.composable";
import { useDataTableFilterApi } from "./composables/filterApi.composable";

const emit = defineEmits(["update:filter"]);

const dialogOpen = ref(false);

const {
	defaultFilterMenuItems,
	filterSelection,
	isDateFiltering,
	filterMenuItems,
	filterChipTitles,
	updateFilter,
	removeFilter,
	removeChipFilter,
	filterQuery,
	registrationOptions,
} = useDataTableFilter();

const { classNames } = await useDataTableFilterApi();

const modalTitle = computed(
	() =>
		defaultFilterMenuItems.find(
			(item: SelectOptionsType) => item.value == filterSelection.value
		)?.title
);

const selectionProps = computed(() => {
	return filterSelection.value == FilterOptions.CLASSES
		? classNames
		: registrationOptions;
});

const onFilterClick = (val: FilterOptionsType) => {
	filterSelection.value = val;

	dialogOpen.value = true;
};

const onCloseDialog = () => (dialogOpen.value = false);

const onUpdateFilter = (value: FilterOptions) => {
	updateFilter(value);
	dialogOpen.value = false;
	emit("update:filter", filterQuery.value);
};

const onRemoveFilter = () => {
	removeFilter();
	dialogOpen.value = false;
	emit("update:filter", filterQuery.value);
};

const onRemoveChipFilter = (val: FilterOptions) => {
	removeChipFilter(val);
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

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
					@click="onMenuClick(item.value)"
					class="menu-text"
					hover
				>
					{{ item.title }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
	<FilterChips :filter="filterChipTitles" @remove:filter="onRemoveChipFilter" />

	<FilterDialog
		:isOpen="dialogOpen"
		@dialog-closed="onCloseDialog"
		@remove:filter="onRemoveFilter"
	>
		<template #title> {{ modalTitle }} </template>
		<template #content>
			<Registration
				v-if="filterSelection == FilterOptions.REGISTRATION"
				@update:filter="onUpdateFilter"
				@remove:filter="onRemoveFilter"
				@dialog-closed="onCloseDialog"
			/>
			<Classes
				v-if="filterSelection == FilterOptions.CLASSES"
				:classes="classes"
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
import {
	Registration,
	Classes,
	TimeBetween,
	FilterChips,
} from "./filterComponents";
import { FilterOptions, SelectOptionsType } from "./types/filterTypes";
import { ref, computed, onMounted } from "vue";
import { useDataTableFilter } from "./filter.composable";

const dialogOpen = ref(false);

const {
	defaultFilterMenuItems,
	filterSelection,
	classes,
	isDateFiltering,
	filterMenuItems,
	filterChipTitles,
	updateFilter,
	removeFilter,
	removeChipFilter,
} = useDataTableFilter();

const modalTitle = computed(
	() =>
		defaultFilterMenuItems.find(
			(item: SelectOptionsType) => item.value == filterSelection.value
		)?.title
);

const onMenuClick = (filter: FilterOptions) => {
	filterSelection.value = filter;

	dialogOpen.value = true;
};

const onCloseDialog = () => (dialogOpen.value = false);

const onUpdateFilter = (value: FilterOptions) => {
	updateFilter(value);
	dialogOpen.value = false;
};

const onRemoveFilter = () => {
	removeFilter();
	dialogOpen.value = false;
};

const onRemoveChipFilter = (val: FilterOptions) => {
	removeChipFilter(val);
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

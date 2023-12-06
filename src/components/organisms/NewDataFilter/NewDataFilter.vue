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
	<FilterChips :filter="filterTitles" @remove:filter="onRemoveChipFilter" />

	<!-- {{ filterMenuItems }} -->

	<FilterDialog
		:isOpen="dialogOpen"
		@dialog-closed="onCloseDialog"
		@remove:filter="onRemoveFilter"
	>
		<template #title> {{ modalTitle }} </template>
		<template #content>
			<Registration
				v-if="filterSelectionType == FilterOptions.REGISTRATION"
				@update:filter="onUpdateFilter"
				@remove:filter="onRemoveFilter"
				@dialog-closed="onCloseDialog"
			/>
			<Classes
				v-if="filterSelectionType == FilterOptions.CLASSES"
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
import {
	FilterOptions,
	FilterQuery,
	SelectOptionsType,
} from "./types/filterTypes";
import { ref, computed, onMounted } from "vue";
import { useDataTableFilter } from "./filter.composable";

const classes = ["1A", "1B", "1A"];

const dialogOpen = ref(false);
const filterSelectionType = ref<FilterOptions | undefined>(undefined);

const { defaultFilterMenuItems } = useDataTableFilter();

const isDateFiltering = ref<boolean>(false);

const modalTitle = computed(
	() =>
		defaultFilterMenuItems.find(
			(item: SelectOptionsType) => item.value == filterSelectionType.value
		)?.title
);

const filterQuery: FilterQuery = {};
const filterTitles = ref<string[]>([]);

const filterMenuItems = ref<SelectOptionsType[]>([]);

const onMenuClick = (filter: FilterOptions) => {
	filterSelectionType.value = filter;

	isDateFiltering.value =
		filterSelectionType.value == FilterOptions.CREATION_DATE ||
		filterSelectionType.value == FilterOptions.LAST_MIGRATION_ON ||
		filterSelectionType.value == FilterOptions.OBSOLOTE_SINCE;

	dialogOpen.value = true;
};

const onCloseDialog = () => (dialogOpen.value = false);

const onUpdateFilter = (value: string) => {
	if (filterSelectionType.value) filterQuery[filterSelectionType.value] = value;

	filterMenuItems.value = defaultFilterMenuItems.filter(
		(item: SelectOptionsType) => item.value in filterQuery == false
	);

	filterTitles.value = Object.keys(filterQuery);
	dialogOpen.value = false;
};

const onRemoveFilter = () => {
	if (filterSelectionType.value) delete filterQuery[filterSelectionType.value];

	filterTitles.value = Object.keys(filterQuery);
	dialogOpen.value = false;
};

const onRemoveChipFilter = (val: FilterOptions) => {
	delete filterQuery[val];

	filterMenuItems.value = defaultFilterMenuItems.filter(
		(item: SelectOptionsType) => item.value in filterQuery == false
	);
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

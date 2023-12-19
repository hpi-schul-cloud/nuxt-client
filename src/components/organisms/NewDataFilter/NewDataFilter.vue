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
					@click="onFilterClick(item.value as FilterOptionsType)"
					class="menu-text"
					hover
				>
					{{ item.label }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
	<FilterChips
		:filters="filterChipTitles"
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
				v-if="isSelectFiltering"
				:selection-list="selectionProps"
				:selected-list="filteredValues"
				@update:filter="onUpdateFilter"
				@remove:filter="onRemoveFilter"
				@dialog-closed="onCloseDialog"
			/>
			<DateBetween
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
import { DateBetween, FilterChips, ListSelection } from "./filterComponents";
import {
	DateSelection,
	FilterOption,
	SelectOptionsType,
	FilterOptionsType,
	User,
} from "./types";
import { ref, computed, onMounted } from "vue";
import { useDataTableFilter } from "./composables/filter.composable";
import { useStore } from "vuex";
import { authModule } from "@/store";

const { currentYear } = authModule.getSchool;

const store = useStore();

const props = defineProps({
	filterFor: {
		type: String,
		default: () => User.STUDENT,
	},
});

const emit = defineEmits(["update:filter"]);

const dialogOpen = ref(false);

const userType = computed(() => props.filterFor);

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
} = useDataTableFilter(userType.value);

const classNamesList = ref([]);

const modalTitle = computed(
	() =>
		defaultFilterMenuItems.find(
			(item: SelectOptionsType) => item.value == selectedFilterType.value
		)?.label
);

const selectionProps = computed(() => {
	return selectedFilterType.value == FilterOption.CLASSES
		? classNamesList.value
		: registrationOptions[userType.value as User];
});

const filteredValues = computed(() => {
	if (!selectedFilterType.value) return;

	return filterQuery.value[selectedFilterType.value];
});

const onCloseDialog = () => {
	selectedFilterType.value = undefined;
	dialogOpen.value = false;
};

const onFilterClick = (val: FilterOptionsType) => {
	selectedFilterType.value = val;
	dialogOpen.value = true;
};

const onRemoveChipFilter = (val: FilterOption) => {
	removeChipFilter(val);
	emit("update:filter", filterQuery.value);
};

const onRemoveFilter = () => {
	removeFilter();
	dialogOpen.value = false;
	emit("update:filter", filterQuery.value);
};

const onUpdateFilter = (value: string[] & DateSelection) => {
	updateFilter(value);
	dialogOpen.value = false;
	emit("update:filter", filterQuery.value);
};

const getClassNameList = () => {
	return store?.state["classes"].list.reduce(
		(acc: SelectOptionsType[], item: { displayName: string }) =>
			acc.concat({
				label: item.displayName,
				value: item.displayName,
			}),
		[]
	);
};

onMounted(async () => {
	await store.dispatch("classes/find", {
		query: {
			$limit: 1000,
			year: currentYear._id,
		},
	});

	classNamesList.value = getClassNameList();
});
</script>

<style lang="scss" scoped>
.menu-text {
	cursor: pointer;
}
</style>

<template>
	<v-menu>
		<template #activator="{ props: menuProps }">
			<v-btn v-bind="menuProps" variant="flat">
				<v-icon class="filter-icon mr-2" :icon="mdiTune" />
				<span data-testid="filter-title">{{ filterTitle }}</span>
				<v-icon class="filter-icon" :icon="mdiMenuDown" />
			</v-btn>
		</template>

		<v-list>
			<v-list-item v-for="(item, index) in filterMenuItems" :key="index">
				<v-list-item-title class="menu-text" hover @click="onFilterClick(item.value as FilterOptionsType)">
					<span class="filter-menu-item">{{ item.label }}</span>
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
	<FilterChips :filters="filterChipTitles" @remove:filter="onRemoveChipFilter" @click:filter="onFilterClick" />

	<FilterDialog :is-open="dialogOpen" @dialog-closed="onCloseDialog" @remove:filter="onRemoveFilter">
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
import { useDataTableFilter } from "./composables/filter.composable";
import { DateBetween, FilterChips, ListSelection } from "./filterComponents";
import FilterDialog from "./FilterDialog.vue";
import { DateSelection, FilterOption, FilterOptionsType, SelectOptionsType, User } from "./types";
import { mdiMenuDown, mdiTune } from "@icons/material";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	filterFor: {
		type: String,
		default: () => User.STUDENT,
	},
	classNames: {
		type: Array as PropType<SelectOptionsType[]>,
		default: () => [],
	},
});

const emit = defineEmits(["update:filter"]);
const { t } = useI18n();
const filterTitle = computed(() => t("components.organisms.DataFilter.add"));
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

const modalTitle = computed(
	() => defaultFilterMenuItems.find((item: SelectOptionsType) => item.value === selectedFilterType.value)?.label
);

const selectionProps = computed(() =>
	selectedFilterType.value === FilterOption.CLASSES ? props.classNames : registrationOptions[userType.value as User]
);

const filteredValues = computed(() => {
	if (!selectedFilterType.value) return;
	return filterQuery.value[selectedFilterType.value] as string[] & DateSelection;
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
	removeFilter();
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

defineExpose({ dialogOpen });
</script>

<style lang="scss" scoped>
.menu-text {
	cursor: pointer;
}
</style>

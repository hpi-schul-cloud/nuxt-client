import { createSharedComposable } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import {
	FilterOptions,
	FilterOptionsType,
	FilterQuery,
	RegistrationTypes,
	SelectOptionsType,
} from "../types/filterTypes";
import { useI18n } from "vue-i18n";
import { useFilterLocalStorage } from "./localStorage.composable";

const dataTableFilter = () => {
	const { t } = useI18n();
	const { setFilterState, getFilterStorage } = useFilterLocalStorage();

	const filterQuery = ref<FilterQuery>({});

	const defaultFilterMenuItems: SelectOptionsType[] = [
		{
			label: t("common.labels.registration"),
			value: FilterOptions.REGISTRATION,
		},
		{
			label: t("utils.adminFilter.class.title"),
			value: FilterOptions.CLASSES,
		},
		{
			label: t("utils.adminFilter.date.title"),
			value: FilterOptions.CREATION_DATE,
		},
		{
			label: t("utils.adminFilter.lastMigration.title"),
			value: FilterOptions.LAST_MIGRATION_ON,
		},
		{
			label: t("utils.adminFilter.outdatedSince.title"),
			value: FilterOptions.OBSOLOTE_SINCE,
		},
	];

	const registrationOptions: SelectOptionsType[] = [
		{
			label: t("pages.administration.students.legend.icon.success"),
			value: RegistrationTypes.COMPLETE,
		},
		{
			label: t("utils.adminFilter.consent.label.parentsAgreementMissing"),
			value: RegistrationTypes.PARENT_AGREED,
		},
		{
			label: t("utils.adminFilter.consent.label.missing"),
			value: RegistrationTypes.MISSING,
		},
	];

	const selectedFilterType = ref<FilterOptionsType | undefined>(undefined);

	const isDateFiltering = computed(() => {
		return (
			selectedFilterType.value == FilterOptions.CREATION_DATE ||
			selectedFilterType.value == FilterOptions.LAST_MIGRATION_ON ||
			selectedFilterType.value == FilterOptions.OBSOLOTE_SINCE
		);
	});

	const isSelectFiltering = computed(() => {
		return (
			selectedFilterType.value == FilterOptions.CLASSES ||
			selectedFilterType.value == FilterOptions.REGISTRATION
		);
	});

	const filterMenuItems = ref<SelectOptionsType[]>([]);

	const filterChipTitles = ref<Array<string>>([]);

	const updateFilter = (value: FilterOptions) => {
		if (selectedFilterType.value)
			filterQuery.value[selectedFilterType.value] = value;

		filterMenuItems.value = defaultFilterMenuItems.filter(
			(item: SelectOptionsType) => !(item.value in filterQuery.value)
		);

		filterChipTitles.value = Object.keys(filterQuery.value);

		setFilterState(filterQuery.value);
	};

	const removeFilter = () => {
		if (selectedFilterType.value)
			delete filterQuery.value[selectedFilterType.value];

		filterChipTitles.value = Object.keys(filterQuery.value);
		setFilterState(filterQuery.value);
	};

	const removeChipFilter = (val: FilterOptions) => {
		delete filterQuery.value[val];

		filterMenuItems.value = defaultFilterMenuItems.filter(
			(item: SelectOptionsType) => !(item.value in filterQuery.value)
		);
		setFilterState(filterQuery.value);
	};

	onMounted(() => {
		// @ts-expect-error TODO: investigate error
		filterQuery.value = getFilterStorage();
		filterChipTitles.value = Object.keys(filterQuery.value);
	});

	return {
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
	};
};

export const useDataTableFilter = createSharedComposable(dataTableFilter);

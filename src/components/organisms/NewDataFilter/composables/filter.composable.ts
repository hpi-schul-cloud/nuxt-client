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
			title: t("common.labels.registration"),
			value: FilterOptions.REGISTRATION,
		},
		{ title: t("utils.adminFilter.class.title"), value: FilterOptions.CLASSES },
		{
			title: t("utils.adminFilter.date.title"),
			value: FilterOptions.CREATION_DATE,
		},
		{
			title: t("utils.adminFilter.lastMigration.title"),
			value: FilterOptions.LAST_MIGRATION_ON,
		},
		{
			title: t("utils.adminFilter.outdatedSince.title"),
			value: FilterOptions.OBSOLOTE_SINCE,
		},
	];

	const registrationOptions = [
		{
			title: t("pages.administration.students.legend.icon.success"),
			value: RegistrationTypes.COMPLETE,
		},
		{
			title: t("utils.adminFilter.consent.label.parentsAgreementMissing"),
			value: RegistrationTypes.PARENT_AGREED,
		},
		{
			title: t("utils.adminFilter.consent.label.missing"),
			value: RegistrationTypes.MISSING,
		},
	];

	const filterSelection = ref<FilterOptionsType | undefined>(undefined);

	const isDateFiltering = computed(() => {
		return (
			filterSelection.value == FilterOptions.CREATION_DATE ||
			filterSelection.value == FilterOptions.LAST_MIGRATION_ON ||
			filterSelection.value == FilterOptions.OBSOLOTE_SINCE
		);
	});

	const isSelectFiltering = computed(() => {
		return (
			filterSelection.value == FilterOptions.CLASSES ||
			filterSelection.value == FilterOptions.REGISTRATION
		);
	});

	const filterMenuItems = ref<SelectOptionsType[]>([]);

	const filterChipTitles = ref<Array<string>>([]);

	const updateFilter = (value: FilterOptions) => {
		if (filterSelection.value) filterQuery.value[filterSelection.value] = value;

		filterMenuItems.value = defaultFilterMenuItems.filter(
			(item: SelectOptionsType) => item.value in filterQuery.value == false
		);

		filterChipTitles.value = Object.keys(filterQuery.value);

		setFilterState(filterQuery.value);
	};

	const removeFilter = () => {
		if (filterSelection.value) delete filterQuery.value[filterSelection.value];

		filterChipTitles.value = Object.keys(filterQuery.value);
		setFilterState(filterQuery.value);
	};

	const removeChipFilter = (val: FilterOptions) => {
		delete filterQuery.value[val];

		filterMenuItems.value = defaultFilterMenuItems.filter(
			(item: SelectOptionsType) => item.value in filterQuery.value == false
		);
		setFilterState(filterQuery.value);
	};

	onMounted(() => {
		// @ts-expect-error asdas
		filterQuery.value = getFilterStorage();
		filterChipTitles.value = Object.keys(filterQuery.value);
	});

	return {
		defaultFilterMenuItems,
		filterChipTitles,
		filterMenuItems,
		filterQuery,
		filterSelection,
		isDateFiltering,
		isSelectFiltering,
		registrationOptions,
		removeChipFilter,
		removeFilter,
		updateFilter,
	};
};

export const useDataTableFilter = createSharedComposable(dataTableFilter);

import { createSharedComposable } from "@vueuse/core";
import { computed, ref } from "vue";
import {
	FilterOptions,
	FilterQuery,
	RegistrationTypes,
	SelectOptionsType,
} from "./types/filterTypes";
import { useI18n } from "vue-i18n";

const dataTableFilter = () => {
	const { t } = useI18n();

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

	const filterQuery: FilterQuery = {};

	const filterSelection = ref<FilterOptions | undefined>(undefined);

	const classes = ["1A", "1B", "1A"];

	const isDateFiltering = computed(() => {
		return (
			filterSelection.value == FilterOptions.CREATION_DATE ||
			filterSelection.value == FilterOptions.LAST_MIGRATION_ON ||
			filterSelection.value == FilterOptions.OBSOLOTE_SINCE
		);
	});

	const filterMenuItems = ref<SelectOptionsType[]>([]);

	const filterChipTitles = ref<Array<string>>([]);

	const updateFilter = (value: FilterOptions) => {
		if (filterSelection.value) filterQuery[filterSelection.value] = value;

		filterMenuItems.value = defaultFilterMenuItems.filter(
			(item: SelectOptionsType) => item.value in filterQuery == false
		);

		filterChipTitles.value = Object.keys(filterQuery);
	};

	const removeFilter = () => {
		if (filterSelection.value) delete filterQuery[filterSelection.value];

		filterChipTitles.value = Object.keys(filterQuery);
	};

	const removeChipFilter = (val: FilterOptions) => {
		delete filterQuery[val];

		filterMenuItems.value = defaultFilterMenuItems.filter(
			(item: SelectOptionsType) => item.value in filterQuery == false
		);
	};

	return {
		defaultFilterMenuItems,
		registrationOptions,
		filterQuery,
		filterSelection,
		classes,
		isDateFiltering,
		filterMenuItems,
		filterChipTitles,
		updateFilter,
		removeFilter,
		removeChipFilter,
	};
};

export const useDataTableFilter = createSharedComposable(dataTableFilter);

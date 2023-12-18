import { createSharedComposable } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import {
	FilterOptions,
	FilterOptionsType,
	FilterQuery,
	RegistrationTypes,
	SelectOptionsType,
	UserType,
	UserBasedRegistrationOptions,
	ChipTitle,
	FilterItem,
	DateSelection,
} from "../types/filterTypes";
import { useI18n } from "vue-i18n";
import { useFilterLocalStorage } from "./localStorage.composable";
import { printDate } from "@/plugins/datetime";

const dataTableFilter = (userType: string) => {
	const { t } = useI18n();
	const { setFilterState, getFilterStorage, initializeUserType } =
		useFilterLocalStorage();
	initializeUserType(userType);

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

	const registrationOptions: UserBasedRegistrationOptions = {
		[UserType.STUDENT]: [
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
		],
		[UserType.TEACHER]: [
			{
				label: t("pages.administration.students.legend.icon.success"),
				value: RegistrationTypes.COMPLETE,
			},

			{
				label: t("utils.adminFilter.consent.label.missing"),
				value: RegistrationTypes.MISSING,
			},
		],
	};

	const selectedFilterType = ref<FilterOptionsType>();

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

	const filterChipTitles = ref<Array<ChipTitle>>([]);

	const updateFilter = (value: string[] | DateSelection) => {
		if (!selectedFilterType.value) return;
		// @ts-expect-error TODO: check type error
		filterQuery.value[selectedFilterType.value] = value;

		filterMenuItems.value = defaultFilterMenuItems.filter(
			(item: SelectOptionsType) => !(item.value in filterQuery.value)
		);

		setFilterChipTitles();

		setFilterState(filterQuery.value);
		setFilterMenuItems();
	};

	const removeFilter = () => {
		if (selectedFilterType.value)
			delete filterQuery.value[selectedFilterType.value];

		setFilterChipTitles();
		setFilterState(filterQuery.value);
		setFilterMenuItems();
	};

	const removeChipFilter = (val: FilterOptions) => {
		delete filterQuery.value[val];

		setFilterState(filterQuery.value);
		setFilterMenuItems();
	};

	const setFilterMenuItems = () => {
		filterMenuItems.value = defaultFilterMenuItems.filter(
			(item: SelectOptionsType) => !(item.value in filterQuery.value)
		);
	};

	const prepareTitles = (chipItem: FilterItem) => {
		if (chipItem[0] == FilterOptions.REGISTRATION) {
			const statusKeyMap = {
				[RegistrationTypes.COMPLETE]: t(
					"pages.administration.students.legend.icon.success"
				),
				[RegistrationTypes.MISSING]: t(
					"utils.adminFilter.consent.label.missing"
				),
				[RegistrationTypes.PARENT_AGREED]: t(
					"utils.adminFilter.consent.label.parentsAgreementMissing"
				),
			};
			const status = chipItem[1].map((val) => {
				return statusKeyMap[val as RegistrationTypes];
			});

			return status.join(` ${t("common.words.and")} `);
		}

		if (chipItem[0] == FilterOptions.CLASSES)
			return `${t("utils.adminFilter.class.title")} = ${chipItem[1].join(
				", "
			)}`;

		if (chipItem[0] == FilterOptions.CREATION_DATE)
			return `${t("utils.adminFilter.date.created")} ${printDate(
				chipItem[1].$gte
			)} ${t("common.words.and")} ${printDate(chipItem[1].$lte)}`;

		if (chipItem[0] == FilterOptions.LAST_MIGRATION_ON)
			return `${t("utils.adminFilter.lastMigration.title")} ${printDate(
				chipItem[1].$gte
			)} ${t("common.words.and")} ${printDate(chipItem[1].$lte)}`;

		if (chipItem[0] == FilterOptions.OBSOLOTE_SINCE)
			return `${t("utils.adminFilter.outdatedSince.title")} ${printDate(
				chipItem[1].$gte
			)} ${t("common.words.and")} ${printDate(chipItem[1].$lte)}`;
		return [];
	};

	const setFilterChipTitles = () => {
		const items = Object.entries(filterQuery.value).reduce(
			(acc: Array<object>, item) => {
				return acc.concat({
					item: item[0],
					title: prepareTitles(item as FilterItem),
				});
			},
			[]
		);
		filterChipTitles.value = (items as ChipTitle[]) || [];
	};

	onMounted(() => {
		console.log(selectedFilterType.value);
		filterQuery.value = getFilterStorage() ?? {};
		if (filterQuery.value) setFilterChipTitles();
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
		userType,
		removeChipFilter,
		removeFilter,
		updateFilter,
	};
};

export const useDataTableFilter = createSharedComposable(dataTableFilter);

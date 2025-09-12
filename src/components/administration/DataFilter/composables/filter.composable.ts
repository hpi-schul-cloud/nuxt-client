import { computed, onMounted, ref } from "vue";

import {
	FilterOption,
	FilterOptionsType,
	FilterQuery,
	Registration,
	SelectOptionsType,
	User,
	UserBasedRegistrationOptions,
	ChipTitle,
	FilterItem,
	UpdateFilterParamType,
} from "../types";
import { useI18n } from "vue-i18n";
import { useFilterLocalStorage } from "./localStorage.composable";
import { printDate } from "@/plugins/datetime";

export const useDataTableFilter = (userType: string) => {
	const { t } = useI18n();
	const { setFilterState, getFilterStorage, initializeUserType } =
		useFilterLocalStorage();
	initializeUserType(userType);

	const filterQuery = ref<FilterQuery>({});

	const defaultFilterMenuItems: SelectOptionsType[] = [
		{
			label: t("common.labels.registration"),
			value: FilterOption.REGISTRATION,
		},
		{
			label: t("utils.adminFilter.class.title"),
			value: FilterOption.CLASSES,
		},
		{
			label: t("utils.adminFilter.date.title"),
			value: FilterOption.CREATION_DATE,
		},
		{
			label: t("utils.adminFilter.lastMigration.title"),
			value: FilterOption.LAST_MIGRATION_ON,
		},
		{
			label: t("utils.adminFilter.outdatedSince.title"),
			value: FilterOption.OBSOLOTE_SINCE,
		},
	];

	const registrationOptions: UserBasedRegistrationOptions = {
		[User.STUDENT]: [
			{
				label: t("pages.administration.students.legend.icon.success"),
				value: Registration.COMPLETE,
			},
			{
				label: t("utils.adminFilter.consent.label.parentsAgreementMissing"),
				value: Registration.PARENT_AGREED,
			},
			{
				label: t("utils.adminFilter.consent.label.missing"),
				value: Registration.MISSING,
			},
		],
		[User.TEACHER]: [
			{
				label: t("pages.administration.students.legend.icon.success"),
				value: Registration.COMPLETE,
			},

			{
				label: t("utils.adminFilter.consent.label.missing"),
				value: Registration.MISSING,
			},
		],
	};

	const selectedFilterType = ref<FilterOptionsType>();

	const isDateFiltering = computed(() => {
		return (
			selectedFilterType.value == FilterOption.CREATION_DATE ||
			selectedFilterType.value == FilterOption.LAST_MIGRATION_ON ||
			selectedFilterType.value == FilterOption.OBSOLOTE_SINCE
		);
	});

	const isSelectFiltering = computed(() => {
		return (
			selectedFilterType.value == FilterOption.CLASSES ||
			selectedFilterType.value == FilterOption.REGISTRATION
		);
	});

	const filterMenuItems = ref<SelectOptionsType[]>([]);

	const filterChipTitles = ref<Array<ChipTitle>>([]);

	const updateFilter = (value: UpdateFilterParamType) => {
		if (!selectedFilterType.value) return;
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

	const removeChipFilter = (val: FilterOption) => {
		delete filterQuery.value[val];

		setFilterState(filterQuery.value);
		setFilterMenuItems();
	};

	const setFilterMenuItems = () => {
		filterMenuItems.value = defaultFilterMenuItems.filter(
			(item: SelectOptionsType) => !(item.value in filterQuery.value)
		);
	};

	const prepareChipTitles = (chipItem: FilterItem) => {
		if (chipItem[0] == FilterOption.REGISTRATION) {
			const statusKeyMap = {
				[Registration.COMPLETE]: t(
					"pages.administration.students.legend.icon.success"
				),
				[Registration.MISSING]: t("utils.adminFilter.consent.label.missing"),
				[Registration.PARENT_AGREED]: t(
					"utils.adminFilter.consent.label.parentsAgreementMissing"
				),
			};
			const status = chipItem[1].map((val) => {
				return statusKeyMap[val as Registration];
			});

			return status.join(` ${t("common.words.and")} `);
		}

		if (chipItem[0] == FilterOption.CLASSES)
			return `${t("utils.adminFilter.class.title")} = ${chipItem[1].join(
				", "
			)}`;

		if (chipItem[0] == FilterOption.CREATION_DATE)
			return `${t("utils.adminFilter.date.created")} ${printDate(
				chipItem[1].$gte
			)} ${t("common.words.and")} ${printDate(chipItem[1].$lte)}`;

		if (chipItem[0] == FilterOption.LAST_MIGRATION_ON)
			return `${t("utils.adminFilter.lastMigration.title")} ${printDate(
				chipItem[1].$gte
			)} ${t("common.words.and")} ${printDate(chipItem[1].$lte)}`;

		if (chipItem[0] == FilterOption.OBSOLOTE_SINCE)
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
					title: prepareChipTitles(item as FilterItem),
				});
			},
			[]
		);
		filterChipTitles.value = (items as ChipTitle[]) || [];
	};

	onMounted(() => {
		filterQuery.value = getFilterStorage() ?? {};
		if (filterQuery.value) setFilterChipTitles();
		setFilterMenuItems();
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

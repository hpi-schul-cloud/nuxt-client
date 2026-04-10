import { FilterOption, User } from "./enums";

type FilterOptionsType = "consentStatus" | "classes" | "createdAt" | "lastLoginSystemChange" | "outdatedSince";

type ChipTitle = {
	item: string;
	title: string;
};

type FilterItem = [string, string[] & DateSelection];

type SelectOptionsType = {
	label: string;
	value: string;
};

type UserBasedRegistrationOptions = {
	[User.STUDENT]: SelectOptionsType[];
	[User.TEACHER]: SelectOptionsType[];
};

type FilterQuery = {
	[FilterOption.LAST_MIGRATION_ON]?: DateSelection;
	[FilterOption.REGISTRATION]?: string[];
	[FilterOption.CLASSES]?: string[];
	[FilterOption.CREATION_DATE]?: DateSelection;
	[FilterOption.OBSOLOTE_SINCE]?: DateSelection;
};

type Query = {
	query: FilterQuery;
	searchQuery?: string;
};

type FilterType = {
	[key: string]: Query | undefined;
};

type StoragePaginationState = {
	[key: string]: {
		page: number;
		limit: number;
	};
};

type StorageSortingState = {
	[key: string]: {
		sortBy: string;
		sortOrder: string;
	};
};

type FilterLocalStorage = {
	pagination: StoragePaginationState;
	filter: FilterType;
	sorting: StorageSortingState;
	version: number;
};

type DateSelection = {
	$gte: string;
	$lte: string;
};

type UpdateFilterParamType = string[] & DateSelection;

export type {
	ChipTitle,
	DateSelection,
	FilterItem,
	FilterLocalStorage,
	FilterOptionsType,
	FilterQuery,
	SelectOptionsType,
	UpdateFilterParamType,
	UserBasedRegistrationOptions,
};

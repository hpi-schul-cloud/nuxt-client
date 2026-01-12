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
};

type StorageFilterState = {
	"pages.administration.students.index"?: Query;
	"pages.administration.teachers.index"?: Query;
};

type UiState = {
	pagination: object;
	filter: StorageFilterState;
	sorting: object;
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
	FilterOptionsType,
	FilterQuery,
	SelectOptionsType,
	UiState,
	UpdateFilterParamType,
	UserBasedRegistrationOptions,
};

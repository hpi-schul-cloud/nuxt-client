enum FilterOptions {
	REGISTRATION = "consentStatus",
	CLASSES = "classes",
	CREATION_DATE = "createdAt",
	LAST_MIGRATION_ON = "lastLoginSystemChange",
	OBSOLOTE_SINCE = "outdatedSince",
}

enum RegistrationTypes {
	COMPLETE = "ok",
	PARENT_AGREED = "parentsAgreed",
	MISSING = "missing",
}

type SelectOptionsType = {
	title: string;
	value: FilterOptions;
};

type FilterQuery = {
	consentStatus?: string | string[];
	classes?: string;
	createdAt?: string;
	lastLoginSystemChange?: string;
	outdatedSince?: string;
};

// TODO: set type here
// type UserBasedFilterState =
// 	| "pages.administration.students.index"
// 	| "pages.administration.teachers.index";

type Query = {
	query: FilterQuery;
};

type FilterState = {
	"pages.administration.students.index"?: Query;
	"pages.administration.teachers.index"?: Query;
};

type UiState = {
	pagination: object;
	filter: FilterState;
	sorting: object;
	version: number;
};

export {
	FilterOptions,
	RegistrationTypes,
	SelectOptionsType,
	FilterQuery,
	UiState,
};

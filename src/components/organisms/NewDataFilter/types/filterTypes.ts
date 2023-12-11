enum FilterOptions {
	REGISTRATION = "consentStatus",
	CLASSES = "classes",
	CREATION_DATE = "createdAt",
	LAST_MIGRATION_ON = "lastLoginSystemChange",
	OBSOLOTE_SINCE = "outdatedSince",
}

type FilterOptionsType =
	| "consentStatus"
	| "classes"
	| "createdAt"
	| "lastLoginSystemChange"
	| "outdatedSince";

enum RegistrationTypes {
	COMPLETE = "ok",
	PARENT_AGREED = "parentsAgreed",
	MISSING = "missing",
}

type SelectOptionsType = {
	label: string;
	value: FilterOptions | string;
};

type FilterQuery = {
	lastLoginSystemChange?: DateSelection | string;
	classes?: string[] | string;
	consentStatus?: RegistrationTypes | string;
	createdAt?: DateSelection | string;
	outdatedSince?: DateSelection | string;
};

// TODO: set type here
// type UserBasedFilterState =
// 	| "pages.administration.students.index"
// 	| "pages.administration.teachers.index";

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

export {
	DateSelection,
	FilterOptions,
	FilterOptionsType,
	FilterQuery,
	RegistrationTypes,
	SelectOptionsType,
	UiState,
};

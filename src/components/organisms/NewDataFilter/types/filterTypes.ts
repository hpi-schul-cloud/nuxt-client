enum FilterOptions {
	REGISTRATION = "consentStatus",
	CLASSES = "classes",
	CREATION_DATE = "createdAt",
	LAST_MIGRATION_ON = "lastLoginSystemChange",
	OBSOLOTE_SINCE = "outdatedSince",
}

enum UserType {
	STUDENT = "student",
	TEACHER = "teacher",
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

type ChipTitle = {
	item: string;
	title: string;
};

type FilterItem = [string, string[] & DateSelection];

type SelectOptionsType = {
	label: string;
	value: FilterOptions | string;
};

type UserBasedRegistrationOptions = {
	[UserType.STUDENT]: SelectOptionsType[];
	[UserType.TEACHER]: SelectOptionsType[];
};

type FilterQuery = {
	lastLoginSystemChange?: DateSelection;
	classes?: string[];
	consentStatus?: string[];
	createdAt?: DateSelection;
	outdatedSince?: DateSelection;
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

export {
	ChipTitle,
	DateSelection,
	FilterItem,
	FilterOptions,
	FilterOptionsType,
	FilterQuery,
	RegistrationTypes,
	SelectOptionsType,
	UiState,
	UserBasedRegistrationOptions,
	UserType,
};

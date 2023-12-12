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

type SelectOptionsType = {
	label: string;
	value: FilterOptions | string;
};

type UserBasedRegistrationOptions = {
	[UserType.STUDENT]: SelectOptionsType[];
	[UserType.TEACHER]: SelectOptionsType[];
};

type FilterQuery = {
	lastLoginSystemChange?: DateSelection | string;
	classes?: string[] | string;
	consentStatus?: RegistrationTypes | string;
	createdAt?: DateSelection | string;
	outdatedSince?: DateSelection | string;
};

type Query = {
	query: FilterQuery;
};

interface StorageFilterState {
	"pages.administration.students.index"?: Query;
	"pages.administration.teachers.index"?: Query;
}

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
	UserBasedRegistrationOptions,
	UserType,
};

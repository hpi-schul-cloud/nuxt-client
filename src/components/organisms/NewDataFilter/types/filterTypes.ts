// enum FilterOptions {
// 	REGISTRATION = "registration",
// 	CLASSES = "classes",
// 	CREATION_DATE = "creationDate",
// 	LAST_MIGRATION_ON = "lastMigrationOn",
// 	OBSOLOTE_SINCE = "obsolote_since",
// }

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

export { FilterOptions, RegistrationTypes, SelectOptionsType, FilterQuery };

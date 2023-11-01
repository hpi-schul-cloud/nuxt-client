enum filterOptions {
	REGISTRATION = "registration",
	CLASSES = "classes",
	CREATION_DATE = "creationDate",
	LAST_MIGRATION_ON = "lastMigrationOn",
	OBSOLOTE_SINCE = "obsolote_since",
}

enum registrationTypes {
	COMPLETE = "ok",
	PARENT_AGREED = "parentsAgreed",
	MISSING = "missing",
}

type SelectOptionsType = {
	title: string;
	value: filterOptions | registrationTypes;
};

type FilterQuery = {
	consentStatus?: string;
	classes?: string;
	createdAt?: string;
	lastLoginSystemChange?: string;
	outdatedSince?: string;
};

export { filterOptions, registrationTypes, SelectOptionsType, FilterQuery };

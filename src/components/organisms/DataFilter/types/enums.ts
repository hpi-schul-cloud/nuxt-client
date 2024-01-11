enum FilterOption {
	REGISTRATION = "consentStatus",
	CLASSES = "classes",
	CREATION_DATE = "createdAt",
	LAST_MIGRATION_ON = "lastLoginSystemChange",
	OBSOLOTE_SINCE = "outdatedSince",
}

enum User {
	STUDENT = "student",
	TEACHER = "teacher",
}

enum Registration {
	COMPLETE = "ok",
	PARENT_AGREED = "parentsAgreed",
	MISSING = "missing",
}

export { FilterOption, User, Registration };

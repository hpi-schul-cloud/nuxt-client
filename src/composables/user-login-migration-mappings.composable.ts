import { BusinessError } from "@/store/types/commons";

const ErrorTypeTranslationKeyMap = new Map<string, string>([
	["IDENTICAL_USER_LOGIN_MIGRATION_SYSTEM", "pages.administration.migration.identical_user_login_migration_system"],
	["MOIN_SCHULE_SYSTEM_NOT_FOUND", "pages.administration.migration.moin_schule_system_not_found"],
]);

export function useUserLoginMigrationMappings() {
	const getBusinessErrorTranslationKey = (businessError: BusinessError | undefined): undefined | string => {
		if (!businessError) {
			return undefined;
		}

		if (businessError.error && "type" in businessError.error) {
			const translationKey = ErrorTypeTranslationKeyMap.get(businessError.error.type);

			if (translationKey) {
				return translationKey;
			}
		}

		return businessError.message;
	};

	return {
		getBusinessErrorTranslationKey,
	};
}

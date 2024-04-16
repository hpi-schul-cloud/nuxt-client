import { BusinessError } from "@/store/types/commons";

const BusinessErrorMessageTranslationKeyMap = new Map<string, string>([
	[
		"identical_user_login_migration_system",
		"pages.administration.migration.identical_user_login_migration_system",
	],
]);

export function useUserLoginMigrationMapping() {
	const getBusinessErrorTranslationKey = (
		businessError: BusinessError | undefined
	): undefined | string => {
		if (!businessError) {
			return undefined;
		}

		const translationKey = Array.from(
			BusinessErrorMessageTranslationKeyMap.entries()
		).find(([key]) => businessError.message.startsWith(key))?.[1];

		if (translationKey) {
			return translationKey;
		}
		return businessError.message;
	};

	return {
		getBusinessErrorTranslationKey,
	};
}

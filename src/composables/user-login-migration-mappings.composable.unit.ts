import { useUserLoginMigrationMapping } from "./user-login-migration-mappings.composable";
import { BusinessError } from "@/store/types/commons";

describe("useUserLoginMigrationMapping", () => {
	const setup = () => {
		const { getBusinessErrorTranslationKey } = useUserLoginMigrationMapping();

		return {
			getBusinessErrorTranslationKey,
		};
	};

	describe("getBusinessErrorTranslationKey", () => {
		it("should return original message when key is undefined", () => {
			const { getBusinessErrorTranslationKey } = setup();

			const translationKey: string | undefined =
				getBusinessErrorTranslationKey(undefined);
			expect(translationKey).toBeUndefined();
		});

		it("should return translation key when message was found", () => {
			const { getBusinessErrorTranslationKey } = setup();
			const error: BusinessError = {
				statusCode: "400",
				message:
					"identical_user_login_migration_system: The target system and current schools login system are the same!",
			};

			const translationKey: string | undefined =
				getBusinessErrorTranslationKey(error);
			expect(translationKey).toEqual(
				"pages.administration.migration.identical_user_login_migration_system"
			);
		});

		it("should return original message when key was not found", () => {
			const { getBusinessErrorTranslationKey } = setup();
			const error: BusinessError = {
				statusCode: "400",
				message: "some_error: which is not defined in map",
			};

			const translationKey: string | undefined =
				getBusinessErrorTranslationKey(error);
			expect(translationKey).toEqual(error.message);
		});
	});
});

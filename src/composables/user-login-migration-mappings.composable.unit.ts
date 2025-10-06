import { useUserLoginMigrationMappings } from "./user-login-migration-mappings.composable";
import { BusinessError } from "@/store/types/commons";

describe("useUserLoginMigrationMapping", () => {
	describe("getBusinessErrorTranslationKey", () => {
		describe("when error type was found", () => {
			const setup = () => {
				const { getBusinessErrorTranslationKey } = useUserLoginMigrationMappings();

				const key = "pages.administration.migration.moin_schule_system_not_found";
				const apiError = {
					message: "Cannot find moin.schule system",
					code: 500,
					title: "moin.schule system not found",
					type: "MOIN_SCHULE_SYSTEM_NOT_FOUND",
				};
				const businessError: BusinessError = {
					statusCode: apiError.code,
					message: apiError.message,
					error: apiError,
				};

				return { getBusinessErrorTranslationKey, businessError, key };
			};

			it("should return translation key", () => {
				const { getBusinessErrorTranslationKey, businessError, key } = setup();

				const translationKey: string | undefined = getBusinessErrorTranslationKey(businessError);
				expect(translationKey).toEqual(key);
			});
		});

		describe("when translation key was not found", () => {
			const setup = () => {
				const { getBusinessErrorTranslationKey } = useUserLoginMigrationMappings();

				const apiError = {
					message: "message",
					code: 500,
					title: "title",
					type: "some_key",
				};
				const businessError: BusinessError = {
					statusCode: apiError.code,
					message: apiError.message,
					error: apiError,
				};

				return { getBusinessErrorTranslationKey, businessError };
			};

			it("should return original error message", () => {
				const { getBusinessErrorTranslationKey, businessError } = setup();

				const translationKey: string | undefined = getBusinessErrorTranslationKey(businessError);
				expect(translationKey).toEqual(businessError.message);
			});
		});

		describe("when businessError.error is undefined", () => {
			const setup = () => {
				const { getBusinessErrorTranslationKey } = useUserLoginMigrationMappings();

				const businessError: BusinessError = {
					statusCode: 500,
					message: "original message",
					error: undefined,
				};

				return { getBusinessErrorTranslationKey, businessError };
			};

			it("should return original error message", () => {
				const { getBusinessErrorTranslationKey, businessError } = setup();

				const translationKey: string | undefined = getBusinessErrorTranslationKey(businessError);

				expect(translationKey).toEqual(businessError.message);
			});
		});

		describe("when error.type doesn't exist", () => {
			const setup = () => {
				const { getBusinessErrorTranslationKey } = useUserLoginMigrationMappings();

				const apiError = {
					message: "message",
					code: 500,
					title: "title",
				};
				const businessError: BusinessError = {
					statusCode: apiError.code,
					message: apiError.message,
					error: apiError,
				};

				return { getBusinessErrorTranslationKey, businessError };
			};

			it("should return original error message", () => {
				const { getBusinessErrorTranslationKey, businessError } = setup();

				const translationKey: string | undefined = getBusinessErrorTranslationKey(businessError);
				expect(translationKey).toEqual(businessError.message);
			});
		});

		describe("when businessError is undefined", () => {
			const setup = () => {
				const { getBusinessErrorTranslationKey } = useUserLoginMigrationMappings();

				return {
					getBusinessErrorTranslationKey,
				};
			};

			it("should return undefined", () => {
				const { getBusinessErrorTranslationKey } = setup();

				const translationKey: string | undefined = getBusinessErrorTranslationKey(undefined);
				expect(translationKey).toBeUndefined();
			});
		});
	});
});

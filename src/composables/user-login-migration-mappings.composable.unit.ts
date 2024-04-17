import { useUserLoginMigrationMappings } from "./user-login-migration-mappings.composable";
import { BusinessError } from "@/store/types/commons";

describe("useUserLoginMigrationMapping", () => {
	const setup = () => {
		const { getBusinessErrorTranslationKey } = useUserLoginMigrationMappings();

		return {
			getBusinessErrorTranslationKey,
		};
	};

	describe("getBusinessErrorTranslationKey", () => {
		it("should return undefined when error is undefined", () => {
			const { getBusinessErrorTranslationKey } = setup();

			const translationKey: string | undefined =
				getBusinessErrorTranslationKey(undefined);
			expect(translationKey).toBeUndefined();
		});

		it("should return translation key when message was found", () => {
			const { getBusinessErrorTranslationKey } = setup();
			const apiError = {
				message: "Cannot find moin.schule system",
				code: 500,
				title: "moin.schule system not found",
				type: "MOIN_SCHULE_SYSTEM_NOT_FOUND",
			};
			const error: BusinessError = {
				statusCode: apiError.code,
				message: apiError.message,
				error: apiError,
			};

			const translationKey: string | undefined =
				getBusinessErrorTranslationKey(error);
			expect(translationKey).toEqual(
				"pages.administration.migration.moin_schule_system_not_found"
			);
		});

		it("should return original message when key was not found", () => {
			const { getBusinessErrorTranslationKey } = setup();
			const apiError = {
				message: "message",
				code: 500,
				title: "title",
				type: "some_key",
			};
			const error: BusinessError = {
				statusCode: apiError.code,
				message: apiError.message,
				error: apiError,
			};

			const translationKey: string | undefined =
				getBusinessErrorTranslationKey(error);
			expect(translationKey).toEqual(error.message);
		});

		it("should return original message when error.type doesn't exists", () => {
			const { getBusinessErrorTranslationKey } = setup();
			const apiError = {
				message: "message",
				code: 500,
				title: "title",
			};
			const error: BusinessError = {
				statusCode: apiError.code,
				message: apiError.message,
				error: apiError,
			};

			const translationKey: string | undefined =
				getBusinessErrorTranslationKey(error);
			expect(translationKey).toEqual(error.message);
		});

		it("should return original message when parameter error is undefined", () => {
			const { getBusinessErrorTranslationKey } = setup();
			const error: BusinessError = {
				statusCode: 500,
				message: "original message",
			};

			const translationKey: string | undefined =
				getBusinessErrorTranslationKey(error);
			expect(translationKey).toEqual(error.message);
		});
	});
});

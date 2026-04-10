import { useExternalToolMappings } from "./external-tool-mappings.composable";
import { BusinessError } from "@/store/types/commons";

describe("useExternalToolMappings", () => {
	describe("getBusinessErrorTranslationKey", () => {
		describe("when error type was found", () => {
			const setup = () => {
				const { getBusinessErrorTranslationKey } = useExternalToolMappings();

				const key = "pages.tool.apiError.tool_with_name_exists";
				const apiError = {
					message:
						"A tool with the same name is already assigned to this course. Tool names must be unique within a course.",
					code: 400,
					title: "Toolname already exists",
					type: "CONTEXT_EXTERNAL_TOOL_NAME_ALREADY_EXISTS",
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
				const { getBusinessErrorTranslationKey } = useExternalToolMappings();

				const apiError = {
					message: "message",
					code: 400,
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
				const { getBusinessErrorTranslationKey } = useExternalToolMappings();

				const businessError: BusinessError = {
					statusCode: 400,
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
				const { getBusinessErrorTranslationKey } = useExternalToolMappings();

				const apiError = {
					message: "message",
					code: 400,
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
				const { getBusinessErrorTranslationKey } = useExternalToolMappings();

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

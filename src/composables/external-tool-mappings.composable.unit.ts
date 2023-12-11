import {
	SchoolExternalToolResponse,
	SchoolExternalToolSearchListResponse,
} from "@/serverApi/v3";
import { useExternalToolMappings } from "./external-tool-mappings.composable";
import { BusinessError } from "@/store/types/commons";
import { schoolToolConfigurationStatusFactory } from "@@/tests/test-utils/factory";

describe("useExternalToolUtils", () => {
	const setup = () => {
		const { getBusinessErrorTranslationKey } = useExternalToolMappings();

		const toolResponse: SchoolExternalToolResponse = {
			id: "id",
			name: "toolName",
			toolId: "toolId",
			toolVersion: 1,
			schoolId: "schoolId",
			parameters: [
				{
					name: "name",
					value: "value",
				},
			],
			status: schoolToolConfigurationStatusFactory.build(),
		};

		const listResponse: SchoolExternalToolSearchListResponse = {
			data: [toolResponse],
		};

		return {
			listResponse,
			toolResponse,
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
				message: "tool_param_duplicate: Some validationError was thrown",
			};

			const translationKey: string | undefined =
				getBusinessErrorTranslationKey(error);
			expect(translationKey).toEqual(
				"pages.tool.apiError.tool_param_duplicate"
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

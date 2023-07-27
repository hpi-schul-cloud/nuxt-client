import {
	SchoolExternalToolResponse,
	SchoolExternalToolResponseStatusEnum,
	SchoolExternalToolSearchListResponse,
	ToolReferenceListResponse,
	ToolReferenceResponse,
	ToolReferenceResponseStatusEnum,
} from "@/serverApi/v3";
import { useExternalToolMappings } from "./external-tool-mappings.composable";
import {
	ExternalToolDisplayData,
	SchoolExternalTool,
	ToolConfigurationStatus,
} from "@/store/external-tool";
import { BusinessError } from "@/store/types/commons";

describe("useExternalToolUtils", () => {
	const setup = () => {
		const {
			mapSchoolExternalToolSearchListResponse,
			getBusinessErrorTranslationKey,
		} = useExternalToolMappings();

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
			status: SchoolExternalToolResponseStatusEnum.Latest,
		};

		const listResponse: SchoolExternalToolSearchListResponse = {
			data: [toolResponse],
		};

		return {
			listResponse,
			toolResponse,
			mapSchoolExternalToolSearchListResponse,
			getBusinessErrorTranslationKey,
		};
	};

	describe("mapSchoolExternalToolSearchListResponse is called", () => {
		describe("when maps the response", () => {
			it("should return a schoolExternalTool array", () => {
				const { mapSchoolExternalToolSearchListResponse, listResponse } =
					setup();

				const schoolExternalTools: SchoolExternalTool[] =
					mapSchoolExternalToolSearchListResponse(listResponse);

				expect(Array.isArray(schoolExternalTools)).toBeTruthy();
			});

			it("should map the response correctly", () => {
				const {
					mapSchoolExternalToolSearchListResponse,
					listResponse,
					toolResponse,
				} = setup();

				const schoolExternalTools: SchoolExternalTool[] =
					mapSchoolExternalToolSearchListResponse(listResponse);

				expect(schoolExternalTools).toEqual(
					expect.objectContaining<SchoolExternalTool[]>([
						{
							id: toolResponse.id,
							schoolId: toolResponse.schoolId,
							toolId: toolResponse.toolId,
							name: toolResponse.name,
							parameters: toolResponse.parameters,
							version: toolResponse.toolVersion,
							status: ToolConfigurationStatus.Latest,
						},
					])
				);
			});
		});
	});

	describe("mapToolReferencesToExternalToolDisplayData is called", () => {
		describe("when maps the response", () => {
			const setup = () => {
				const { mapToolReferencesToExternalToolDisplayData } =
					useExternalToolMappings();

				const toolReferenceResponse: ToolReferenceResponse = {
					contextToolId: "id",
					logoUrl: "logoUrl",
					displayName: "displayName",
					openInNewTab: true,
					status: ToolReferenceResponseStatusEnum.Latest,
				};

				const toolReferenceListResponse: ToolReferenceListResponse = {
					data: [toolReferenceResponse],
				};

				return {
					mapToolReferencesToExternalToolDisplayData,
					toolReferenceListResponse,
					toolReferenceResponse,
				};
			};

			it("should return a contextExternalTool array", () => {
				const {
					mapToolReferencesToExternalToolDisplayData,
					toolReferenceListResponse,
				} = setup();

				const contextExternalTools: ExternalToolDisplayData[] =
					mapToolReferencesToExternalToolDisplayData(toolReferenceListResponse);

				expect(Array.isArray(contextExternalTools)).toBeTruthy();
			});

			it("should map the response correctly", () => {
				const {
					mapToolReferencesToExternalToolDisplayData,
					toolReferenceListResponse,
					toolReferenceResponse,
				} = setup();

				const contextExternalTools: ExternalToolDisplayData[] =
					mapToolReferencesToExternalToolDisplayData(toolReferenceListResponse);

				expect(contextExternalTools).toEqual(
					expect.objectContaining<ExternalToolDisplayData[]>([
						{
							id: toolReferenceResponse.contextToolId,
							name: toolReferenceResponse.displayName,
							logoUrl: toolReferenceResponse.logoUrl,
							openInNewTab: toolReferenceResponse.openInNewTab,
							status: ToolConfigurationStatus.Latest,
						},
					])
				);
			});
		});
	});

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

	describe("getStatusTranslationKey", () => {
		describe("when status is Latest", () => {
			const setup = () => {
				const { getStatusTranslationKey } = useExternalToolMappings();

				const status = ToolConfigurationStatus.Latest;

				return {
					getStatusTranslationKey,
					status,
				};
			};

			it("should return latest translation key", () => {
				const { getStatusTranslationKey, status } = setup();

				const translationKey: string = getStatusTranslationKey(status);

				expect(translationKey).toEqual(
					"components.externalTools.status.latest"
				);
			});
		});

		describe("when status is Outdated", () => {
			const setup = () => {
				const { getStatusTranslationKey } = useExternalToolMappings();

				const status = ToolConfigurationStatus.Outdated;

				return {
					getStatusTranslationKey,
					status,
				};
			};

			it("should return outdated translation key", () => {
				const { getStatusTranslationKey, status } = setup();

				const translationKey: string = getStatusTranslationKey(status);

				expect(translationKey).toEqual(
					"components.externalTools.status.outdated"
				);
			});
		});

		describe("when status is Unknown", () => {
			const setup = () => {
				const { getStatusTranslationKey } = useExternalToolMappings();

				const status = ToolConfigurationStatus.Unknown;

				return {
					getStatusTranslationKey,
					status,
				};
			};

			it("should return latest translation key", () => {
				const { getStatusTranslationKey, status } = setup();

				const translationKey: string = getStatusTranslationKey(status);

				expect(translationKey).toEqual(
					"components.externalTools.status.unknown"
				);
			});
		});
	});
});

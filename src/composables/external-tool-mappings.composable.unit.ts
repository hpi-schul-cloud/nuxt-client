import {
	ContextExternalToolPostParams,
	CustomParameterEntryParam,
	CustomParameterResponse,
	CustomParameterResponseLocationEnum,
	CustomParameterResponseScopeEnum,
	CustomParameterResponseTypeEnum,
	ExternalToolConfigurationTemplateResponse,
	SchoolExternalToolPostParams,
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
	ToolConfigurationTemplate,
	ToolContextType,
	ToolParameter,
	ToolParameterLocation,
	ToolParameterScope,
	ToolParameterType,
} from "@/store/external-tool";
import { SchoolExternalToolItem } from "@/components/administration/school-external-tool-item";
import { BusinessError } from "@/store/types/commons";
import {
	toolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils/factory";

jest.mock("@/store/store-accessor", () => ({
	externalToolsModule: {
		getSchoolExternalTools: [
			{
				id: "id",
				name: "toolName",
				version: 1,
				status: "Latest",
			},
		],
	},
}));

describe("useExternalToolUtils", () => {
	const setup = () => {
		const {
			mapSchoolExternalToolResponse,
			mapSchoolExternalToolSearchListResponse,
			getBusinessErrorTranslationKey,
			mapExternalToolConfigurationTemplateResponse,
			mapToolConfigurationTemplateToSchoolExternalToolPostParams,
			mapToolConfigurationTemplateToContextExternalToolPostParams,
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

		const schoolExternalToolItem: SchoolExternalToolItem = {
			name: toolResponse.name,
			id: toolResponse.id,
			status: ToolConfigurationStatus.Latest,
			outdated: false,
		};

		const customParameterResponse: CustomParameterResponse = {
			name: "name",
			displayName: "displayName",
			description: "description",
			defaultValue: "defaultValue",
			type: CustomParameterResponseTypeEnum.String,
			location: CustomParameterResponseLocationEnum.Path,
			scope: CustomParameterResponseScopeEnum.School,
			regex: "[x]",
			regexComment: "regexComment",
			isOptional: true,
		};

		const toolConfigurationTemplateResponse: ExternalToolConfigurationTemplateResponse =
			{
				id: "id",
				name: "name",
				logoUrl: "logoUrl",
				parameters: [customParameterResponse],
				version: 0,
			};

		const customParameterEntryParam: CustomParameterEntryParam = {
			name: "name",
			value: "value",
		};

		const schoolExternalToolPostParam: SchoolExternalToolPostParams = {
			schoolId: "schoolId",
			toolId: "toolId",
			version: 0,
			parameters: [customParameterEntryParam],
		};

		const contextExternalToolPostParams: ContextExternalToolPostParams = {
			contextId: "contextId",
			parameters: [customParameterEntryParam],
			displayName: "displayName",
			contextType: "course",
			schoolToolId: "toolId",
			toolVersion: 0,
		};

		return {
			listResponse,
			toolResponse,
			schoolExternalToolItem,
			mapSchoolExternalToolSearchListResponse,
			mapSchoolExternalToolResponse,
			getBusinessErrorTranslationKey,
			mapExternalToolConfigurationTemplateResponse,
			toolConfigurationTemplateResponse,
			customParameterResponse,
			mapToolConfigurationTemplateToSchoolExternalToolPostParams,
			mapToolConfigurationTemplateToContextExternalToolPostParams,
			schoolExternalToolPostParam,
			contextExternalToolPostParams,
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

	describe("mapExternalToolConfigurationTemplateResponse", () => {
		it("should return a external tool configuration template", () => {
			const {
				mapExternalToolConfigurationTemplateResponse,
				toolConfigurationTemplateResponse,
				customParameterResponse,
			} = setup();

			const configurationTemplate: ToolConfigurationTemplate =
				mapExternalToolConfigurationTemplateResponse(
					toolConfigurationTemplateResponse
				);

			expect(configurationTemplate).toEqual(
				expect.objectContaining<ToolConfigurationTemplate>({
					id: toolConfigurationTemplateResponse.id,
					name: toolConfigurationTemplateResponse.name,
					logoUrl: toolConfigurationTemplateResponse.logoUrl,
					parameters: expect.arrayContaining<ToolParameter>([
						{
							name: customParameterResponse.name,
							displayName: customParameterResponse.displayName,
							description: customParameterResponse.description,
							value: customParameterResponse.defaultValue,
							type: ToolParameterType.String,
							location: ToolParameterLocation.PATH,
							scope: ToolParameterScope.School,
							default: customParameterResponse.defaultValue,
							isOptional: customParameterResponse.isOptional,
							regexComment: customParameterResponse.regexComment,
							regex: customParameterResponse.regex,
						},
					]),
					version: toolConfigurationTemplateResponse.version,
				})
			);
		});
	});

	describe("mapToolConfigurationTemplateToSchoolExternalToolPostParams", () => {
		it("should return schoolExternalToolPostParams", () => {
			const { mapToolConfigurationTemplateToSchoolExternalToolPostParams } =
				setup();
			const toolParameter = toolParameterFactory.build({ value: undefined });
			const template: ToolConfigurationTemplate =
				toolConfigurationTemplateFactory.build({
					parameters: [toolParameter, { ...toolParameter, value: "testValue" }],
				});

			const schoolExternalToolPostParams: SchoolExternalToolPostParams =
				mapToolConfigurationTemplateToSchoolExternalToolPostParams(
					template,
					"schoolId"
				);

			expect(schoolExternalToolPostParams).toEqual(
				expect.objectContaining<SchoolExternalToolPostParams>({
					toolId: template.id,
					version: template.version,
					schoolId: "schoolId",
					parameters: expect.arrayContaining<CustomParameterEntryParam>([
						{
							name: template.parameters[0].name,
						},
						{
							name: template.parameters[1].name,
							value: "testValue",
						},
					]),
				})
			);
		});
	});

	describe("mapToolConfigurationTemplateToContextExternalToolPostParams", () => {
		it("should return contextExternalToolPostParams", () => {
			const { mapToolConfigurationTemplateToContextExternalToolPostParams } =
				setup();
			const template: ToolConfigurationTemplate =
				toolConfigurationTemplateFactory.build();

			const contextExternalToolPostParams: ContextExternalToolPostParams =
				mapToolConfigurationTemplateToContextExternalToolPostParams(
					template,
					"schoolToolId",
					"contextId",
					ToolContextType.COURSE
				);

			expect(contextExternalToolPostParams).toEqual(
				expect.objectContaining<ContextExternalToolPostParams>({
					contextId: "contextId",
					toolVersion: template.version,
					schoolToolId: "schoolToolId",
					parameters: [],
					contextType: "course",
				})
			);
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

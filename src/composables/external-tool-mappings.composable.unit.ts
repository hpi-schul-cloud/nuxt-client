import {
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
} from "@/serverApi/v3";
import { useExternalToolMappings } from "./external-tool-mappings.composable";
import {
	SchoolExternalTool,
	SchoolExternalToolStatus,
	ToolConfigurationTemplate,
	ToolParameter,
	ToolParameterLocation,
	ToolParameterScope,
	ToolParameterType,
} from "@/store/external-tool";
import { SchoolExternalToolItem } from "@/components/administration/school-external-tool-item";
import { BusinessError } from "@/store/types/commons";
import {
	toolParameterFactory,
	toolConfigurationTemplateFactory,
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
			getTranslationKey,
			mapExternalToolConfigurationTemplateResponse,
			mapToolConfigurationTemplateToSchoolExternalToolPostParams,
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

		const schoolExternaToolItem: SchoolExternalToolItem = {
			name: toolResponse.name,
			id: toolResponse.id,
			status: SchoolExternalToolStatus.Latest,
			outdated: false,
		};

		const customParameterResponse: CustomParameterResponse = {
			name: "name",
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

		return {
			listResponse,
			toolResponse,
			schoolExternaToolItem,
			mapSchoolExternalToolSearchListResponse,
			mapSchoolExternalToolResponse,
			getTranslationKey,
			mapExternalToolConfigurationTemplateResponse,
			toolConfigurationTemplateResponse,
			customParameterResponse,
			mapToolConfigurationTemplateToSchoolExternalToolPostParams,
			schoolExternalToolPostParam,
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
							status: SchoolExternalToolStatus.Latest,
						},
					])
				);
			});
		});
	});

	describe("getTranslationKey", () => {
		it("should return translation key when message was found", () => {
			const { getTranslationKey } = setup();
			const error: BusinessError = {
				statusCode: "400",
				message: "tool_param_duplicate: Some validationError was thrown",
			};

			const translationKey = getTranslationKey(error);
			expect(translationKey).toEqual(
				"pages.tool.apiError.tool_param_duplicate"
			);
		});

		it("should return original message when key was not found", () => {
			const { getTranslationKey } = setup();
			const error: BusinessError = {
				statusCode: "400",
				message: "some_error: which is not defined in map",
			};

			const translationKey = getTranslationKey(error);
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
							value: customParameterResponse.defaultValue,
							type: ToolParameterType.String,
							location: ToolParameterLocation.Path,
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
			const toolParameter = toolParameterFactory({ value: undefined });
			const template: ToolConfigurationTemplate =
				toolConfigurationTemplateFactory({
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
});

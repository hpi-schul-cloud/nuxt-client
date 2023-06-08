import {
	ContextExternalToolPostParams,
	ContextExternalToolResponse,
	ContextExternalToolResponseContextTypeEnum,
	ContextExternalToolSearchListResponse,
	CustomParameterEntryParam,
	CustomParameterResponse,
	CustomParameterResponseLocationEnum,
	CustomParameterResponseScopeEnum,
	CustomParameterResponseTypeEnum,
	ExternalToolConfigurationTemplateResponse,
	SchoolExternalToolPostParams,
	SchoolExternalToolResponse,
	SchoolExternalToolResponseStatusEnum,
	SchoolExternalToolSearchListResponse
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
	schoolToolConfigurationTemplateFactory,
	toolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils/factory";
import { ToolContextType } from "../store/external-tool/tool-context-type.enum";
import { SchoolToolConfigurationTemplate } from "@/store/external-tool/school-tool-configuration-template";
import { ContextExternalTool } from "../store/external-tool/context-external-tool";

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
			mapContextExternalToolResponse,
			mapContextExternalToolSearchListResponse,
			getTranslationKey,
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

		const contextToolResponse: ContextExternalToolResponse = {
			id: "id",
			contextToolName: "contextToolName",
			contextId: "contextId",
			schoolToolId: "schoolToolId",
			toolVersion: 1,
			parameters: [
				{
					name: "name",
					value: "value",
				},
			],
			contextType: ContextExternalToolResponseContextTypeEnum.Course,
			logoUrl: "logoUrl",
		};

		const contextListResponse: ContextExternalToolSearchListResponse = {
			data: [contextToolResponse],
		};

		const schoolExternaToolItem: SchoolExternalToolItem = {
			name: toolResponse.name,
			id: toolResponse.id,
			status: SchoolExternalToolStatus.Latest,
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
			contextToolName: "contextToolName",
			contextType: "course",
			schoolToolId: "toolId",
			toolVersion: 0,
		};

		return {
			listResponse,
			contextListResponse,
			toolResponse,
			schoolExternaToolItem,
			mapSchoolExternalToolSearchListResponse,
			mapSchoolExternalToolResponse,
			mapContextExternalToolResponse,
			mapContextExternalToolSearchListResponse,
			getTranslationKey,
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
							status: SchoolExternalToolStatus.Latest,
						},
					])
				);
			});
		});
	});

	describe("mapContextExternalToolSearchListResponse is called", () => {
		describe("when maps the response", () => {
			it("should return a contextExternalTool array", () => {
				const {
					mapContextExternalToolSearchListResponse,
					contextListResponse,
					setup();

				const contextExternalTools: ContextExternalTool[] =
					mapContextExternalToolSearchListResponse(contextListResponse);

				expect(Array.isArray(contextExternalTools)).toBeTruthy();
			});

			it("should map the response correctly", () => {
				const {
					mapContextExternalToolSearchListResponse,
					contextListResponse,
					contextToolResponse,
				} = setup();

				const contextExternalTools: ContextExternalTool[] =
					mapContextExternalToolSearchListResponse(contextListResponse);

				expect(contextExternalTools).toEqual(
					expect.objectContaining<ContextExternalTool[]>([
						{
							id: contextToolResponse.id,
							name: contextToolResponse.name,
							logoUrl: contextToolResponse.logoUrl,
							openInNewTab: contextToolResponse.openInNewTab,
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
			const template: SchoolToolConfigurationTemplate =
				schoolToolConfigurationTemplateFactory.build();

			const contextExternalToolPostParams: ContextExternalToolPostParams =
				mapToolConfigurationTemplateToContextExternalToolPostParams(
					template,
					"contextId",
					ToolContextType.COURSE
				);

			expect(contextExternalToolPostParams).toEqual(
				expect.objectContaining<ContextExternalToolPostParams>({
					contextId: "contextId",
					toolVersion: template.version,
					schoolToolId: template.id,
					parameters: [],
					contextType: "course",
					contextToolName: template.name,
				})
			);
		});
	});
});

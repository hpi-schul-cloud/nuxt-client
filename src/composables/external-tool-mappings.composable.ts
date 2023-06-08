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
	SchoolToolConfigurationListResponse,
	ToolConfigurationEntryResponse,
	SchoolToolConfigurationEntryResponse,
	ToolConfigurationListResponse,
	ContextExternalToolSearchListResponse,
	ContextExternalToolResponse,
} from "@/serverApi/v3";
import {
	SchoolExternalTool,
	SchoolExternalToolStatus,
	ToolConfigurationListItem,
	ToolConfigurationTemplate,
	ToolParameter,
	ToolParameterLocation,
	ToolParameterScope,
	ToolParameterType,
} from "@/store/external-tool";
import { ToolContextType } from "@/store/external-tool/tool-context-type.enum";
import { BusinessError } from "@/store/types/commons";
import { SchoolToolConfigurationListItem } from "../store/external-tool/school-tool-configuration-list-item";
import { SchoolToolConfigurationTemplate } from "../store/external-tool/school-tool-configuration-template";
import { ContextExternalTool } from "../store/external-tool/context-external-tool";

const ResponseStatusMapping: Record<
	SchoolExternalToolResponseStatusEnum,
	SchoolExternalToolStatus
> = {
	[SchoolExternalToolResponseStatusEnum.Latest]:
		SchoolExternalToolStatus.Latest,
	[SchoolExternalToolResponseStatusEnum.Outdated]:
		SchoolExternalToolStatus.Outdated,
	[SchoolExternalToolResponseStatusEnum.Unknown]:
		SchoolExternalToolStatus.Unknown,
};

const ToolParamLocationMapping: Record<
	CustomParameterResponseLocationEnum,
	ToolParameterLocation
> = {
	[CustomParameterResponseLocationEnum.Path]: ToolParameterLocation.PATH,
	[CustomParameterResponseLocationEnum.Query]: ToolParameterLocation.QUERY,
	[CustomParameterResponseLocationEnum.Body]: ToolParameterLocation.BODY,
};

const ToolParamTypeMapping: Record<
	CustomParameterResponseTypeEnum,
	ToolParameterType
> = {
	[CustomParameterResponseTypeEnum.String]: ToolParameterType.String,
	[CustomParameterResponseTypeEnum.Boolean]: ToolParameterType.Boolean,
	[CustomParameterResponseTypeEnum.Number]: ToolParameterType.Number,
	[CustomParameterResponseTypeEnum.AutoCourseid]:
		ToolParameterType.AutoCourseid,
	[CustomParameterResponseTypeEnum.AutoCoursename]:
		ToolParameterType.AutoCoursename,
	[CustomParameterResponseTypeEnum.AutoSchoolid]:
		ToolParameterType.AutoSchoolid,
};

const ToolParamScopeMapping: Record<
	CustomParameterResponseScopeEnum,
	ToolParameterScope
> = {
	[CustomParameterResponseScopeEnum.Context]: ToolParameterScope.Context,
	[CustomParameterResponseScopeEnum.Global]: ToolParameterScope.Global,
	[CustomParameterResponseScopeEnum.School]: ToolParameterScope.School,
};

const BusinessErrorMessageTranslationKeyMap = new Map<string, string>([
	["tool_param_duplicate", "pages.tool.apiError.tool_param_duplicate"],
	["tool_version_mismatch", "pages.tool.apiError.tool_version_mismatch"],
	["tool_param_required", "pages.tool.apiError.tool_param_required"],
	["tool_param_type_mismatch", "pages.tool.apiError.tool_param_type_mismatch"],
	["tool_param_value_regex", "pages.tool.apiError.tool_param_value_regex"],
]);

export function useExternalToolMappings() {
	const mapContextExternalToolSearchListResponse = (
		response: ContextExternalToolSearchListResponse
	): ContextExternalTool[] => {
		return response.data.map((toolResponse: ContextExternalToolResponse) =>
			mapContextExternalToolResponse(toolResponse)
		);
	};

	const mapContextExternalToolResponse = (
		toolResponse: ContextExternalToolResponse
	): ContextExternalTool => {
		return {
			id: toolResponse.id,
			name: toolResponse.contextToolName!,
			logoUrl: "",
			openInNewTab: true,
		};
	};

	const mapSchoolExternalToolSearchListResponse = (
		response: SchoolExternalToolSearchListResponse
	): SchoolExternalTool[] => {
		return response.data.map((toolResponse: SchoolExternalToolResponse) =>
			mapSchoolExternalToolResponse(toolResponse)
		);
	};

	const mapSchoolExternalToolResponse = (
		toolResponse: SchoolExternalToolResponse
	): SchoolExternalTool => {
		return {
			id: toolResponse.id,
			toolId: toolResponse.toolId,
			name: toolResponse.name,
			parameters: toolResponse.parameters,
			version: toolResponse.toolVersion,
			status: ResponseStatusMapping[toolResponse.status],
		};
	};

	const mapCustomParameterResponse = (
		parameters: CustomParameterResponse[]
	): ToolParameter[] => {
		return parameters.map((resp: CustomParameterResponse) => {
			return {
				name: resp.name,
				displayName: resp.displayName,
				description: resp.description,
				default: resp.defaultValue,
				isOptional: resp.isOptional,
				regexComment: resp.regexComment,
				location: ToolParamLocationMapping[resp.location],
				regex: resp.regex,
				type: ToolParamTypeMapping[resp.type],
				scope: ToolParamScopeMapping[resp.scope],
				value: resp.defaultValue,
			};
		});
	};

	const mapExternalToolConfigurationTemplateResponse = (
		resp: ExternalToolConfigurationTemplateResponse
	): ToolConfigurationTemplate => {
		return {
			id: resp.id,
			name: resp.name,
			logoUrl: resp.logoUrl,
			version: resp.version,
			parameters: mapCustomParameterResponse(resp.parameters),
		};
	};

	const mapSchoolExternalToolConfigurationTemplateResponse = (
		resp: SchoolExternalToolResponse
	): ToolConfigurationTemplate => {
		return {
			id: resp.id,
			name: resp.name,
			version: resp.toolVersion,
			parameters: [],
		};
	};

	const mapToolConfigurationEntryResponse = (
		resp: ToolConfigurationEntryResponse
	): ToolConfigurationListItem => {
		return {
			id: resp.id,
			name: resp.name,
			logoUrl: resp.logoUrl,
		};
	};

	const mapSchoolToolConfigurationEntryResponse = (
		resp: SchoolToolConfigurationEntryResponse
	): SchoolToolConfigurationListItem => {
		return {
			id: resp.id,
			name: resp.name,
			logoUrl: resp.logoUrl,
			schoolToolId: resp.schoolToolId,
		};
	};

	const mapToolConfigurationListResponse = (
		resp: ToolConfigurationListResponse
	): ToolConfigurationListItem[] => {
		return resp.data.map(
			(
				entryResp: ToolConfigurationEntryResponse
			): ToolConfigurationListItem => {
				return mapToolConfigurationEntryResponse(entryResp);
			}
		);
	};

	const mapSchoolToolConfigurationListResponse = (
		resp: SchoolToolConfigurationListResponse
	): SchoolToolConfigurationListItem[] => {
		return resp.data.map(
			(
				entryResp: SchoolToolConfigurationEntryResponse
			): SchoolToolConfigurationListItem => {
				return mapSchoolToolConfigurationEntryResponse(entryResp);
			}
		);
	};

	const mapToolConfigurationTemplateToSchoolExternalToolPostParams = (
		template: ToolConfigurationTemplate,
		schoolId: string
	): SchoolExternalToolPostParams => {
		return {
			toolId: template.id,
			version: template.version,
			schoolId,
			parameters: mapToolParametersToCustomParameterEntryParams(
				template.parameters
			),
		};
	};

	const mapToolConfigurationTemplateToContextExternalToolPostParams = (
		template: SchoolToolConfigurationTemplate,
		contextId: string,
		contextType: ToolContextType
	): ContextExternalToolPostParams => {
		return {
			schoolToolId: template.schoolToolId,
			contextId,
			contextType,
			contextToolName: template.name,
			toolVersion: template.version,
			parameters: mapToolParametersToCustomParameterEntryParams(
				template.parameters
			),
		};
	};

	const mapToolConfigurationTemplateToSchoolToolConfigurationTemplate = (
		template: ToolConfigurationTemplate,
		schoolToolId: string
	): SchoolToolConfigurationTemplate => {
		return {
			schoolToolId: schoolToolId,
			...template,
		};
	};
	const mapToolParametersToCustomParameterEntryParams = (
		params: ToolParameter[]
	) => {
		return params.map((param: ToolParameter): CustomParameterEntryParam => {
			return {
				name: param.name,
				value: param.value,
			};
		});
	};

	const getTranslationKey = (businessError: BusinessError) => {
		const translationKey = Array.from(
			BusinessErrorMessageTranslationKeyMap.entries()
		).find(([key]) => businessError.message.startsWith(key))?.[1];

		if (translationKey) {
			return translationKey;
		}
		return businessError.message;
	};

	return {
		mapContextExternalToolSearchListResponse,
		mapContextExternalToolResponse,
		mapSchoolExternalToolSearchListResponse,
		mapSchoolExternalToolResponse,
		mapExternalToolConfigurationTemplateResponse,
		mapSchoolExternalToolConfigurationTemplateResponse,
		mapToolConfigurationListResponse,
		mapSchoolToolConfigurationListResponse,
		mapToolConfigurationTemplateToSchoolExternalToolPostParams,
		mapToolConfigurationTemplateToContextExternalToolPostParams,
		mapToolConfigurationTemplateToSchoolToolConfigurationTemplate,
		getTranslationKey,
	};
}

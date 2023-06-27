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
	SchoolExternalToolSearchListResponse,
	SchoolToolConfigurationEntryResponse,
	SchoolToolConfigurationListResponse,
	ToolConfigurationEntryResponse,
	ToolConfigurationListResponse,
	ToolReferenceListResponse,
	ToolReferenceResponse,
	ToolReferenceResponseStatusEnum,
} from "@/serverApi/v3";
import {
	ContextExternalToolTemplateListItem,
	ExternalToolDisplayData,
	SchoolExternalTool,
	ToolConfigurationListItem,
	ToolConfigurationStatus,
	ToolConfigurationTemplate,
	ToolParameter,
	ToolParameterLocation,
	ToolParameterScope,
	ToolParameterType,
} from "@/store/external-tool";
import { ToolContextType } from "@/store/external-tool/tool-context-type.enum";
import { BusinessError } from "@/store/types/commons";

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
	[CustomParameterResponseScopeEnum.Context]: ToolParameterScope.Context,
};

const BusinessErrorMessageTranslationKeyMap = new Map<string, string>([
	["tool_param_duplicate", "pages.tool.apiError.tool_param_duplicate"],
	["tool_version_mismatch", "pages.tool.apiError.tool_version_mismatch"],
	["tool_param_required", "pages.tool.apiError.tool_param_required"],
	["tool_param_type_mismatch", "pages.tool.apiError.tool_param_type_mismatch"],
	["tool_param_value_regex", "pages.tool.apiError.tool_param_value_regex"],
]);

const ToolConfigurationStatusMapping: Record<
	ToolReferenceResponseStatusEnum,
	ToolConfigurationStatus
> = {
	[ToolReferenceResponseStatusEnum.Latest]: ToolConfigurationStatus.Latest,
	[ToolReferenceResponseStatusEnum.Outdated]: ToolConfigurationStatus.Outdated,
	[ToolReferenceResponseStatusEnum.Unknown]: ToolConfigurationStatus.Unknown,
};

export const ToolConfigurationStatusTranslationMapping: Record<
	ToolConfigurationStatus,
	string
> = {
	[ToolConfigurationStatus.Latest]: "components.externalTools.status.latest",
	[ToolConfigurationStatus.Outdated]:
		"components.externalTools.status.outdated",
	[ToolConfigurationStatus.Unknown]: "components.externalTools.status.unknown",
};

export function useExternalToolMappings() {
	const mapToolReferencesToExternalToolDisplayData = (
		response: ToolReferenceListResponse
	): ExternalToolDisplayData[] => {
		return response.data.map(
			(toolReference: ToolReferenceResponse): ExternalToolDisplayData => ({
				id: toolReference.contextToolId,
				logoUrl: toolReference.logoUrl,
				name: toolReference.displayName,
				openInNewTab: toolReference.openInNewTab,
				status: ToolConfigurationStatusMapping[toolReference.status],
			})
		);
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
			status: ToolConfigurationStatusMapping[toolResponse.status],
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
	): ContextExternalToolTemplateListItem => {
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
	): ContextExternalToolTemplateListItem[] => {
		return resp.data.map(
			(
				entryResp: SchoolToolConfigurationEntryResponse
			): ContextExternalToolTemplateListItem => {
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
		template: ToolConfigurationTemplate,
		schoolToolId: string,
		contextId: string,
		contextType: ToolContextType
	): ContextExternalToolPostParams => {
		return {
			schoolToolId: schoolToolId,
			contextId,
			contextType,
			toolVersion: template.version,
			parameters: mapToolParametersToCustomParameterEntryParams(
				template.parameters
			),
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

	const getBusinessErrorTranslationKey = (
		businessError: BusinessError | undefined
	): undefined | string => {
		if (!businessError) {
			return undefined;
		}

		const translationKey = Array.from(
			BusinessErrorMessageTranslationKeyMap.entries()
		).find(([key]) => businessError.message.startsWith(key))?.[1];

		if (translationKey) {
			return translationKey;
		}
		return businessError.message;
	};

	const getStatusTranslationKey = (
		toolStatus: ToolConfigurationStatus
	): string => {
		const translationKey: string | undefined =
			ToolConfigurationStatusTranslationMapping[toolStatus];

		if (!translationKey) {
			return ToolConfigurationStatusTranslationMapping[
				ToolConfigurationStatus.Unknown
			];
		}

		return translationKey;
	};

	return {
		mapToolReferencesToExternalToolDisplayData,
		mapSchoolExternalToolSearchListResponse,
		mapSchoolExternalToolResponse,
		mapExternalToolConfigurationTemplateResponse,
		mapToolConfigurationListResponse,
		mapSchoolToolConfigurationListResponse,
		mapToolConfigurationTemplateToSchoolExternalToolPostParams,
		mapToolConfigurationTemplateToContextExternalToolPostParams,
		getBusinessErrorTranslationKey,
		getStatusTranslationKey,
	};
}

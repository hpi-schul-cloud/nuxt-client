import {
	CustomParameterResponseLocationEnum,
	CustomParameterResponseScopeEnum,
	CustomParameterResponseTypeEnum,
	SchoolExternalToolResponse,
	SchoolExternalToolSearchListResponse,
	ToolReferenceListResponse,
	ToolReferenceResponse,
	ToolReferenceResponseStatusEnum,
} from "@/serverApi/v3";
import {
	ExternalToolDisplayData,
	SchoolExternalTool,
	ToolConfigurationStatus,
	ToolParameterLocation,
	ToolParameterScope,
	ToolParameterType,
} from "@/store/external-tool";
import { BusinessError } from "@/store/types/commons";
import { SchoolExternalToolMapper } from "@/store/external-tool/mapper";

export const ToolParamLocationMapping: Record<
	CustomParameterResponseLocationEnum,
	ToolParameterLocation
> = {
	[CustomParameterResponseLocationEnum.Path]: ToolParameterLocation.PATH,
	[CustomParameterResponseLocationEnum.Query]: ToolParameterLocation.QUERY,
	[CustomParameterResponseLocationEnum.Body]: ToolParameterLocation.BODY,
};

export const ToolParamTypeMapping: Record<
	CustomParameterResponseTypeEnum,
	ToolParameterType
> = {
	[CustomParameterResponseTypeEnum.String]: ToolParameterType.String,
	[CustomParameterResponseTypeEnum.Boolean]: ToolParameterType.Boolean,
	[CustomParameterResponseTypeEnum.Number]: ToolParameterType.Number,
	[CustomParameterResponseTypeEnum.AutoContextid]:
		ToolParameterType.AutoContextid,
	[CustomParameterResponseTypeEnum.AutoContextname]:
		ToolParameterType.AutoContextname,
	[CustomParameterResponseTypeEnum.AutoSchoolid]:
		ToolParameterType.AutoSchoolid,
	[CustomParameterResponseTypeEnum.AutoSchoolnumber]:
		ToolParameterType.AutoSchoolnumber,
};

export const ToolParamScopeMapping: Record<
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

export const ToolConfigurationStatusMapping: Record<
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
		getBusinessErrorTranslationKey,
		getStatusTranslationKey,
	};
}

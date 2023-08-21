import { ToolConfigurationStatus } from "@/store/external-tool";
import { BusinessError } from "@/store/types/commons";

const BusinessErrorMessageTranslationKeyMap = new Map<string, string>([
	["tool_param_duplicate", "pages.tool.apiError.tool_param_duplicate"],
	["tool_version_mismatch", "pages.tool.apiError.tool_version_mismatch"],
	["tool_param_required", "pages.tool.apiError.tool_param_required"],
	["tool_param_type_mismatch", "pages.tool.apiError.tool_param_type_mismatch"],
	["tool_param_value_regex", "pages.tool.apiError.tool_param_value_regex"],
	["tool_with_name_exists", "pages.tool.apiError.tool_with_name_exists"],
]);

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
		getBusinessErrorTranslationKey,
		getStatusTranslationKey,
	};
}

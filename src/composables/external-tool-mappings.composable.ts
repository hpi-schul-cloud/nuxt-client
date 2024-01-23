import { BusinessError } from "@/store/types/commons";

const BusinessErrorMessageTranslationKeyMap = new Map<string, string>([
	["tool_param_duplicate", "pages.tool.apiError.tool_param_duplicate"],
	["tool_version_mismatch", "pages.tool.apiError.tool_version_mismatch"],
	["tool_param_required", "pages.tool.apiError.tool_param_required"],
	["tool_param_type_mismatch", "pages.tool.apiError.tool_param_type_mismatch"],
	["tool_param_value_regex", "pages.tool.apiError.tool_param_value_regex"],
	["tool_with_name_exists", "pages.tool.apiError.tool_with_name_exists"],
	["tool_param_unknown", "pages.tool.apiError.tool_param_unknown"],
	["tool_param_value_missing", "pages.tool.apiError.tool_param_value_missing"],
]);

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

	return {
		getBusinessErrorTranslationKey,
	};
}

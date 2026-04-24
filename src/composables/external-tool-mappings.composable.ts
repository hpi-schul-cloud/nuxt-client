import { BusinessError } from "@/store/types/commons";

const ErrorTypeTranslationKeyMap = new Map<string, string>([
	["TOOL_PARAMETER_DUPLICATE", "pages.tool.apiError.tool_param_duplicate"],
	["TOOL_PARAMETER_REQUIRED", "pages.tool.apiError.tool_param_required"],
	["TOOL_PARAMETER_TYPE_MISMATCH", "pages.tool.apiError.tool_param_type_mismatch"],
	["TOOL_PARAMETER_VALUE_REGEX", "pages.tool.apiError.tool_param_value_regex"],
	["CONTEXT_EXTERNAL_TOOL_NAME_ALREADY_EXISTS", "pages.tool.apiError.tool_with_name_exists"],
	["TOOL_PARAMETER_UNKNOWN", "pages.tool.apiError.tool_param_unknown"],
	["TOOL_PARAMETER_MANDATORY_VALUE_MISSING", "pages.tool.apiError.tool_param_mandatory_value_missing"],
]);

export function useExternalToolMappings() {
	const getBusinessErrorTranslationKey = (businessError: BusinessError | undefined): undefined | string => {
		if (!businessError) {
			return undefined;
		}

		if (businessError.error && "type" in businessError.error) {
			const translationKey = ErrorTypeTranslationKeyMap.get(businessError.error.type);

			if (translationKey) {
				return translationKey;
			}
		}

		return businessError.message;
	};

	return {
		getBusinessErrorTranslationKey,
	};
}

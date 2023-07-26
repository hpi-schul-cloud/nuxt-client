import { CustomParameterResponse } from "@/serverApi/v3";
import {
	ToolParamLocationMapping,
	ToolParamScopeMapping,
	ToolParamTypeMapping,
} from "@/composables/external-tool-mappings.composable";
import { ToolParameter } from "../tool-parameter";

export class ExternalToolMapper {
	static mapToToolParameter(response: CustomParameterResponse): ToolParameter {
		const mapped: ToolParameter = {
			name: response.name,
			type: ToolParamTypeMapping[response.type],
			scope: ToolParamScopeMapping[response.scope],
			location: ToolParamLocationMapping[response.location],
			defaultValue: response.defaultValue,
			description: response.description,
			displayName: response.displayName,
			isOptional: response.isOptional,
			regex: response.regex,
			regexComment: response.regexComment,
		};

		return mapped;
	}
}

import { ToolParameter } from "../tool-parameter";
import { ToolParamLocationMapping, ToolParamScopeMapping, ToolParamTypeMapping } from "./common-tool.mapper";
import { CustomParameterResponse } from "@/serverApi/v3";

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
			isProtected: response.isProtected,
			regex: response.regex,
			regexComment: response.regexComment,
		};

		return mapped;
	}
}

import {
	CustomParameterResponse,
	ToolReferenceListResponse,
} from "@/serverApi/v3";
import { ExternalToolDisplayData } from "../external-tool-display-data";
import { ToolParameter } from "../tool-parameter";
import {
	ToolConfigurationStatusMapping,
	ToolParamLocationMapping,
	ToolParamScopeMapping,
	ToolParamTypeMapping,
} from "./common-tool.mapper";

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

	static mapToExternalToolDisplayData(
		response: ToolReferenceListResponse
	): ExternalToolDisplayData[] {
		const mapped: ExternalToolDisplayData[] = response.data.map(
			(tool): ExternalToolDisplayData => ({
				contextExternalToolId: tool.contextToolId,
				name: tool.displayName,
				status: ToolConfigurationStatusMapping[tool.status],
				logoUrl: tool.logoUrl,
				openInNewTab: tool.openInNewTab,
			})
		);

		return mapped;
	}
}

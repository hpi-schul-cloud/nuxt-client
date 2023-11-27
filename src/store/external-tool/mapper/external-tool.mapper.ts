import {
	CustomParameterResponse,
	ToolLaunchRequestResponse,
	ToolReferenceListResponse,
	ToolReferenceResponse,
} from "@/serverApi/v3";
import { ExternalToolDisplayData } from "../external-tool-display-data";
import { ToolLaunchRequest } from "../tool-launch-request";
import { ToolParameter } from "../tool-parameter";
import {
	CommonToolMapper,
	ToolLaunchRequestMethodMapping,
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

	static mapToExternalToolDisplayDataList(
		response: ToolReferenceListResponse
	): ExternalToolDisplayData[] {
		const mapped: ExternalToolDisplayData[] = response.data.map(
			(tool): ExternalToolDisplayData =>
				ExternalToolMapper.mapToExternalToolDisplayData(tool)
		);

		return mapped;
	}

	static mapToExternalToolDisplayData(
		response: ToolReferenceResponse
	): ExternalToolDisplayData {
		const mapped: ExternalToolDisplayData = {
			contextExternalToolId: response.contextToolId,
			name: response.displayName,
			status: CommonToolMapper.mapToolConfigurationStatus(response.status),
			logoUrl: response.logoUrl,
			openInNewTab: response.openInNewTab,
		};

		return mapped;
	}

	static mapToToolLaunchRequest(
		response: ToolLaunchRequestResponse
	): ToolLaunchRequest {
		const mapped: ToolLaunchRequest = {
			method: ToolLaunchRequestMethodMapping[response.method],
			url: response.url,
			payload: response.payload,
			openNewTab: response.openNewTab,
		};

		return mapped;
	}
}

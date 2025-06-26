import {
	CustomParameterResponse,
	ToolLaunchRequestResponse,
	ToolReferenceListResponse,
	ToolReferenceResponse,
} from "@/serverApi/v3";
import { ExternalToolDisplayData } from "@data-external-tool";
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
			isProtected: response.isProtected,
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
			domain: response.domain,
			description: response.description,
			status: CommonToolMapper.mapContextExternalToolConfigurationStatus(
				response.status
			),
			logoUrl: response.logoUrl,
			thumbnailUrl: response.thumbnailUrl,
			openInNewTab: response.openInNewTab,
			isLtiDeepLinkingTool: response.isLtiDeepLinkingTool,
			ltiDeepLink: response.ltiDeepLink,
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
			launchType: response.launchType,
		};

		return mapped;
	}
}

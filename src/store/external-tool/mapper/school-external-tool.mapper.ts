import { SchoolExternalToolSave } from "../school-external-tool";
import { ToolParameter } from "../tool-parameter";
import { ToolParameterEntry } from "../tool-parameter-entry";
import { ExternalToolMapper } from "./external-tool.mapper";
import {
	SchoolExternalToolConfigurationTemplateListResponse,
	SchoolExternalToolConfigurationTemplateResponse,
} from "@/serverApi/v3";

export class SchoolExternalToolMapper {
	static mapToSchoolExternalToolConfigurationTemplate(response: SchoolExternalToolConfigurationTemplateResponse) {
		return {
			externalToolId: response.externalToolId,
			logoUrl: response.logoUrl,
			name: response.name,
			baseUrl: response.baseUrl,
			parameters: response.parameters.map(
				(parameter): ToolParameter => ExternalToolMapper.mapToToolParameter(parameter)
			),
			isDeactivated: false,
			medium: response.medium,
		};
	}

	static mapToSchoolExternalToolConfigurationTemplateList(
		response: SchoolExternalToolConfigurationTemplateListResponse
	) {
		return response.data.map((template) =>
			SchoolExternalToolMapper.mapToSchoolExternalToolConfigurationTemplate(template)
		);
	}

	static mapTemplateToSchoolExternalToolSave(
		toolId: string,
		parameterConfiguration: ToolParameterEntry[],
		schoolId: string,
		isDeactivated: boolean
	): SchoolExternalToolSave {
		return {
			schoolId,
			toolId,
			parameters: parameterConfiguration,
			isDeactivated,
		};
	}
}

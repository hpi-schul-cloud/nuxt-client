import {
	CustomParameterEntryParam,
	SchoolExternalToolConfigurationTemplateListResponse,
	SchoolExternalToolConfigurationTemplateResponse,
	SchoolExternalToolMetadataResponse,
	SchoolExternalToolPostParams,
	SchoolExternalToolResponse,
	SchoolExternalToolSearchListResponse,
} from "@/serverApi/v3";
import {
	SchoolExternalTool,
	SchoolExternalToolSave,
} from "../school-external-tool";
import { SchoolExternalToolMetadata } from "../school-external-tool-metadata";
import { SchoolExternalToolConfigurationTemplate } from "../tool-configuration-template";
import { ToolParameter } from "../tool-parameter";
import { ToolParameterEntry } from "../tool-parameter-entry";
import {
	CommonToolMapper,
	ToolConfigurationStatusMapping,
} from "./common-tool.mapper";
import { ExternalToolMapper } from "./external-tool.mapper";

export class SchoolExternalToolMapper {
	static mapToSchoolExternalToolConfigurationTemplate(
		response: SchoolExternalToolConfigurationTemplateResponse
	): SchoolExternalToolConfigurationTemplate {
		const mapped: SchoolExternalToolConfigurationTemplate = {
			externalToolId: response.externalToolId,
			logoUrl: response.logoUrl,
			name: response.name,
			parameters: response.parameters.map(
				(parameter): ToolParameter =>
					ExternalToolMapper.mapToToolParameter(parameter)
			),
			version: response.version,
		};

		return mapped;
	}

	static mapToSchoolExternalToolConfigurationTemplateList(
		response: SchoolExternalToolConfigurationTemplateListResponse
	): SchoolExternalToolConfigurationTemplate[] {
		const mapped = response.data.map((tempalte) =>
			SchoolExternalToolMapper.mapToSchoolExternalToolConfigurationTemplate(
				tempalte
			)
		);

		return mapped;
	}

	static mapToSchoolExternalToolPostParams(
		schoolExternalTool: SchoolExternalToolSave
	): SchoolExternalToolPostParams {
		const mapped: SchoolExternalToolPostParams = {
			schoolId: schoolExternalTool.schoolId,
			toolId: schoolExternalTool.toolId,
			parameters: schoolExternalTool.parameters.map(
				(parameter): CustomParameterEntryParam =>
					CommonToolMapper.mapToCustomParameterEntryParam(parameter)
			),
			version: schoolExternalTool.version,
		};

		return mapped;
	}

	static mapToSchoolExternalTool(
		response: SchoolExternalToolResponse
	): SchoolExternalTool {
		const mapped: SchoolExternalTool = {
			id: response.id,
			name: response.name,
			schoolId: response.schoolId,
			toolId: response.toolId,
			version: response.toolVersion,
			status: ToolConfigurationStatusMapping[response.status],
			parameters: response.parameters.map(
				(parameter): ToolParameterEntry =>
					CommonToolMapper.mapToToolParameterEntry(parameter)
			),
		};

		return mapped;
	}

	static mapTemplateToSchoolExternalToolSave(
		template: SchoolExternalToolConfigurationTemplate,
		parameterConfiguration: (string | undefined)[],
		schoolId: string
	): SchoolExternalToolSave {
		const mapped: SchoolExternalToolSave = {
			schoolId: schoolId,
			toolId: template.externalToolId,
			version: template.version,
			parameters: template.parameters.map(
				(parameter, index): ToolParameterEntry => ({
					name: parameter.name,
					value: parameterConfiguration[index],
				})
			),
		};

		return mapped;
	}

	static mapSchoolExternalToolSearchListResponse(
		response: SchoolExternalToolSearchListResponse
	): SchoolExternalTool[] {
		const mapped: SchoolExternalTool[] = response.data.map(
			(toolResponse: SchoolExternalToolResponse) =>
				SchoolExternalToolMapper.mapToSchoolExternalTool(toolResponse)
		);

		return mapped;
	}

	static mapSchoolExternalToolMetadata(
		response: SchoolExternalToolMetadataResponse
	): SchoolExternalToolMetadata {
		const mapped: SchoolExternalToolMetadata = {
			course: response.contextExternalToolCountPerContext.course,
			boardElement: response.contextExternalToolCountPerContext.boardElement,
		};

		return mapped;
	}
}

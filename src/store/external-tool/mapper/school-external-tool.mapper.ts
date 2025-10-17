import { SchoolExternalTool, SchoolExternalToolSave } from "../school-external-tool";
import { SchoolExternalToolConfigurationStatus } from "../school-external-tool-configuration-status";
import { SchoolExternalToolMetadata } from "../school-external-tool-metadata";
import { ToolParameter } from "../tool-parameter";
import { ToolParameterEntry } from "../tool-parameter-entry";
import { CommonToolMapper } from "./common-tool.mapper";
import { ExternalToolMapper } from "./external-tool.mapper";
import {
	CustomParameterEntryParam,
	SchoolExternalToolConfigurationStatusResponse,
	SchoolExternalToolConfigurationTemplateListResponse,
	SchoolExternalToolConfigurationTemplateResponse,
	SchoolExternalToolMetadataResponse,
	SchoolExternalToolPostParams,
	SchoolExternalToolResponse,
	SchoolExternalToolSearchListResponse,
} from "@/serverApi/v3";
import { SchoolExternalToolConfigurationTemplate } from "@data-external-tool";

export class SchoolExternalToolMapper {
	static mapToSchoolExternalToolConfigurationTemplate(
		response: SchoolExternalToolConfigurationTemplateResponse
	): SchoolExternalToolConfigurationTemplate {
		const mapped: SchoolExternalToolConfigurationTemplate = {
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

		return mapped;
	}

	static mapToSchoolExternalToolConfigurationTemplateList(
		response: SchoolExternalToolConfigurationTemplateListResponse
	): SchoolExternalToolConfigurationTemplate[] {
		const mapped = response.data.map((tempalte) =>
			SchoolExternalToolMapper.mapToSchoolExternalToolConfigurationTemplate(tempalte)
		);

		return mapped;
	}

	static mapToSchoolExternalToolPostParams(schoolExternalTool: SchoolExternalToolSave): SchoolExternalToolPostParams {
		const mapped: SchoolExternalToolPostParams = {
			schoolId: schoolExternalTool.schoolId,
			toolId: schoolExternalTool.toolId,
			parameters: schoolExternalTool.parameters.map(
				(parameter): CustomParameterEntryParam => CommonToolMapper.mapToCustomParameterEntryParam(parameter)
			),
			isDeactivated: schoolExternalTool.isDeactivated,
		};

		return mapped;
	}

	static mapToSchoolExternalTool(response: SchoolExternalToolResponse): SchoolExternalTool {
		const mapped: SchoolExternalTool = {
			id: response.id,
			name: response.name,
			schoolId: response.schoolId,
			toolId: response.toolId,
			status: this.mapSchoolToolConfigurationStatus(response.status),
			parameters: response.parameters.map(
				(parameter): ToolParameterEntry => CommonToolMapper.mapToToolParameterEntry(parameter)
			),
			isDeactivated: response.isDeactivated,
			restrictToContexts: response.restrictToContexts,
			medium: response.medium,
		};

		return mapped;
	}

	static mapTemplateToSchoolExternalToolSave(
		template: SchoolExternalToolConfigurationTemplate,
		parameterConfiguration: ToolParameterEntry[],
		schoolId: string,
		isDeactivated: boolean
	): SchoolExternalToolSave {
		const mapped: SchoolExternalToolSave = {
			schoolId: schoolId,
			toolId: template.externalToolId,
			parameters: parameterConfiguration,
			isDeactivated,
		};

		return mapped;
	}

	static mapSchoolExternalToolSearchListResponse(response: SchoolExternalToolSearchListResponse): SchoolExternalTool[] {
		const mapped: SchoolExternalTool[] = response.data.map((toolResponse: SchoolExternalToolResponse) =>
			SchoolExternalToolMapper.mapToSchoolExternalTool(toolResponse)
		);

		return mapped;
	}

	static mapSchoolExternalToolMetadata(response: SchoolExternalToolMetadataResponse): SchoolExternalToolMetadata {
		const mapped: SchoolExternalToolMetadata = {
			course: response.contextExternalToolCountPerContext.course,
			boardElement: response.contextExternalToolCountPerContext.boardElement,
			mediaBoard: response.contextExternalToolCountPerContext.mediaBoard,
		};

		return mapped;
	}

	static mapSchoolToolConfigurationStatus(
		schoolToolStatus: SchoolExternalToolConfigurationStatusResponse
	): SchoolExternalToolConfigurationStatus {
		const mapped: SchoolExternalToolConfigurationStatus = {
			isOutdatedOnScopeSchool: schoolToolStatus.isOutdatedOnScopeSchool,
			isGloballyDeactivated: schoolToolStatus.isGloballyDeactivated,
		};

		return mapped;
	}
}

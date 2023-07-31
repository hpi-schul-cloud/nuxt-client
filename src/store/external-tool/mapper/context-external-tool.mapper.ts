import {
	ContextExternalToolConfigurationTemplateListResponse,
	ContextExternalToolConfigurationTemplateResponse,
	ContextExternalToolPostParams,
	CustomParameterEntryParam,
} from "@/serverApi/v3";
import { ContextExternalToolSave } from "../context-external-tool";
import { ContextExternalToolConfigurationTemplate } from "../tool-configuration-template";
import { ToolContextType } from "../tool-context-type.enum";
import { ToolParameter } from "../tool-parameter";
import { ToolParameterEntry } from "../tool-parameter-entry";
import { CommonToolMapper } from "./common-tool.mapper";
import { ExternalToolMapper } from "./external-tool.mapper";

export class ContextExternalToolMapper {
	static mapToContextExternalToolConfigurationTemplate(
		response: ContextExternalToolConfigurationTemplateResponse
	): ContextExternalToolConfigurationTemplate {
		const mapped: ContextExternalToolConfigurationTemplate = {
			externalToolId: response.externalToolId,
			schoolExternalToolId: response.schoolExternalToolId,
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

	static mapToContextExternalToolConfigurationTemplateList(
		response: ContextExternalToolConfigurationTemplateListResponse
	): ContextExternalToolConfigurationTemplate[] {
		const mapped = response.data.map((tempalte) =>
			this.mapToContextExternalToolConfigurationTemplate(tempalte)
		);

		return mapped;
	}

	static mapToContextExternalToolPostParams(
		contextExternalTool: ContextExternalToolSave
	): ContextExternalToolPostParams {
		const mapped: ContextExternalToolPostParams = {
			contextId: contextExternalTool.contextId,
			contextType: contextExternalTool.contextType,
			toolVersion: contextExternalTool.toolVersion,
			schoolToolId: contextExternalTool.schoolToolId,
			displayName: contextExternalTool.displayName,
			parameters: contextExternalTool.parameters.map(
				(parameter): CustomParameterEntryParam =>
					CommonToolMapper.mapToCustomParameterEntryParam(parameter)
			),
		};

		return mapped;
	}

	static mapTemplateToContextExternalToolSave(
		template: ContextExternalToolConfigurationTemplate,
		parameterConfiguration: (string | undefined)[],
		contextId: string,
		contextType: ToolContextType
	): ContextExternalToolSave {
		const mapped: ContextExternalToolSave = {
			contextId,
			contextType,
			displayName: undefined,
			schoolToolId: template.schoolExternalToolId,
			toolVersion: template.version,
			parameters: template.parameters.map(
				(parameter, index): ToolParameterEntry => ({
					name: parameter.name,
					value: parameterConfiguration[index],
				})
			),
		};

		return mapped;
	}
}

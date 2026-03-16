import { ContextExternalTool, ContextExternalToolConfigurationTemplate, ContextExternalToolSave } from "./types";
import { ToolParameter, ToolParameterEntry } from "@/store/external-tool";
import { ExternalToolMapper } from "@/store/external-tool/mapper";
import {
	ContextExternalToolConfigurationTemplateListResponse,
	ContextExternalToolConfigurationTemplateResponse,
	ContextExternalToolPostParams,
	ContextExternalToolResponse,
	ContextExternalToolResponseContextType,
	ToolContextType,
} from "@api-server";

export const ToolContextMapping: Record<ContextExternalToolResponseContextType, ToolContextType> = {
	[ContextExternalToolResponseContextType.COURSE]: ToolContextType.COURSE,
	[ContextExternalToolResponseContextType.BOARD_ELEMENT]: ToolContextType.BOARD_ELEMENT,
	[ContextExternalToolResponseContextType.MEDIA_BOARD]: ToolContextType.MEDIA_BOARD,
};

export class ContextExternalToolMapper {
	static mapToContextExternalToolConfigurationTemplate(
		response: ContextExternalToolConfigurationTemplateResponse
	): ContextExternalToolConfigurationTemplate {
		const mapped: ContextExternalToolConfigurationTemplate = {
			externalToolId: response.externalToolId,
			schoolExternalToolId: response.schoolExternalToolId,
			logoUrl: response.logoUrl,
			name: response.name,
			baseUrl: response.baseUrl,
			parameters: response.parameters.map(
				(parameter): ToolParameter => ExternalToolMapper.mapToToolParameter(parameter)
			),
		};

		return mapped;
	}

	static mapToContextExternalToolConfigurationTemplateList(
		response: ContextExternalToolConfigurationTemplateListResponse
	): ContextExternalToolConfigurationTemplate[] {
		const mapped = response.data.map((tempalte) => this.mapToContextExternalToolConfigurationTemplate(tempalte));

		return mapped;
	}

	static mapToContextExternalToolPostParams(
		contextExternalTool: ContextExternalToolSave
	): ContextExternalToolPostParams {
		const mapped: ContextExternalToolPostParams = {
			contextId: contextExternalTool.contextId,
			contextType: contextExternalTool.contextType,
			schoolToolId: contextExternalTool.schoolToolId,
			displayName: contextExternalTool.displayName,
			parameters: contextExternalTool.parameters,
		};

		return mapped;
	}

	static mapTemplateToContextExternalToolSave(
		template: ContextExternalToolConfigurationTemplate,
		parameterConfiguration: ToolParameterEntry[],
		contextId: string,
		contextType: ToolContextType,
		displayName?: string
	): ContextExternalToolSave {
		const mapped: ContextExternalToolSave = {
			contextId,
			contextType,
			displayName: displayName || undefined,
			schoolToolId: template.schoolExternalToolId,
			parameters: parameterConfiguration,
		};

		return mapped;
	}

	static mapToContextExternalTool(response: ContextExternalToolResponse): ContextExternalTool {
		const mapped: ContextExternalTool = {
			id: response.id,
			contextId: response.contextId,
			contextType: ToolContextMapping[response.contextType],
			displayName: response.displayName,
			schoolToolId: response.schoolToolId,
			parameters: response.parameters.map(
				(parameter): ToolParameterEntry => ({
					name: parameter.name,
					value: parameter.value,
				})
			),
		};

		return mapped;
	}
}

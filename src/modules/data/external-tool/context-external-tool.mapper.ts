import { ContextExternalTool, ContextExternalToolConfigurationTemplate, ContextExternalToolSave } from "./types";
import {
	ContextExternalToolConfigurationTemplateListResponse,
	ContextExternalToolConfigurationTemplateResponse,
	ContextExternalToolPostParams,
	ContextExternalToolResponse,
	ContextExternalToolResponseContextTypeEnum,
	CustomParameterEntryParam,
	ToolContextType,
} from "@/serverApi/v3";
import { ToolParameter, ToolParameterEntry } from "@/store/external-tool";
import { ExternalToolMapper } from "@/store/external-tool/mapper";
import { CommonToolMapper } from "@/store/external-tool/mapper/common-tool.mapper";

export const ToolContextMapping: Record<ContextExternalToolResponseContextTypeEnum, ToolContextType> = {
	[ContextExternalToolResponseContextTypeEnum.Course]: ToolContextType.Course,
	[ContextExternalToolResponseContextTypeEnum.BoardElement]: ToolContextType.BoardElement,
	[ContextExternalToolResponseContextTypeEnum.MediaBoard]: ToolContextType.MediaBoard,
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
			parameters: contextExternalTool.parameters.map(
				(parameter): CustomParameterEntryParam => CommonToolMapper.mapToCustomParameterEntryParam(parameter)
			),
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

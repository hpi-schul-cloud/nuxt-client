import {
	ContextExternalToolConfigurationTemplateListResponse,
	ContextExternalToolConfigurationTemplateResponse,
	ContextExternalToolPostParams,
	ContextExternalToolResponse,
	ContextExternalToolResponseContextTypeEnum,
	CustomParameterEntryParam,
	ToolContextType,
} from "@/serverApi/v3";
import {
	ContextExternalTool,
	ContextExternalToolSave,
} from "../context-external-tool";
import { ContextExternalToolConfigurationTemplate } from "../tool-configuration-template";
import { ToolParameter } from "../tool-parameter";
import { ToolParameterEntry } from "../tool-parameter-entry";
import { CommonToolMapper } from "./common-tool.mapper";
import { ExternalToolMapper } from "./external-tool.mapper";

export const ToolContextMapping: Record<
	ContextExternalToolResponseContextTypeEnum,
	ToolContextType
> = {
	[ContextExternalToolResponseContextTypeEnum.Course]: ToolContextType.Course,
	[ContextExternalToolResponseContextTypeEnum.BoardElement]:
		ToolContextType.BoardElement,
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
		contextType: ToolContextType,
		displayName?: string
	): ContextExternalToolSave {
		const mapped: ContextExternalToolSave = {
			contextId,
			contextType,
			displayName: displayName ? displayName : template.name,
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

	static mapToContextExternalTool(
		response: ContextExternalToolResponse
	): ContextExternalTool {
		const mapped: ContextExternalTool = {
			id: response.id,
			contextId: response.contextId,
			contextType: ToolContextMapping[response.contextType],
			displayName: response.displayName,
			schoolToolId: response.schoolToolId,
			toolVersion: response.toolVersion,
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

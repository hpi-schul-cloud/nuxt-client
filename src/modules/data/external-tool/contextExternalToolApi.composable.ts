import { ContextExternalToolMapper } from "./context-external-tool.mapper";
import { ContextExternalTool, ContextExternalToolConfigurationTemplate, ContextExternalToolSave } from "./types";
import {
	ContextExternalToolConfigurationTemplateListResponse,
	ContextExternalToolConfigurationTemplateResponse,
	ContextExternalToolPostParams,
	ContextExternalToolResponse,
	PreferredToolListResponse,
	ToolApiFactory,
	ToolApiInterface,
	ToolContextType,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";

export const useContextExternalToolApi = () => {
	const toolApi: ToolApiInterface = ToolApiFactory(undefined, "/v3", $axios);

	const fetchContextExternalToolCall = async (contextExternalToolId: string): Promise<ContextExternalTool> => {
		const availableTools: AxiosResponse<ContextExternalToolResponse> =
			await toolApi.toolContextControllerGetContextExternalTool(contextExternalToolId);

		const mapped: ContextExternalTool = ContextExternalToolMapper.mapToContextExternalTool(availableTools.data);

		return mapped;
	};

	const createContextExternalToolCall = async (
		contextExternalTool: ContextExternalToolSave
	): Promise<ContextExternalTool> => {
		const contextExternalToolPostParams: ContextExternalToolPostParams =
			ContextExternalToolMapper.mapToContextExternalToolPostParams(contextExternalTool);

		const response: AxiosResponse<ContextExternalToolResponse> =
			await toolApi.toolContextControllerCreateContextExternalTool(contextExternalToolPostParams);

		const mapped: ContextExternalTool = ContextExternalToolMapper.mapToContextExternalTool(response.data);

		return mapped;
	};

	const updateContextExternalToolCall = async (
		contextExternalToolId: string,
		contextExternalTool: ContextExternalToolSave
	): Promise<ContextExternalTool> => {
		const contextExternalToolPostParams: ContextExternalToolPostParams =
			ContextExternalToolMapper.mapToContextExternalToolPostParams(contextExternalTool);

		const response: AxiosResponse<ContextExternalToolResponse> =
			await toolApi.toolContextControllerUpdateContextExternalTool(
				contextExternalToolId,
				contextExternalToolPostParams
			);

		const mapped: ContextExternalTool = ContextExternalToolMapper.mapToContextExternalTool(response.data);

		return mapped;
	};

	const deleteContextExternalToolCall = async (contextExternalToolId: string): Promise<void> => {
		await toolApi.toolContextControllerDeleteContextExternalTool(contextExternalToolId);
	};

	const fetchAvailableToolsForContextCall = async (
		contextId: string,
		contextType: ToolContextType
	): Promise<ContextExternalToolConfigurationTemplate[]> => {
		const availableTools: AxiosResponse<ContextExternalToolConfigurationTemplateListResponse> =
			await toolApi.toolConfigurationControllerGetAvailableToolsForContext(contextType, contextId);

		const mapped: ContextExternalToolConfigurationTemplate[] =
			ContextExternalToolMapper.mapToContextExternalToolConfigurationTemplateList(availableTools.data);

		return mapped;
	};

	const fetchConfigurationTemplateForContextExternalToolCall = async (
		contextExternalToolId: string
	): Promise<ContextExternalToolConfigurationTemplate> => {
		const configTemplate: AxiosResponse<ContextExternalToolConfigurationTemplateResponse> =
			await toolApi.toolConfigurationControllerGetConfigurationTemplateForContext(contextExternalToolId);

		const toolConfigurationTemplate: ContextExternalToolConfigurationTemplate =
			ContextExternalToolMapper.mapToContextExternalToolConfigurationTemplate(configTemplate.data);

		return toolConfigurationTemplate;
	};

	const fetchPreferredTools = async (
		contextType: ToolContextType | undefined
	): Promise<AxiosResponse<PreferredToolListResponse>> =>
		await toolApi.toolConfigurationControllerGetPreferredToolsForContext(contextType);

	return {
		fetchContextExternalToolCall,
		createContextExternalToolCall,
		updateContextExternalToolCall,
		deleteContextExternalToolCall,
		fetchAvailableToolsForContextCall,
		fetchConfigurationTemplateForContextExternalToolCall,
		fetchPreferredTools,
	};
};

import { ExternalToolDisplayData } from "./types";
import { ToolApiFactory, ToolApiInterface, ToolContextType, ToolReferenceListResponse } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";

export const useExternalToolReferenceApi = () => {
	const toolApi: ToolApiInterface = ToolApiFactory(undefined, "/v3", $axios);

	const fetchDisplayDataCall = async (contextExternalToolId: string): Promise<ExternalToolDisplayData> => {
		const response = await toolApi.toolReferenceControllerGetToolReference(contextExternalToolId);

		const { contextToolId, displayName, ...rest } = response.data;

		return {
			...rest,
			contextExternalToolId: contextToolId,
			name: displayName,
		};
	};

	const fetchDisplayDataForContext = async (
		contextId: string,
		contextType: ToolContextType
	): Promise<ExternalToolDisplayData[]> => {
		const response: AxiosResponse<ToolReferenceListResponse> =
			await toolApi.toolReferenceControllerGetToolReferencesForContext(contextId, contextType);

		return response.data.data.map(({ contextToolId, displayName, ...rest }) => ({
			...rest,
			contextExternalToolId: contextToolId,
			name: displayName,
		}));
	};

	return {
		fetchDisplayDataCall,
		fetchDisplayDataForContext,
	};
};

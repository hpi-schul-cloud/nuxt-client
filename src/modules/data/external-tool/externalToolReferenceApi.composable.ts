import { ExternalToolDisplayData } from "./types";
import {
	ToolApiFactory,
	ToolApiInterface,
	ToolContextType,
	ToolReferenceListResponse,
	ToolReferenceResponse,
} from "@/serverApi/v3";
import { ExternalToolMapper } from "@/store/external-tool/mapper";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";

export const useExternalToolReferenceApi = () => {
	const toolApi: ToolApiInterface = ToolApiFactory(undefined, "/v3", $axios);

	const fetchDisplayDataCall = async (contextExternalToolId: string): Promise<ExternalToolDisplayData> => {
		const response: AxiosResponse<ToolReferenceResponse> =
			await toolApi.toolReferenceControllerGetToolReference(contextExternalToolId);

		const mapped: ExternalToolDisplayData = ExternalToolMapper.mapToExternalToolDisplayData(response.data);

		return mapped;
	};

	const fetchDisplayDataForContext = async (
		contextId: string,
		contextType: ToolContextType
	): Promise<ExternalToolDisplayData[]> => {
		const response: AxiosResponse<ToolReferenceListResponse> =
			await toolApi.toolReferenceControllerGetToolReferencesForContext(contextId, contextType);

		const mapped: ExternalToolDisplayData[] = ExternalToolMapper.mapToExternalToolDisplayDataList(response.data);

		return mapped;
	};

	return {
		fetchDisplayDataCall,
		fetchDisplayDataForContext,
	};
};

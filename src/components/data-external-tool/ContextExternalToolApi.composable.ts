import {
	ToolApiFactory,
	ToolApiInterface,
	ToolContextType,
	ToolReferenceListResponse,
} from "@/serverApi/v3";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { ExternalToolMapper } from "@/store/external-tool/mapper";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";

export const useContextExternalToolApi = () => {
	const toolApi: ToolApiInterface = ToolApiFactory(undefined, "/v3", $axios);

	const fetchDisplayDataCall = async (
		contextId: string,
		contextType: ToolContextType
	): Promise<ExternalToolDisplayData[]> => {
		const response: AxiosResponse<ToolReferenceListResponse> =
			await toolApi.toolControllerGetToolReferences(contextId, contextType);

		const mapped: ExternalToolDisplayData[] =
			ExternalToolMapper.mapToExternalToolDisplayData(response.data);

		return mapped;
	};

	return {
		fetchDisplayDataCall,
	};
};

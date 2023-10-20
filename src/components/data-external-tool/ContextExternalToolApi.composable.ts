import {
	ToolApiFactory,
	ToolApiInterface,
	ToolReferenceResponse,
} from "@/serverApi/v3";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { ExternalToolMapper } from "@/store/external-tool/mapper";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";

export const useContextExternalToolApi = () => {
	const toolApi: ToolApiInterface = ToolApiFactory(undefined, "/v3", $axios);

	const fetchDisplayDataCall = async (
		contextExternalToolId: string
	): Promise<ExternalToolDisplayData> => {
		const response: AxiosResponse<ToolReferenceResponse> =
			await toolApi.toolReferenceControllerGetToolReference(
				contextExternalToolId
			);

		const mapped: ExternalToolDisplayData =
			ExternalToolMapper.mapToExternalToolDisplayData(response.data);

		return mapped;
	};

	return {
		fetchDisplayDataCall,
	};
};

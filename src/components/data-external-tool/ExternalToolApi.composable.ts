import {
	ToolApiFactory,
	ToolApiInterface,
	ToolLaunchRequestResponse,
} from "@/serverApi/v3";
import { ToolLaunchRequest } from "@/store/external-tool";
import { ExternalToolMapper } from "@/store/external-tool/mapper";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";

export const useExternalToolApi = () => {
	const toolApi: ToolApiInterface = ToolApiFactory(undefined, "/v3", $axios);

	const fetchLaunchDataCall = async (
		contextExternalToolId: string
	): Promise<ToolLaunchRequest> => {
		const response: AxiosResponse<ToolLaunchRequestResponse> =
			await toolApi.toolLaunchControllerGetToolLaunchRequest(
				contextExternalToolId
			);

		const mapped: ToolLaunchRequest = ExternalToolMapper.mapToToolLaunchRequest(
			response.data
		);

		return mapped;
	};

	return {
		fetchLaunchDataCall,
	};
};

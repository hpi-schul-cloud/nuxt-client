import {
	ContextExternalToolBodyParams,
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

	const fetchContextLaunchDataCall = async (contextExternalToolId: string): Promise<ToolLaunchRequest> => {
		const response: AxiosResponse<ToolLaunchRequestResponse> =
			await toolApi.toolLaunchControllerGetContextExternalToolLaunchRequest(contextExternalToolId);

		const mapped: ToolLaunchRequest = ExternalToolMapper.mapToToolLaunchRequest(response.data);

		return mapped;
	};

	const fetchSchoolLaunchDataCall = async (
		schoolExternalToolId: string,
		contextExternalToolBodyParams: ContextExternalToolBodyParams
	): Promise<ToolLaunchRequest> => {
		const response: AxiosResponse<ToolLaunchRequestResponse> =
			await toolApi.toolLaunchControllerGetSchoolExternalToolLaunchRequest(
				schoolExternalToolId,
				contextExternalToolBodyParams
			);

		const mapped: ToolLaunchRequest = ExternalToolMapper.mapToToolLaunchRequest(response.data);

		return mapped;
	};

	return {
		fetchContextLaunchDataCall,
		fetchSchoolLaunchDataCall,
	};
};

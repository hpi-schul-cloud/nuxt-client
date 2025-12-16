import { ContextExternalToolBodyParams, ToolApiFactory, ToolApiInterface } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useExternalToolApi = () => {
	const toolApi: ToolApiInterface = ToolApiFactory(undefined, "/v3", $axios);

	const fetchContextLaunchDataCall = async (contextExternalToolId: string) => {
		const response = await toolApi.toolLaunchControllerGetContextExternalToolLaunchRequest(contextExternalToolId);

		return response.data;
	};

	const fetchSchoolLaunchDataCall = async (
		schoolExternalToolId: string,
		contextExternalToolBodyParams: ContextExternalToolBodyParams
	) => {
		const response = await toolApi.toolLaunchControllerGetSchoolExternalToolLaunchRequest(
			schoolExternalToolId,
			contextExternalToolBodyParams
		);

		return response.data;
	};

	return {
		fetchContextLaunchDataCall,
		fetchSchoolLaunchDataCall,
	};
};

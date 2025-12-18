import { ToolApiFactory, ToolApiInterface } from "@/serverApi/v3";
import { SchoolExternalToolMetadata } from "@/store/external-tool";
import { $axios } from "@/utils/api";

export const useSchoolExternalToolApi = () => {
	const toolApi: ToolApiInterface = ToolApiFactory(undefined, "/v3", $axios);

	const fetchSchoolExternalToolMetadata = async (schoolExternalToolId: string): Promise<SchoolExternalToolMetadata> => {
		const response = await toolApi.toolSchoolControllerGetMetaDataForExternalTool(schoolExternalToolId);

		return {
			course: response.data.contextExternalToolCountPerContext.course,
			boardElement: response.data.contextExternalToolCountPerContext.boardElement,
			mediaBoard: response.data.contextExternalToolCountPerContext.mediaBoard,
		};
	};

	return {
		fetchSchoolExternalToolMetadata,
	};
};

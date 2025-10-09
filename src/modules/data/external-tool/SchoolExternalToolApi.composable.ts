import { SchoolExternalToolMetadataResponse, ToolApiFactory, ToolApiInterface } from "@/serverApi/v3";
import { SchoolExternalToolMetadata } from "@/store/external-tool";
import { SchoolExternalToolMapper } from "@/store/external-tool/mapper";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";

export const useSchoolExternalToolApi = () => {
	const toolApi: ToolApiInterface = ToolApiFactory(undefined, "/v3", $axios);

	const fetchSchoolExternalToolMetadata = async (schoolExternalToolId: string): Promise<SchoolExternalToolMetadata> => {
		const response: AxiosResponse<SchoolExternalToolMetadataResponse> =
			await toolApi.toolSchoolControllerGetMetaDataForExternalTool(schoolExternalToolId);

		const mapped: SchoolExternalToolMetadata = SchoolExternalToolMapper.mapSchoolExternalToolMetadata(response.data);

		return mapped;
	};

	return {
		fetchSchoolExternalToolMetadata,
	};
};

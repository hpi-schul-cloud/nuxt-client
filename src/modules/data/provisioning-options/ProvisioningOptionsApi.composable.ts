import { ProvisioningOptions } from "./type/ProvisioningOptions";
import { SchoolApiFactory, SchulConneXProvisioningOptionsResponse } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";

export const useProvisioningOptionsApi = () => {
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);

	const getProvisioningOptions = async (systemId: string): Promise<ProvisioningOptions> => {
		const response: AxiosResponse<SchulConneXProvisioningOptionsResponse> =
			await schoolApi.schoolControllerGetProvisioningOptions(schoolsModule.getSchool.id, systemId);

		const provisioningOptions: ProvisioningOptions = {
			class: response.data.groupProvisioningClassesEnabled,
			course: response.data.groupProvisioningCoursesEnabled,
			others: response.data.groupProvisioningOtherEnabled,
			schoolExternalTools: response.data.schoolExternalToolProvisioningEnabled,
		};

		return provisioningOptions;
	};

	const saveProvisioningOptions = async (
		systemId: string,
		provisioningOptions: ProvisioningOptions
	): Promise<ProvisioningOptions> => {
		const response: AxiosResponse<SchulConneXProvisioningOptionsResponse> =
			await schoolApi.schoolControllerSetProvisioningOptions(schoolsModule.getSchool.id, systemId, {
				groupProvisioningClassesEnabled: provisioningOptions.class,
				groupProvisioningCoursesEnabled: provisioningOptions.course,
				groupProvisioningOtherEnabled: provisioningOptions.others,
				schoolExternalToolProvisioningEnabled: provisioningOptions.schoolExternalTools,
			});

		const savedOptions: ProvisioningOptions = {
			class: response.data.groupProvisioningClassesEnabled,
			course: response.data.groupProvisioningCoursesEnabled,
			others: response.data.groupProvisioningOtherEnabled,
			schoolExternalTools: response.data.schoolExternalToolProvisioningEnabled,
		};

		return savedOptions;
	};

	return {
		getProvisioningOptions,
		saveProvisioningOptions,
	};
};

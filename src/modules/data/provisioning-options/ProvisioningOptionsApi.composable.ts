import {
	SchoolApiFactory,
	SchulConneXProvisioningOptionsResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { ProvisioningOptions } from "./type";
import { schoolsModule } from "@/store";
import { AxiosResponse } from "axios";

export const useProvisioningOptionsApi = () => {
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);

	const getProvisioningOptions = async (
		systemId: string
	): Promise<ProvisioningOptions> => {
		const response: AxiosResponse<SchulConneXProvisioningOptionsResponse> =
			await schoolApi.schoolControllerGetProvisioningOptions(
				schoolsModule.getSchool.id,
				systemId
			);

		const provisioningOptions: ProvisioningOptions = {
			class: response.data.groupProvisioningClassesEnabled,
			course: response.data.groupProvisioningCoursesEnabled,
			others: response.data.groupProvisioningOtherEnabled,
			ctltool: response.data.ctlToolProvisioningEnabled,
		};

		return provisioningOptions;
	};

	const saveProvisioningOptions = async (
		systemId: string,
		provisioningOptions: ProvisioningOptions
	): Promise<ProvisioningOptions> => {
		const response: AxiosResponse<SchulConneXProvisioningOptionsResponse> =
			await schoolApi.schoolControllerSetProvisioningOptions(
				schoolsModule.getSchool.id,
				systemId,
				{
					groupProvisioningClassesEnabled: provisioningOptions.class,
					groupProvisioningCoursesEnabled: provisioningOptions.course,
					groupProvisioningOtherEnabled: provisioningOptions.others,
					ctlToolProvisioningEnabled: provisioningOptions.ctltool,
				}
			);

		const savedOptions: ProvisioningOptions = {
			class: response.data.groupProvisioningClassesEnabled,
			course: response.data.groupProvisioningCoursesEnabled,
			others: response.data.groupProvisioningOtherEnabled,
			ctltool: response.data.ctlToolProvisioningEnabled,
		};

		return savedOptions;
	};

	return {
		getProvisioningOptions,
		saveProvisioningOptions,
	};
};

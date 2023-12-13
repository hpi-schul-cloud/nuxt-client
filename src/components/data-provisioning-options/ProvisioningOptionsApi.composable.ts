import {
	SchoolApiFactory,
	SchulConneXProvisioningOptionsResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { ProvisioningOptions } from "./type";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { schoolsModule } from "@/store";
import { AxiosResponse } from "axios";

export const useProvisioningOptionsApi = () => {
	const { handleError } = useErrorHandler();
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);
	const provisioningOptionsDefaultValues: ProvisioningOptions = {
		class: true,
		course: false,
		others: false,
	};

	const getProvisioningOptions = async (
		systemId: string
	): Promise<ProvisioningOptions> => {
		try {
			const response: AxiosResponse<SchulConneXProvisioningOptionsResponse> =
				await schoolApi.schoolControllerGetProvisioningOptions(
					schoolsModule.getSchool.id,
					systemId
				);

			const provisioningOptions: ProvisioningOptions = {
				class: response.data.groupProvisioningClassesEnabled,
				course: response.data.groupProvisioningCoursesEnabled,
				others: response.data.groupProvisioningOtherEnabled,
			};

			return provisioningOptions;
		} catch (error) {
			handleError(error);
			return provisioningOptionsDefaultValues;
		}
	};

	const saveProvisioningOptions = async (
		systemId: string,
		provisioningOptions: ProvisioningOptions
	): Promise<ProvisioningOptions> => {
		try {
			const response: AxiosResponse<SchulConneXProvisioningOptionsResponse> =
				await schoolApi.schoolControllerSetProvisioningOptions(
					schoolsModule.getSchool.id,
					systemId,
					{
						groupProvisioningClassesEnabled: provisioningOptions.class,
						groupProvisioningCoursesEnabled: provisioningOptions.course,
						groupProvisioningOtherEnabled: provisioningOptions.others,
					}
				);

			const savedOptions: ProvisioningOptions = {
				class: response.data.groupProvisioningClassesEnabled,
				course: response.data.groupProvisioningCoursesEnabled,
				others: response.data.groupProvisioningOtherEnabled,
			};

			return savedOptions;
		} catch (error) {
			handleError(error);
			return provisioningOptionsDefaultValues;
		}
	};

	return {
		getProvisioningOptions,
		saveProvisioningOptions,
	};
};

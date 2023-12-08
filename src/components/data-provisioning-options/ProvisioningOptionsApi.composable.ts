import {
	SchoolApiFactory,
	SchulConneXProvisioningOptionsResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { ProvisioningOptions } from "./type";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { schoolsModule } from "../../store";
import { AxiosResponse } from "axios";

export const useProvisioningOptionsApi = () => {
	const { handleError } = useErrorHandler();
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);

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
			handleError(error, {
				404: undefined,
				500: undefined,
			});
			return {
				class: true,
				course: false,
				others: false,
			};
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
					{},
					{
						class: provisioningOptions.class,
						course: provisioningOptions.course,
						others: provisioningOptions.others,
					}
				);

			const savedOptions: ProvisioningOptions = {
				class: response.data.groupProvisioningClassesEnabled,
				course: response.data.groupProvisioningCoursesEnabled,
				others: response.data.groupProvisioningOtherEnabled,
			};

			return savedOptions;
		} catch (error) {
			handleError(error, {
				404: undefined,
				500: undefined,
			});
			return {
				class: true,
				course: false,
				others: false,
			};
		}
	};

	return {
		getProvisioningOptions,
		saveProvisioningOptions,
	};
};

import {
	SchoolApiFactory,
	SchulConneXProvisioningOptionsResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { ProvisioningOptions } from "./type";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { schoolsModule } from "@/store";
import { AxiosError, AxiosResponse } from "axios";
import { injectStrict, NOTIFIER_MODULE_KEY } from "../../utils/inject";

export const useProvisioningOptionsApi = () => {
	const { handleError } = useErrorHandler();
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
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
			// TODO N21-1479 values are never set before first save operation. How to deal with that?
			if (error instanceof AxiosError && error.response?.status === 404) {
				notifierModule.show({
					text: "No provisioning options Found. Default Values are set.",
					status: "error",
				});
			} else {
				handleError(error, {
					404: undefined,
					500: undefined,
				});
			}

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
			handleError(error, {
				404: undefined,
				500: undefined,
			});
			return provisioningOptionsDefaultValues;
		}
	};

	return {
		getProvisioningOptions,
		saveProvisioningOptions,
	};
};

import {
	SchoolApiFactory,
	SchulConneXProvisioningOptionsResponse,
} from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { ProvisioningOptions } from "./type";
import { schoolsModule } from "@/store";
import { AxiosResponse } from "axios";
import { injectStrict, NOTIFIER_MODULE_KEY } from "../../utils/inject";
import { useI18n } from "../../composables/i18n.composable";

// TODO N21-1479 move error handling to state composable
export const useProvisioningOptionsApi = () => {
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const { t } = useI18n();
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
			const apiError = mapAxiosErrorToResponseError(error);
			if (apiError.code === 404) {
				return provisioningOptionsDefaultValues;
			}

			notifierModule.show({
				text: t("error.load"),
				status: "error",
			});

			throw error;
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
			notifierModule.show({
				text: t("error.generic"),
				status: "error",
			});

			throw error;
		}
	};

	return {
		getProvisioningOptions,
		saveProvisioningOptions,
	};
};

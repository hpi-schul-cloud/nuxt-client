import { BusinessError } from "@/store/types/commons";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { ProvisioningOptions, useProvisioningOptionsApi } from "./index";
import { notifyError } from "@data-app";

export const useProvisioningOptionsState = () => {
	const { getProvisioningOptions, saveProvisioningOptions } =
		useProvisioningOptionsApi();
	const { t } = useI18n();
	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref();
	const provisioningOptionsData: Ref<ProvisioningOptions> = ref({
		class: true,
		course: false,
		others: false,
		schoolExternalTools: false,
	});
	const provisioningOptionsDefaultValues: ProvisioningOptions = {
		class: true,
		course: false,
		others: false,
		schoolExternalTools: false,
	};

	const fetchProvisioningOptionsData = async (
		systemId: string
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			provisioningOptionsData.value = await getProvisioningOptions(systemId);
		} catch (errorResponse) {
			const apiError = mapAxiosErrorToResponseError(errorResponse);

			error.value = {
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			};

			provisioningOptionsData.value = provisioningOptionsDefaultValues;

			if (apiError.code !== HttpStatusCode.NotFound) {
				notifyError(t("error.load"));
			}
		}

		isLoading.value = false;
	};

	const updateProvisioningOptionsData = async (
		systemId: string,
		provisioningOptions: ProvisioningOptions
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			provisioningOptionsData.value = await saveProvisioningOptions(
				systemId,
				provisioningOptions
			);
		} catch (errorResponse) {
			notifyError(t("error.generic"));
			const apiError = mapAxiosErrorToResponseError(errorResponse);

			error.value = {
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			};
		}

		isLoading.value = false;
	};

	return {
		provisioningOptionsData,
		isLoading,
		error,
		fetchProvisioningOptionsData,
		updateProvisioningOptionsData,
	};
};

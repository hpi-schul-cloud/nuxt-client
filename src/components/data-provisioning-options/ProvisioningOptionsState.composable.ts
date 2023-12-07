import { BusinessError } from "../../store/types/commons";
import { mapAxiosErrorToResponseError } from "../../utils/api";
import { ref, Ref } from "vue";
import { ProvisioningOptions, useProvisioningOptionsApi } from "./index";

export const useProvisioningOptionsState = () => {
	const { getProvisioningOptions, saveProvisioningOptions } =
		useProvisioningOptionsApi();

	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref();
	const provisioningOptionsData: Ref<ProvisioningOptions> = ref({
		class: true,
		course: false,
		others: false,
	});

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

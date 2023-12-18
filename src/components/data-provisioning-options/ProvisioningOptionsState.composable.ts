import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { ref, Ref } from "vue";
import { ProvisioningOptions, useProvisioningOptionsApi } from "./index";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { useI18n } from "vue-i18n";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

export const useProvisioningOptionsState = () => {
	const { getProvisioningOptions, saveProvisioningOptions } =
		useProvisioningOptionsApi();
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const { t } = useI18n();
	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref();
	const provisioningOptionsData: Ref<ProvisioningOptions> = ref({
		class: true,
		course: false,
		others: false,
	});
	const provisioningOptionsDefaultValues: ProvisioningOptions = {
		class: true,
		course: false,
		others: false,
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
				notifierModule.show({
					text: t("error.load"),
					status: "error",
				});
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
			notifierModule.show({
				text: t("error.generic"),
				status: "error",
			});

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

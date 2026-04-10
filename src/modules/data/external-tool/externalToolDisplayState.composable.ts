import { useExternalToolReferenceApi } from "./externalToolReferenceApi.composable";
import { ExternalToolDisplayData } from "./types";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { Ref, ref } from "vue";

export const useExternalToolDisplayState = () => {
	const { fetchDisplayDataCall } = useExternalToolReferenceApi();

	const displayData: Ref<ExternalToolDisplayData | undefined> = ref();
	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref(undefined);

	const fetchDisplayData = async (contextExternalToolId: string): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			displayData.value = await fetchDisplayDataCall(contextExternalToolId);
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
		displayData,
		isLoading,
		error,
		fetchDisplayData,
	};
};

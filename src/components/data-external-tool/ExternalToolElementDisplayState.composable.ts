import { ExternalToolDisplayData } from "@/store/external-tool";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { ref, Ref } from "vue";
import { useContextExternalToolApi } from "./index";

export const useExternalToolElementDisplayState = () => {
	const { fetchDisplayDataCall } = useContextExternalToolApi();
	const displayData: Ref<ExternalToolDisplayData | undefined> = ref();
	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref(undefined);

	const fetchDisplayData = async (
		contextExternalToolId: string
	): Promise<void> => {
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

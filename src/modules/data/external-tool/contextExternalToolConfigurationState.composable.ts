import { useContextExternalToolApi } from "./contextExternalToolApi.composable";
import { ContextExternalToolConfigurationTemplate } from "./types";
import { ToolContextType } from "@/serverApi/v3";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { Ref, ref } from "vue";

export const useContextExternalToolConfigurationState = () => {
	const { fetchConfigurationTemplateForContextExternalToolCall, fetchAvailableToolsForContextCall } =
		useContextExternalToolApi();

	const availableTools: Ref<ContextExternalToolConfigurationTemplate[]> = ref([]);
	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref(undefined);

	const fetchAvailableToolConfigurationsForContext = async (
		contextId: string,
		contextType: ToolContextType
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			availableTools.value = await fetchAvailableToolsForContextCall(contextId, contextType);
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

	const fetchConfigurationForContextExternalTool = async (contextExternalToolId: string): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			const config = await fetchConfigurationTemplateForContextExternalToolCall(contextExternalToolId);

			availableTools.value = [config];
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
		availableTools,
		isLoading,
		error,
		fetchAvailableToolConfigurationsForContext,
		fetchConfigurationForContextExternalTool,
	};
};

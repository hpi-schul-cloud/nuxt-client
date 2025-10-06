import { useContextExternalToolApi } from "./contextExternalToolApi.composable";
import { useExternalToolReferenceApi } from "./externalToolReferenceApi.composable";
import { ExternalToolDisplayData } from "./types";
import { ToolContextType } from "@/serverApi/v3";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { Ref, ref } from "vue";

export const useExternalToolDisplayListState = () => {
	const { fetchDisplayDataForContext } = useExternalToolReferenceApi();
	const { deleteContextExternalToolCall } = useContextExternalToolApi();

	const displayData: Ref<ExternalToolDisplayData[]> = ref([]);
	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref(undefined);

	const fetchDisplayData = async (contextId: string, contextType: ToolContextType): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			displayData.value = await fetchDisplayDataForContext(contextId, contextType);
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

	const deleteContextExternalTool = async (contextExternalToolId: string): Promise<void> => {
		try {
			await deleteContextExternalToolCall(contextExternalToolId);

			displayData.value = displayData.value.filter(
				(tool: ExternalToolDisplayData) => tool.contextExternalToolId !== contextExternalToolId
			);
		} catch (errorResponse) {
			const apiError = mapAxiosErrorToResponseError(errorResponse);

			error.value = {
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			};
		}
	};

	return {
		displayData,
		isLoading,
		error,
		fetchDisplayData,
		deleteContextExternalTool,
	};
};

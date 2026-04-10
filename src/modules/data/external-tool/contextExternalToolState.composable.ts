import { useContextExternalToolApi } from "./contextExternalToolApi.composable";
import { ContextExternalTool, ContextExternalToolSave } from "./types";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { Ref, ref } from "vue";

export const useContextExternalToolState = () => {
	const {
		fetchContextExternalToolCall,
		createContextExternalToolCall,
		updateContextExternalToolCall,
		deleteContextExternalToolCall,
	} = useContextExternalToolApi();
	const contextExternalTool: Ref<ContextExternalTool | undefined> = ref();
	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref(undefined);

	const fetchContextExternalTool = async (contextExternalToolId: string): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			contextExternalTool.value = await fetchContextExternalToolCall(contextExternalToolId);
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

	const createContextExternalTool = async (
		contextExternalTool: ContextExternalToolSave
	): Promise<ContextExternalTool | undefined> => {
		error.value = undefined;

		try {
			const savedContextExternalTool = await createContextExternalToolCall(contextExternalTool);

			return savedContextExternalTool;
		} catch (errorResponse) {
			const apiError = mapAxiosErrorToResponseError(errorResponse);

			error.value = {
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			};
		}
	};

	const updateContextExternalTool = async (
		contextExternalToolId: string,
		contextExternalTool: ContextExternalToolSave
	): Promise<ContextExternalTool | undefined> => {
		error.value = undefined;

		try {
			const savedContextExternalTool = await updateContextExternalToolCall(contextExternalToolId, contextExternalTool);

			return savedContextExternalTool;
		} catch (errorResponse) {
			const apiError = mapAxiosErrorToResponseError(errorResponse);

			error.value = {
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			};
		}
	};

	const deleteContextExternalTool = async (contextExternalToolId: string): Promise<void> => {
		error.value = undefined;

		try {
			await deleteContextExternalToolCall(contextExternalToolId);
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
		contextExternalTool,
		isLoading,
		error,
		fetchContextExternalTool,
		createContextExternalTool,
		updateContextExternalTool,
		deleteContextExternalTool,
	};
};

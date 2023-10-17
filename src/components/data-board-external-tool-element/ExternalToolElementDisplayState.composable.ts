import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { useContextExternalToolApi } from "@data-external-tool";
import { ref, Ref } from "vue";

export const useExternalToolElementDisplayState = () => {
	const { handleError } = useErrorHandler();
	const { fetchDisplayDataCall } = useContextExternalToolApi();
	const displayData: Ref<ExternalToolDisplayData | undefined> = ref();
	const isLoading: Ref<boolean> = ref(false);

	const fetchDisplayData = async (
		contextExternalToolId: string
	): Promise<void> => {
		isLoading.value = true;

		try {
			displayData.value = await fetchDisplayDataCall(contextExternalToolId);
		} catch (error) {
			handleError(error);
		}

		isLoading.value = false;
	};

	return {
		isLoading,
		displayData,
		fetchDisplayData,
	};
};

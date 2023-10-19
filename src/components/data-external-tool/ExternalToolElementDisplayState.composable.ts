import { ref, Ref } from "vue";
import { ExternalToolDisplayData } from "../../store/external-tool";
import { useErrorHandler } from "../error-handling/ErrorHandler.composable";
import { useContextExternalToolApi } from "./index";

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

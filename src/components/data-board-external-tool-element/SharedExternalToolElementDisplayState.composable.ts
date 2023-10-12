import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ToolContextType } from "@/serverApi/v3";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";
import { useContextExternalToolApi } from "@data-external-tool";
import { ref, Ref } from "vue";

export const useSharedExternalToolElementDisplayState =
	createTestableSharedComposable(() => {
		const { handleError } = useErrorHandler();
		const { fetchDisplayDataCall } = useContextExternalToolApi();
		const displayDataMap: Map<string, Ref<ExternalToolDisplayData[]>> = new Map<
			string,
			Ref<ExternalToolDisplayData[]>
		>();
		const isLoading: Ref<boolean> = ref(false);

		const getDisplayDataList = (
			cardId: string
		): Ref<ExternalToolDisplayData[]> | undefined => {
			const displayDataList: Ref<ExternalToolDisplayData[]> | undefined =
				displayDataMap.get(cardId);

			return displayDataList;
		};

		const fetchDisplayData = async (cardId: string): Promise<void> => {
			isLoading.value = true;

			try {
				let displayDataList: Ref<ExternalToolDisplayData[]> | undefined =
					getDisplayDataList(cardId);

				if (!displayDataList?.value) {
					displayDataList = ref([]);

					displayDataMap.set(cardId, displayDataList);
				}

				displayDataList.value = await fetchDisplayDataCall(
					cardId,
					ToolContextType.BoardCard
				);
			} catch (error) {
				handleError(error);
			}

			isLoading.value = false;
		};

		const findDisplayData = (
			cardId: string,
			contextExternalToolId: string
		): ExternalToolDisplayData | undefined => {
			const displayDataList: Ref<ExternalToolDisplayData[]> | undefined =
				getDisplayDataList(cardId);

			const displayData: ExternalToolDisplayData | undefined =
				displayDataList?.value.find(
					(externalToolDisplayData: ExternalToolDisplayData) =>
						externalToolDisplayData.contextExternalToolId ===
						contextExternalToolId
				);

			return displayData;
		};

		return {
			isLoading,
			getDisplayDataList,
			fetchDisplayData,
			findDisplayData,
		};
	});

import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { ref, onMounted } from "vue";
import { SubmissionItemResponse } from "@/serverApi/v3";

export const useSubmissionContentElementState = (id: string) => {
	const { fetchSubmissionItemsCall } = useSubmissionItemApi();
	const submissionItems = ref<Array<SubmissionItemResponse>>([]);

	const fetchSubmissionItems = async (id: string): Promise<void> => {
		submissionItems.value = await fetchSubmissionItemsCall(id);
	};

	onMounted(() => {
		fetchSubmissionItems(id);
	});

	return {
		submissionItems,
	};
};

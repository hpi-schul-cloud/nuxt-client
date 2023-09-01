import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { ref, onMounted, computed } from "vue";
import { SubmissionItemResponse } from "@/serverApi/v3";

export const useSubmissionContentElementState = (id: string) => {
	const {
		fetchSubmissionItemsCall,
		createSubmissionItemCall,
		updateSubmissionItemCall,
	} = useSubmissionItemApi();
	const submissionItems = ref<Array<SubmissionItemResponse>>([]);

	const fetchSubmissionItems = async (id: string): Promise<void> => {
		submissionItems.value = await fetchSubmissionItemsCall(id);
	};

	const createSubmissionItem = async (completed: boolean) => {
		createSubmissionItemCall(id, completed);
	};

	const updateSubmissionItem = async (completed: boolean) => {
		if (submissionItems.value.length === 0) {
			createSubmissionItem(completed);
			return;
		}
		updateSubmissionItemCall(submissionItems.value[0].id, completed);
	};

	const completed = computed(() => {
		if (submissionItems.value.length === 0) {
			return false;
		}

		return submissionItems.value[0].completed;
	});

	onMounted(() => {
		fetchSubmissionItems(id);
	});

	return {
		submissionItems,
		updateSubmissionItem,
		completed,
	};
};

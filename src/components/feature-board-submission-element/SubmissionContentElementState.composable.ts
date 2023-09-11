import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ref, onMounted } from "vue";
import { SubmissionItemResponse } from "@/serverApi/v3";

export const useSubmissionContentElementState = (id: string) => {
	const { notifyWithTemplate } = useErrorHandler();
	const {
		fetchSubmissionItemsCall,
		createSubmissionItemCall,
		updateSubmissionItemCall,
	} = useSubmissionItemApi();
	const submissionItems = ref<Array<SubmissionItemResponse>>([]);
	const loading = ref(true);

	const fetchSubmissionItems = async (id: string): Promise<void> => {
		try {
			submissionItems.value = await fetchSubmissionItemsCall(id);
		} catch (error) {
			notifyWithTemplate("notLoaded", "boardElement")();
		} finally {
			loading.value = false;
		}
	};

	const createSubmissionItem = async (completed: boolean) => {
		try {
			const response = await createSubmissionItemCall(id, completed);
			submissionItems.value.push(response);
		} catch (error) {
			notifyWithTemplate("notCreated", "boardElement")();
		}
	};

	const updateSubmissionItem = async (completed: boolean) => {
		if (submissionItems.value.length === 0) {
			await createSubmissionItem(completed);
			return;
		}

		try {
			await updateSubmissionItemCall(submissionItems.value[0].id, completed);
			submissionItems.value[0].completed = completed;
		} catch (error) {
			notifyWithTemplate("notUpdated", "boardElement")();
		}
	};

	onMounted(() => {
		fetchSubmissionItems(id);
	});

	return {
		submissionItems,
		fetchSubmissionItems,
		updateSubmissionItem,
		loading,
	};
};

import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ref, computed, onMounted } from "vue";
import { SubmissionsResponse } from "@/serverApi/v3";
import dayjs from "dayjs";

export const useSubmissionContentElementState = (
	id: string,
	dueDate: string
) => {
	const { notifyWithTemplate } = useErrorHandler();
	const {
		fetchSubmissionItemsCall,
		createSubmissionItemCall,
		updateSubmissionItemCall,
	} = useSubmissionItemApi();
	const submissionItems = ref<SubmissionsResponse>();
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
		// try {
		// 	const response = await createSubmissionItemCall(id, completed);
		// 	submissionItems.value.submissionItemsResponse.push(response);
		// } catch (error) {
		// 	notifyWithTemplate("notCreated", "boardElement")();
		// }
	};

	const updateSubmissionItem = async (completed: boolean) => {
		// if (submissionItems.value.submissionItemsResponse.length === 0) {
		// 	await createSubmissionItem(completed);
		// 	return;
		// }
		// try {
		// 	await updateSubmissionItemCall(
		// 		submissionItems.value.submissionItemsResponse[0].id,
		// 		completed
		// 	);
		// 	submissionItems.value.submissionItemsResponse[0].completed = completed;
		// } catch (error) {
		// 	notifyWithTemplate("notUpdated", "boardElement")();
		// }
	};

	const editable = computed(() => {
		const today = dayjs();
		return today.isBefore(dueDate);
	});

	onMounted(() => {
		fetchSubmissionItems(id);
	});

	return {
		submissionItems,
		fetchSubmissionItems,
		updateSubmissionItem,
		loading,
		editable,
	};
};

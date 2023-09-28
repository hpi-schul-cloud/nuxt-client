import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ref, computed, onMounted } from "vue";
import {
	SubmissionsResponse,
	SubmissionItemResponse,
	UserDataResponse,
} from "@/serverApi/v3";

export const useSubmissionContentElementState = (
	id: string,
	elements: Array<SubmissionItemResponse>,
	users: Array<UserDataResponse>,
	dueDate?: string
) => {
	const { notifyWithTemplate } = useErrorHandler();
	const {
		fetchSubmissionItemsCall,
		createSubmissionItemCall,
		updateSubmissionItemCall,
	} = useSubmissionItemApi();
	const submissions = ref<SubmissionsResponse>({
		submissionItemsResponse: [],
		users: [],
	});
	const loading = ref(true);

	submissions.value = {
		submissionItemsResponse: elements,
		users: users,
	};
	loading.value = false;

	const fetchSubmissionItems = async (id: string): Promise<void> => {
		try {
			submissions.value = await fetchSubmissionItemsCall(id);
		} catch (error) {
			notifyWithTemplate("notLoaded", "boardElement")();
		} finally {
			loading.value = false;
		}
	};

	const createSubmissionItem = async (completed: boolean) => {
		try {
			const response = await createSubmissionItemCall(id, completed);
			submissions.value.submissionItemsResponse.push(response);
		} catch (error) {
			notifyWithTemplate("notCreated", "boardElement")();
		}
	};

	const updateSubmissionItem = async (completed: boolean) => {
		if (submissions.value.submissionItemsResponse.length === 0) {
			await createSubmissionItem(completed);
			return;
		}
		try {
			// todo handle this like every other elements content change
			// remove endpoint from API!
			await updateSubmissionItemCall(
				submissions.value.submissionItemsResponse[0].id,
				completed
			);
			submissions.value.submissionItemsResponse[0].completed = completed;
		} catch (error) {
			notifyWithTemplate("notUpdated", "boardElement")();
		}
	};

	const editable = computed(() => {
		return !dueDate || new Date() < new Date(dueDate);
	});

	onMounted(() => {
		// fetchSubmissionItems(id);
	});

	return {
		submissions,
		fetchSubmissionItems,
		updateSubmissionItem,
		loading,
		editable,
	};
};

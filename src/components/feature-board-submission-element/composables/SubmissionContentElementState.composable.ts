import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ref, computed } from "vue";
import {
	SubmissionsResponse,
	SubmissionItemResponse,
	UserDataResponse,
} from "@/serverApi/v3";

export const useSubmissionContentElementState = (
	id: string,
	submissionItems: Array<SubmissionItemResponse>,
	users: Array<UserDataResponse>,
	dueDate?: string
) => {
	const { notifyWithTemplate } = useErrorHandler();
	const { createSubmissionItemCall, updateSubmissionItemCall } =
		useSubmissionItemApi();
	const submissions = ref<SubmissionsResponse>({
		submissionItemsResponse: submissionItems,
		users: users,
	});

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

	return {
		submissions,
		updateSubmissionItem,
		editable,
	};
};

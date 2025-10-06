import {
	BoardElementApiFactory,
	BoardSubmissionApiFactory,
	SubmissionItemResponse,
	SubmissionsResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useSubmissionItemApi = () => {
	const elementApi = BoardElementApiFactory(undefined, "/v3", $axios);
	const submissionItemApi = BoardSubmissionApiFactory(undefined, "/v3", $axios);

	const createSubmissionItemCall = async (
		submissionContainerId: string,
		completed: boolean
	): Promise<SubmissionItemResponse> => {
		const response = await elementApi.elementControllerCreateSubmissionItem(submissionContainerId, {
			completed: completed,
		});
		return response.data;
	};

	const updateSubmissionItemCall = async (submissionItemId: string, completed: boolean) =>
		await submissionItemApi.boardSubmissionControllerUpdateSubmissionItem(submissionItemId, { completed: completed });

	const fetchSubmissionItemsCall = async (submissionContainerId: string): Promise<SubmissionsResponse> => {
		const response = await submissionItemApi.boardSubmissionControllerGetSubmissionItems(submissionContainerId);
		return response.data;
	};

	return {
		createSubmissionItemCall,
		fetchSubmissionItemsCall,
		updateSubmissionItemCall,
	};
};

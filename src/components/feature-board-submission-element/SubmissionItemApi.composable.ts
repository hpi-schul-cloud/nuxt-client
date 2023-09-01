import {
	BoardElementApiFactory,
	BoardSubmissionApiFactory,
	SubmissionItemResponse,
} from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";

export const useSubmissionItemApi = () => {
	const elementApi = BoardElementApiFactory(undefined, "/v3", $axios);
	const submissionItemApi = BoardSubmissionApiFactory(undefined, "/v3", $axios);

	const createSubmissionItemCall = async (
		submissionContainerId: string,
		completed: boolean
	): Promise<SubmissionItemResponse> => {
		try {
			const response = await elementApi.elementControllerCreateSubmissionItem(
				submissionContainerId,
				{ completed: completed }
			);
			return response.data;
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);
			throw createApplicationError(responseError.code);
		}
	};

	const updateSubmissionItemCall = async (
		submissionItemId: string,
		completed: boolean
	) => {
		return await submissionItemApi.boardSubmissionControllerUpdateSubmissionItem(
			submissionItemId,
			{ completed: completed }
		);
	};

	const fetchSubmissionItemsCall = async (
		submissionContainerId: string
	): Promise<Array<SubmissionItemResponse>> => {
		try {
			const response =
				await submissionItemApi.boardSubmissionControllerGetSubmissionItems(
					submissionContainerId
				);
			return response.data;
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);
			throw createApplicationError(responseError.code);
		}
	};

	return {
		createSubmissionItemCall,
		fetchSubmissionItemsCall,
		updateSubmissionItemCall,
	};
};

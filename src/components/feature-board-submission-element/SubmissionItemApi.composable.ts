import {
	BoardElementApiFactory,
	BoardSubmissionApiFactory,
	CreateSubmissionItemBodyParams,
	SubmissionItemResponse,
} from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { useBoardNotifier } from "@util-board";

export const useSubmissionItemApi = () => {
	const { isErrorCode, showFailure, generateErrorText } = useBoardNotifier();
	const elementApi = BoardElementApiFactory(undefined, "/v3", $axios);
	const submissionItemApi = BoardSubmissionApiFactory(undefined, "/v3", $axios);

	const createSubmissionItem = async (submissionContainerId: string) => {
		const params: CreateSubmissionItemBodyParams = { completed: false };
		const response = await elementApi.elementControllerCreateSubmission(
			submissionContainerId,
			params
		);
		if (isErrorCode(response.status)) {
			await showErrorAndReload(generateErrorText("create", "boardElement"));
			return;
		}

		return response.data;
	};

	const updateSubmissionItem = async (submissionContainerId: string) => {
		// TODO
		console.log("implement something useful " + submissionContainerId);
	};

	const getSubmissionItems = async (
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

	const showErrorAndReload = async (errorText: string | undefined) => {
		showFailure(errorText);
	};

	return {
		createSubmissionItem,
		updateSubmissionItem,
		getSubmissionItems,
	};
};

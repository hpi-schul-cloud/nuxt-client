import { useSubmissionItemApi } from "./SubmissionItemApi.composable";

export const useSubmissionItemState = () => {
	const { createSubmissionItemCall, updateSubmissionItemCall } =
		useSubmissionItemApi();

	const createSubmissionItem = async () => {
		console.log("createSubmissionItem");
	};

	const updateSubmissionItem = async () => {
		console.log("getSubmissionItems");
	};

	return {
		createSubmissionItem,
		updateSubmissionItem,
	};
};

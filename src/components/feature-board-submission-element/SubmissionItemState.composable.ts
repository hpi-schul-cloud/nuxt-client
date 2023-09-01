import { useSubmissionItemApi } from "./SubmissionItemApi.composable";

export const useSubmissionItemState = (id: string) => {
	const {
		createSubmissionItemCall,
		fetchSubmissionItemsCall,
		updateSubmissionItemCall,
	} = useSubmissionItemApi();

	const createSubmissionItem = async () => {
		console.log("createSubmissionItem");
	};

	const getSubmissionItems = async () => {
		console.log("getSubmissionItems");
	};

	const updateSubmissionItem = async () => {
		console.log("getSubmissionItems");
	};

	return {
		createSubmissionItem,
		getSubmissionItems,
		updateSubmissionItem,
	};
};

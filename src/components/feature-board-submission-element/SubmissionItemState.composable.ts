import { useSubmissionItemApi } from "./SubmissionItemApi.composable";

export const useSubmissionItemState = () => {
	const {
		createSubmissionItemCall,
		fetchSubmissionItemsCall,
		updateSubmissionItemCall,
	} = useSubmissionItemApi();

	const updateSubmissionItem = async (columnId: string, newTitle: string) => {
		// if (board.value === undefined) return;
		// try {
		// 	await updateSubmissionItemCall();
		// 	const columnIndex = getColumnIndex(columnId);
		// 	if (columnIndex > -1) {
		// 		board.value.columns[columnIndex].title = newTitle;
		// 	}
		// } catch (error) {
		// 	handleError(error, {
		// 		404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
		// 	});
		// }
		return "todo";
	};

	return {
		updateSubmissionItem,
	};
};

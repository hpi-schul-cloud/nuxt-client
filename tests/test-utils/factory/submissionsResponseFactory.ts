import { SubmissionsResponse, SubmissionItemResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { submissionItemResponseFactory } from "./submissionItemResponseFactory";
import { userDataResponseFactory } from "./userDataResponseFactory";

type TransientParams = {
	numberOfSubmissionItems: number;
	numberOfUsers: number;
	completed: boolean;
};

export const submissionsResponseFactory = Factory.define<
	SubmissionsResponse,
	TransientParams
>(({ transientParams }) => {
	const {
		numberOfSubmissionItems = 1,
		numberOfUsers = 1,
		completed = true,
	} = transientParams;

	const users = userDataResponseFactory.buildList(numberOfUsers);
	const submissionItemsResponse: Array<SubmissionItemResponse> = [];

	let count = 0;
	while (count < numberOfSubmissionItems) {
		const userId =
			count < numberOfUsers ? users[count].userId : "unmappedUserId";
		submissionItemsResponse.push(
			submissionItemResponseFactory.build({
				userId: userId,
				completed: completed,
			})
		);
		count++;
	}

	return {
		submissionItemsResponse: submissionItemsResponse,
		users: users,
	};
});

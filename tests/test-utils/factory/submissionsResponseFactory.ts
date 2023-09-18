import { SubmissionsResponse, SubmissionItemResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import {
	submissionItemResponseFactory,
	userDataResponseFactory,
} from "@@/tests/test-utils";

type TransientParams = {
	numSubmissionItems: number;
	numUsers: number;
	completed: boolean;
};

export const submissionsResponseFactory = Factory.define<
	SubmissionsResponse,
	TransientParams
>(({ transientParams }) => {
	const {
		numSubmissionItems = 1,
		numUsers = 1,
		completed = true,
	} = transientParams;

	const users = userDataResponseFactory.buildList(numUsers);
	const submissionItemsResponse: Array<SubmissionItemResponse> = [];

	let c = 0;
	while (c < numSubmissionItems) {
		const userId = c < numUsers ? users[c].userId : "unmappedUserId";
		submissionItemsResponse.push(
			submissionItemResponseFactory.build({
				userId: userId,
				completed: completed,
			})
		);
		c++;
	}

	return {
		submissionItemsResponse: submissionItemsResponse,
		users: users,
	};
});

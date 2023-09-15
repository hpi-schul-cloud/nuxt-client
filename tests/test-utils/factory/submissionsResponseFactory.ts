import { SubmissionsResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import {
	submissionItemResponseFactory,
	userDataResponseFactory,
} from "@@/tests/test-utils";

export const submissionsResponseFactory = Factory.define<SubmissionsResponse>(
	() => ({
		submissionItemsResponse: [
			submissionItemResponseFactory.build({ userId: "userId1" }),
			submissionItemResponseFactory.build({ userId: "userId2" }),
		],
		users: [
			userDataResponseFactory.build({ userId: "userId1" }),
			userDataResponseFactory.build({ userId: "userId2" }),
			userDataResponseFactory.build({ userId: "userId3" }),
		],
	})
);

import { SubmissionItemResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "@@/tests/test-utils/factory";
import { userDataResponseFactory } from "@@/tests/test-utils/factory";

export const submissionItemResponseFactory =
	Factory.define<SubmissionItemResponse>(({ sequence }) => ({
		id: `id${sequence}`,
		userData: userDataResponseFactory.build(),
		completed: true,
		timestamps: timestampsResponseFactory.build(),
	}));

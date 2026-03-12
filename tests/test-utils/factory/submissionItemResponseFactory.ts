import { SubmissionItemResponse } from "@api-server";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "./timestampsResponseFactory";

export const submissionItemResponseFactory =
	Factory.define<SubmissionItemResponse>(({ sequence }) => ({
		id: `id${sequence}`,
		userId: `userId${sequence}`,
		completed: true,
		timestamps: timestampsResponseFactory.build(),
		elements: [],
	}));

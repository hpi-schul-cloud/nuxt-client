import { SubmissionItemResponse } from "@/serverApi/v3";
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

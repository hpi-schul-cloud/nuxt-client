import {
	ContentElementType,
	SubmissionContainerElementResponse,
} from "@api-server";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { submissionContainerElementContent } from "./submissionContainerElementContentFactory";

export const submissionContainerElementResponseFactory =
	Factory.define<SubmissionContainerElementResponse>(({ sequence }) => ({
		id: `submissionContainerElementResponse${sequence}`,
		type: ContentElementType.SUBMISSION_CONTAINER,
		content: submissionContainerElementContent.build(),
		timestamps: timestampsResponseFactory.build(),
	}));

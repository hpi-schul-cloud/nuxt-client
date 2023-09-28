import {
	ContentElementType,
	SubmissionContainerElementResponse,
} from "@/serverApi/v3";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "@@/tests/test-utils/factory";
import { submissionContainerElementContent } from "./submissionContainerElementContentFactory";

export const submissionContainerElementResponseFactory =
	Factory.define<SubmissionContainerElementResponse>(({ sequence }) => ({
		id: `submissionContainerElementResponse${sequence}`,
		type: ContentElementType.SubmissionContainer,
		content: submissionContainerElementContent.build(),
		timestamps: timestampsResponseFactory.build(),
		users: [],
		elements: [],
	}));

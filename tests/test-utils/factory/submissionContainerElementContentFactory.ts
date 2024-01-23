import { SubmissionContainerElementContent } from "@/serverApi/v3";
import { Factory } from "fishery";

const oneDayinMilliseconds = 24 * 60 * 60 * 1000;

export const submissionContainerElementContent =
	Factory.define<SubmissionContainerElementContent>(() => ({
		dueDate: new Date(Date.now() + oneDayinMilliseconds).toISOString(),
	}));

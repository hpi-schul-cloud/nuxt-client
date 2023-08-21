import {
	FileElementResponse,
	RichTextElementResponse,
	SubmissionContainerElementResponse,
} from "@/serverApi/v3";

export type AnyContentElement =
	| RichTextElementResponse
	| FileElementResponse
	| SubmissionContainerElementResponse;

import {
	ExternalToolElementResponse,
	FileElementResponse,
	RichTextElementResponse,
	SubmissionContainerElementResponse,
	SubmissionItemResponse,
} from "@/serverApi/v3";

export type AnyContentElement =
	| RichTextElementResponse
	| FileElementResponse
	| SubmissionContainerElementResponse
	| SubmissionItemResponse
	| ExternalToolElementResponse;

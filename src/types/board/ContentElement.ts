import {
	ExternalToolElementResponse,
	FileElementResponse,
	RichTextElementResponse,
	SubmissionContainerElementResponse,
	LinkElementResponse,
} from "@/serverApi/v3";

export type AnyContentElement =
	| LinkElementResponse
	| RichTextElementResponse
	| FileElementResponse
	| SubmissionContainerElementResponse
	| ExternalToolElementResponse;

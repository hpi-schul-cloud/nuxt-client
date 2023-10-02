import {
	FileElementResponse,
	RichTextElementResponse,
	SubmissionContainerElementResponse,
	DrawingElementResponse,
	ExternalToolElementResponse,
} from "@/serverApi/v3";

export type AnyContentElement =
	| RichTextElementResponse
	| FileElementResponse
	|DrawingElementResponse
	| SubmissionContainerElementResponse
	| ExternalToolElementResponse;

import {
	ExternalToolElementResponse,
	FileElementResponse,
	RichTextElementResponse,
	SubmissionContainerElementResponse,
	DrawingElementResponse,
} from "@/serverApi/v3";

export type AnyContentElement =
	| RichTextElementResponse
	| FileElementResponse
	| SubmissionContainerElementResponse
	| ExternalToolElementResponse
	| DrawingElementResponse;

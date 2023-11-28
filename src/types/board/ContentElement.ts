import {
	ExternalToolElementResponse,
	FileElementResponse,
	LearnstoreElementResponse,
	LinkElementResponse,
	RichTextElementResponse,
	SubmissionContainerElementResponse,
	DrawingElementResponse,
} from "@/serverApi/v3";

export type AnyContentElement =
	| LinkElementResponse
	| RichTextElementResponse
	| FileElementResponse
	| SubmissionContainerElementResponse
	| ExternalToolElementResponse
	| DrawingElementResponse
	| LearnstoreElementResponse;

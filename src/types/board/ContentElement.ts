import {
	CollaborativeTextEditorElementResponse,
	DrawingElementResponse,
	ExternalToolElementResponse,
	FileElementResponse,
	LinkElementResponse,
	PlaceholderElementResponse,
	RichTextElementResponse,
	SubmissionContainerElementResponse,
} from "@/serverApi/v3";

export type AnyContentElement =
	| LinkElementResponse
	| RichTextElementResponse
	| FileElementResponse
	| SubmissionContainerElementResponse
	| ExternalToolElementResponse
	| DrawingElementResponse
	| CollaborativeTextEditorElementResponse
	| PlaceholderElementResponse;

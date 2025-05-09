import {
	ParentNodeInfoResponse,
	CollaborativeTextEditorElementResponse,
	ContentElementType,
	DrawingElementResponse,
	ExternalToolElementResponse,
	FileElementResponse,
	FileFolderElementResponse,
	LinkElementResponse,
	ParentNodeType,
	RichTextElementResponse,
	SubmissionContainerElementResponse,
	VideoConferenceElementResponse,
} from "@/serverApi/v3";

export type FileFolderElement = FileFolderElementResponse;

export type AnyContentElement =
	| LinkElementResponse
	| RichTextElementResponse
	| FileElementResponse
	| FileFolderElementResponse
	| SubmissionContainerElementResponse
	| ExternalToolElementResponse
	| DrawingElementResponse
	| CollaborativeTextEditorElementResponse
	| VideoConferenceElementResponse;

export type ParentNodeInfo = ParentNodeInfoResponse;

export { ContentElementType, ParentNodeType };

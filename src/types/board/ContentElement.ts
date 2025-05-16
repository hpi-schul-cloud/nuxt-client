import {
	CollaborativeTextEditorElementResponse,
	ContentElementType,
	DrawingElementResponse,
	ExternalToolElementResponse,
	FileElementResponse,
	FileFolderElementResponse,
	H5pElementResponse,
	LinkElementResponse,
	ParentNodeInfoResponse,
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
	| VideoConferenceElementResponse
	| H5pElementResponse;

export type ParentNodeInfo = ParentNodeInfoResponse;

export { ContentElementType, ParentNodeType };

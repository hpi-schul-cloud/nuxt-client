import {
	ContentElementType,
	FileElementResponse,
	RichTextElementResponse,
	SubmissionContainerElementResponse,
} from "@/serverApi/v3";

// WIP
export interface LinkElementResponse {
	id: string;
	type: ContentElementType.Link;
	content: {
		url: string;
	};
	timestamps: unknown;
}

export type AnyContentElement =
	| LinkElementResponse
	| RichTextElementResponse
	| FileElementResponse
	| SubmissionContainerElementResponse;

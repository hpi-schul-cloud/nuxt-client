import { FileElementResponse, RichTextElementResponse } from "@/serverApi/v3";
import { type SubmissionElementResponse } from "@/components/feature-board/content-elements/SubmissionContentElement.vue";

export type AnyContentElement =
	| FileElementResponse
	| RichTextElementResponse
	| SubmissionElementResponse;

import { FileElementResponse, RichTextElementResponse } from "@/serverApi/v3";

export type AnyContentElement = RichTextElementResponse | FileElementResponse;

export type DeleteElementEventPayload = {
	elementId: string;
	name: string;
};

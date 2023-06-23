import { FileElementResponse, RichTextElementResponse } from "@/serverApi/v3";

export type AnyContentElement =
	| (RichTextElementResponse & { focusOnCreate?: boolean })
	| FileElementResponse;

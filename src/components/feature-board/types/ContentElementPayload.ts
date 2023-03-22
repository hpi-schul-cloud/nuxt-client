import { ContentElementType } from "./ContentElement";

export type AnyContentElementPayload =
	| TextContentElementPayload
	| ImageContentElementPayload;

interface ContentElementPayload {
	type: ContentElementType;
	content: object;

	// no timestamps!
}

export interface TextContentElementPayload extends ContentElementPayload {
	type: "text";
	content: {
		text: string;
	};
}

export interface ImageContentElementPayload extends ContentElementPayload {
	type: "image";
	content: {
		image: string;
	};
}

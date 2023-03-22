export declare type ContentElementType = "text" | "title" | "image" | "task";

export declare type AnyContentElement =
	| TextContentElement
	| ImageContentElement;

interface ContentElement {
	id: string;
	type: ContentElementType;
	content: object;
}

export interface TextContentElement extends ContentElement {
	type: "text";
	content: {
		text: string;
	};
}
export interface ImageContentElement extends ContentElement {
	type: "image";
	content: {
		image: string;
	};
}

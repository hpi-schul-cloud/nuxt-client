export enum ContentElementType {
	TEXT = "text",
	IMAGE = "image",
}

export type AnyContentElement = TextContentElement | ImageContentElement;

interface ContentElement {
	id: string;
	type: ContentElementType;
	content: object;
}

export interface TextContentElement extends ContentElement {
	type: ContentElementType.TEXT;
	content: {
		text: string;
	};
}
export interface ImageContentElement extends ContentElement {
	type: ContentElementType.IMAGE;
	content: {
		image: string;
	};
}

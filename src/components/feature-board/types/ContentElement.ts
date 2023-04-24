export enum ContentElementType {
	TEXT = "text",
	FILE = "file",
}

export type AnyContentElement = TextContentElement | FileContentElement;

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
export interface FileContentElement extends ContentElement {
	type: ContentElementType.file;
	content: {
		caption: string;
	};
}

export enum ContentElementType {
	TEXT = "text",
	RICH_TEXT = "rich_text",
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

export interface RichTextContentElement extends ContentElement {
	type: ContentElementType.RICH_TEXT;
	content: {
		text: string;
	};
}

export interface FileContentElement extends ContentElement {
	type: ContentElementType.FILE;
	content: {
		caption: string;
	};
}

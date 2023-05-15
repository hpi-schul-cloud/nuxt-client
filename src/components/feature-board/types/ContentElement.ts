export enum ContentElementType {
	TEXT = "text",
	RICH_TEXT = "rich_text",
	FILE = "file",
}

export type AnyContentElement = RichTextContentElement | FileContentElement;

interface ContentElement {
	id: string;
	type: ContentElementType;
	content: object;
}

export interface RichTextContentElement extends ContentElement {
	type: ContentElementType.TEXT; // TODO - adjust this after backend renamed
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

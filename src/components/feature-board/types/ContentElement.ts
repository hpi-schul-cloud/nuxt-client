export enum ContentElementType {
	TEXT = "text",
	RICH_TEXT = "richtext",
	FILE = "file",
}

export type AnyContentElement = RichTextContentElement | FileContentElement;

interface ContentElement {
	id: string;
	type: ContentElementType;
	content: object;
}

export interface RichTextContentElement extends ContentElement {
	type: ContentElementType.RICH_TEXT;
	content: {
		text: string;
		inputFormat: "richtext_ck5";
	};
}

export interface FileContentElement extends ContentElement {
	type: ContentElementType.FILE;
	content: {
		caption: string;
	};
}

export declare type ContentElementType = "text" | "title" | "image" | "task";

export interface ContentElement {
	id: string;
	elementType: ContentElementType;
}

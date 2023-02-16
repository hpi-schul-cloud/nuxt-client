export declare type ContentElementType =
	| "legacy-lesson"
	| "legacy-task"
	| "text"
	| "title"
	| "image"
	| "task";

export interface ContentElement {
	id: string;
	elementType: ContentElementType;
}

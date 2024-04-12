export interface IMediaBoardElement {
	id: string;

	title: string;

	description?: string;

	thumbnail?: string;
}

export interface IMediaBoardLine {
	id: string;

	title: string;

	elements: IMediaBoardElement[];

	isPrimary: boolean;
}

export interface IMediaBoard {
	id: string;

	lines: IMediaBoardLine[];
}

export interface LineMove {
	lineId: string;
	oldLineIndex: number;
	newLineIndex: number;
}

export interface ElementMove {
	elementId: string;
	oldElementIndex: number;
	newElementIndex: number;
	fromLineId: string;
	toLineId?: string;
}

export interface ElementCreate {
	oldElementIndex: number;
	newElementIndex: number;
	toLineId?: string;
}

export const availableMediaLineId = "available-media-line";

export interface IMediaBoardElement {
	id: string;

	title: string;

	description?: string;

	thumbnailUrl?: string;
}

export interface IMediaBoardLine {
	id: string;

	title: string;

	elements: IMediaBoardElement[];
}

export interface IMediaBoard {
	id: string;

	lines: IMediaBoardLine[];
}

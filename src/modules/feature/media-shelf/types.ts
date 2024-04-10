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

	color: string;

	gridMode: boolean;
}

export interface IMediaBoard {
	id: string;

	lines: IMediaBoardLine[];
}

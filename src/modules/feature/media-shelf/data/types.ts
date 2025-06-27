export interface MediaElementDisplay {
	title: string;
	domain: string;
	description?: string;
	thumbnail?: string;
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
	schoolExternalToolId: string;
}

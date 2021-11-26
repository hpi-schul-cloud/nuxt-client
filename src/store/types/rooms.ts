export type RoomsData = {
	id: string;
	title: string;
	shortTitle: string;
	displayColor: string;
	xPosition: number;
	yPosition: number;
};

export type DroppedObject = {
	from: {
		x: number;
		y: number;
		groupIndex?: number;
	};
	to: {
		x: number;
		y: number;
	};
	item: object;
};

export type AllElementsObject = {
	id: string;
	title: string;
	shortTitle: string;
	displayColor: string;
};

export type AllElements = Array<AllElementsObject>;

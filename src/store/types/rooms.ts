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

export type ListItemsObject = {
	id: string;
	title: string;
	shortTitle: string;
	displayColor: string;
	startDate?: string;
	untilDate?: string;
	searchText?: string;
	href?: string;
	to?: string;
};

export type AllItems = Array<ListItemsObject>;

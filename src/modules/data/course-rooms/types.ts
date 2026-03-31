export type ItemType = {
	id: string;
	title: string;
	shortTitle: string;
	displayColor: string;
	xPosition: number;
	yPosition: number;
	to: string;
};

export type GroupDataType = {
	title: string;
	shortTitle: string;
	displayColor: string;
	xPosition: number;
	yPosition: number;
	groupId: string;
	groupElements: ItemType[];
	isSynchronized: boolean;
	to: string;
};

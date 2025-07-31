import { DashboardGridElementResponse } from "@/serverApi/v3";

export type RoomsData = {
	id: string;
	title: string;
	shortTitle: string;
	displayColor: string;
	xPosition: number;
	yPosition: number;
	isSynchronized: boolean;
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
	item: DashboardGridElementResponse;
};

export type ListItemsObject = {
	id: string;
	title: string;
	isLocked: boolean;
	shortTitle: string;
	displayColor: string;
	startDate?: string;
	untilDate?: string;
	searchText?: string;
	href?: string;
	to?: string;
};

export type SharingCourseObject = {
	code: string;
	courseName: string;
	status: string;
	message: string;
};

export type AllItems = Array<ListItemsObject>;

export type ImportDestinationItem = {
	id: string;
	name: string;
};

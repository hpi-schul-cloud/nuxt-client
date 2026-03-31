import { Factory } from "fishery";

// Type for room store data elements (matches DashboardGridElementResponse with optional 'to' for routing)
export type RoomStoreDataElement = {
	id?: string;
	groupId?: string;
	title: string;
	shortTitle: string;
	displayColor: string;
	xPosition: number;
	yPosition: number;
	to?: string;
	groupElements?: RoomStoreGroupElement[];
};

export type RoomStoreGroupElement = {
	id: string;
	title: string;
	displayColor: string;
	to?: string;
};

export const roomStoreGroupElementFactory = Factory.define<RoomStoreGroupElement>(({ sequence }) => ({
	id: `${sequence}`,
	title: `Sub Element ${sequence}`,
	displayColor: "#54616e",
	to: `/rooms/${sequence}`,
}));

export const roomStoreDataFactory = Factory.define<RoomStoreDataElement>(({ sequence }) => ({
	id: `${sequence}`,
	title: `Room ${sequence}`,
	shortTitle: `R${sequence}`,
	displayColor: "#54616e",
	xPosition: sequence - 1,
	yPosition: sequence - 1,
	to: `/rooms/${sequence}`,
}));

export const roomStoreGroupFactory = Factory.define<RoomStoreDataElement>(({ sequence }) => ({
	groupId: `${sequence}`,
	title: `Group ${sequence}`,
	shortTitle: `G${sequence}`,
	displayColor: "#EC407A",
	xPosition: sequence,
	yPosition: sequence,
	groupElements: roomStoreGroupElementFactory.buildList(3),
}));

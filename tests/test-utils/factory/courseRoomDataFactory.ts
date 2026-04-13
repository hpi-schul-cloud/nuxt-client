import type { DashboardGridElementResponse, DashboardGridSubElementResponse } from "@api-server";
import { Factory } from "fishery";

type SubElementWithRoute = DashboardGridSubElementResponse & { to?: string };

/**
 * Extended element type with optional UI routing field and extended sub-elements.
 */
type SingleRoomElement = Omit<DashboardGridElementResponse, "groupId" | "groupElements"> & { to?: string };

/**
 * Extended group element type with processed sub-elements.
 */
type GroupElement = DashboardGridElementResponse & {
	to?: string;
	groupElements: SubElementWithRoute[];
};

/**
 * Factory for creating DashboardGridSubElementResponse items with optional `to` for routing.
 */
export const courseRoomSubElementFactory = Factory.define<SubElementWithRoute>(({ sequence }) => ({
	id: `${sequence}`,
	title: `Group Element ${sequence}`,
	shortTitle: `GE${sequence}`,
	displayColor: "#54616e",
	isLocked: false,
	to: `/rooms/${sequence}`,
}));

/**
 * Factory for creating single room elements (non-grouped).
 */
export const courseRoomElementFactory = Factory.define<SingleRoomElement>(({ sequence }) => ({
	id: `${sequence}`,
	title: `Room ${sequence}`,
	shortTitle: `R${sequence}`,
	displayColor: "#54616e",
	xPosition: sequence,
	yPosition: sequence,
	copyingSince: "",
	isSynchronized: false,
	isLocked: false,
	to: `/rooms/${sequence}`,
}));

/**
 * Factory for creating grouped DashboardGridElementResponse items.
 */
export const courseRoomGroupFactory = Factory.define<GroupElement>(({ sequence }) => ({
	id: `group-${sequence}`,
	title: `Group ${sequence}`,
	shortTitle: `G${sequence}`,
	displayColor: "#EC407A",
	xPosition: sequence,
	yPosition: sequence,
	groupId: `${sequence}`,
	groupElements: courseRoomSubElementFactory.buildList(3),
	copyingSince: "",
	isSynchronized: false,
	isLocked: false,
	to: `/rooms/group-${sequence}`,
}));

import type { GroupDataType, ItemType } from "@data-course-rooms";
import { Factory } from "fishery";

export const courseRoomElementFactory = Factory.define<ItemType>(({ sequence }) => ({
	id: `${sequence}`,
	title: `Group Element ${sequence}`,
	shortTitle: `GE${sequence}`,
	displayColor: "#54616e",
	xPosition: sequence,
	yPosition: sequence,
	to: `/rooms/${sequence}`,
}));

export const courseRoomGroupFactory = Factory.define<Omit<GroupDataType, "isSynchronized" | "to">>(({ sequence }) => ({
	groupId: `${sequence}`,
	title: `Group ${sequence}`,
	shortTitle: `G${sequence}`,
	displayColor: "#EC407A",
	xPosition: sequence,
	yPosition: sequence,
	groupElements: courseRoomElementFactory.buildList(3),
}));

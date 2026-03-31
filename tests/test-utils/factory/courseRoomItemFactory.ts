import { ListItemsObject } from "@/store/types/rooms";
import { Factory } from "fishery";

// Extended type for processed room data (ListItemsObject + additional properties from processAllElements)
export type ProcessedRoomItem = ListItemsObject & {
	titleDate?: string;
	isArchived?: boolean;
};

export const processedRoomItemFactory = Factory.define<ProcessedRoomItem>(({ sequence }) => ({
	id: `room-${sequence}`,
	title: `Course ${sequence}`,
	shortTitle: `C${sequence}`,
	displayColor: "#54616e",
	startDate: "2019-12-07T23:00:00.000Z",
	untilDate: "2020-12-16T23:00:00.000Z",
	titleDate: "2019/20",
	searchText: `Course ${sequence} 2019/20`,
	isArchived: true,
	to: `/rooms/room-${sequence}`,
	isLocked: false,
}));

import { RoomItemResponseAllowedOperations } from "@/serverApi/v3";
import { RoomColor, RoomItem } from "@/types/room/Room";
import { Factory } from "fishery";

export const roomItemFactory = Factory.define<RoomItem>(({ sequence }) => ({
	id: `room${sequence}`,
	name: `room #${sequence}`,
	color: RoomColor.BlueGrey,
	schoolId: `school${sequence}`,
	startDate: new Date().toISOString(),
	endDate: new Date().toISOString(),
	permissions: [],
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	features: [],
	allowedOperations: {
		accessRoom: false,
		viewContent: false,
		viewDraftContent: false,
	} as unknown as RoomItemResponseAllowedOperations,
	isLocked: false,
}));

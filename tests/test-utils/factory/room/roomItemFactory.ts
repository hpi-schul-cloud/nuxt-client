import { Factory } from "fishery";
import { RoomItem, RoomColor } from "@/types/room/Room";

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
	isLocked: false,
}));

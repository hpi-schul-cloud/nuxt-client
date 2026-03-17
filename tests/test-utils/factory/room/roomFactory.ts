import { RoomColor, RoomDetails } from "@/types/room/Room";
import { Factory } from "fishery";

export const roomFactory = Factory.define<RoomDetails>(({ sequence }) => ({
	id: `room${sequence}`,
	name: `room #${sequence}`,
	color: RoomColor.BLUE_GREY,
	schoolId: `school${sequence}`,
	startDate: new Date().toISOString(),
	endDate: new Date().toISOString(),
	permissions: [],
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	features: [],
}));

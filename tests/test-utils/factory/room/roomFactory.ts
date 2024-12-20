import { Factory } from "fishery";
import { RoomDetails, RoomColorEnum } from "@/types/room/Room";

export const roomFactory = Factory.define<RoomDetails>(({ sequence }) => ({
	id: `room${sequence}`,
	name: `room #${sequence}`,
	color: RoomColorEnum.BlueGrey,
	schoolId: `school${sequence}`,
	startDate: new Date().toISOString(),
	endDate: new Date().toISOString(),
	permissions: [],
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
}));

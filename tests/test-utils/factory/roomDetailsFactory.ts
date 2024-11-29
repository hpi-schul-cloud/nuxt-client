import { Factory } from "fishery";
import { RoomDetails } from "@/types/room/Room";
import { RoomColor } from "@/serverApi/v3";

export const roomDetailsFactory = Factory.define<RoomDetails>(
	({ sequence }) => ({
		id: `room${sequence}`,
		name: `room #${sequence}`,
		color: RoomColor.BlueGrey,
		startDate: new Date().toISOString(),
		endDate: new Date().toISOString(),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	})
);

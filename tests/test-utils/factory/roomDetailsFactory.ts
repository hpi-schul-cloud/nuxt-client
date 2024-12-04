import { Factory } from "fishery";
import { RoomDetails, RoomColorEnum } from "@/types/room/Room";

export const roomDetailsFactory = Factory.define<RoomDetails>(
	({ sequence }) => ({
		id: `room${sequence}`,
		name: `room #${sequence}`,
		color: RoomColorEnum.BlueGrey,
		startDate: new Date().toISOString(),
		endDate: new Date().toISOString(),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	})
);

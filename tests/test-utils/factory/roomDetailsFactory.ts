import { Factory } from "fishery";
import { RoomDetails, RoomColorEnum } from "@/types/room/Room";

export const roomDetailsFactory = Factory.define<RoomDetails>(
	({ sequence }) => ({
		id: `room${sequence}`,
		name: `room #${sequence}`,
		color: RoomColorEnum.BlueGrey,
		schoolId: "6749dd4e657d98af622e370c",
		startDate: new Date().toISOString(),
		endDate: new Date().toISOString(),
		permissions: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	})
);

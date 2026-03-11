import { ObjectIdMock } from "../../ObjectIdMock";
import { RoomColor, RoomItemResponse } from "@/serverApi/v3/api";
import { Factory } from "fishery";

export const roomItemResponseFactory = Factory.define<RoomItemResponse>(({ sequence }) => ({
	id: ObjectIdMock(),
	roomId: ObjectIdMock(),
	name: `Room #${sequence}`,
	color: RoomColor.Blue,
	schoolId: ObjectIdMock(),
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	isLocked: false,
}));

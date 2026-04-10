import { ObjectIdMock } from "../../ObjectIdMock";
import { RoomColor, RoomItemResponse } from "@api-server";
import { Factory } from "fishery";

export const roomItemResponseFactory = Factory.define<RoomItemResponse>(({ sequence }) => ({
	id: ObjectIdMock(),
	roomId: ObjectIdMock(),
	name: `Room #${sequence}`,
	color: RoomColor.BLUE,
	schoolId: ObjectIdMock(),
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	isLocked: false,
}));

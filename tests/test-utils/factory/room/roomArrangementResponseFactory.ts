import { RoomArrangementResponse, RoomGroupResponse } from "@api-server";
import { Factory } from "fishery";

export const roomGroupResponseFactory = Factory.define<RoomGroupResponse>(({ sequence }) => ({
	id: `${sequence}`.padStart(24, "a"),
	name: `Group ${sequence}`,
	collapsed: false,
	roomIds: [],
}));

export const roomArrangementResponseFactory = Factory.define<RoomArrangementResponse>(() => ({
	revision: 0,
	ungroupedRoomIds: [],
	groups: [],
	confirmGroupDeletion: true,
}));

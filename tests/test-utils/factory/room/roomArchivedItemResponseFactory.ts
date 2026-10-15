import { RoomArchivedItemResponse, RoomItemResponseAllowedOperations } from "@api-server";
import { Factory } from "fishery";

export const roomArchivedItemResponseFactory = Factory.define<RoomArchivedItemResponse>(({ sequence }) => ({
	id: `room${sequence}`,
	name: `Room #${sequence}`,
	ownerName: `Owner ${sequence}`,
	totalMembers: 1,
	archivedAt: new Date().toISOString(),
	schoolName: `School ${sequence}`,
	allowedOperations: {
		archiveRoom: false,
		deleteRoom: false,
	} as unknown as RoomItemResponseAllowedOperations,
}));

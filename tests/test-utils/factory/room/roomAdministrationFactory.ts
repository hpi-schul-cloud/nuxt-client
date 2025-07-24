import { RoomStatsListResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const roomAdministrationFactory = Factory.define<RoomStatsListResponse>(
	({ sequence }) => ({
		data: [
			{
				roomId: sequence.toString(),
				name: `Room ${sequence}`,
				owner: `Owner ${sequence}`,
				schoolName: `School ${sequence}`,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				totalMembers: 10,
				internalMembers: 5,
				externalMembers: 5,
			},
		],
		limit: 10,
		skip: 0,
		total: 1,
	})
);

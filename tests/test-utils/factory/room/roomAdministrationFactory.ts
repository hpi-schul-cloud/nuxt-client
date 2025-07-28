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
				totalMembers: (sequence * 3) as number,
				internalMembers: (sequence * 2 - 1) as number,
				externalMembers: (sequence - 1) as number,
			},
		],
		limit: 10,
		skip: 0,
		total: 1,
	})
);

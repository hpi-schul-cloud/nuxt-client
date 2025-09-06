import { RoomStatsItemResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const roomStatsItemResponseFactory =
	Factory.define<RoomStatsItemResponse>(({ sequence }) => {
		const internalMembers = sequence;
		const externalMembers = sequence + 1;

		return {
			roomId: sequence.toString(),
			name: `Room ${sequence}`,
			owner: `Owner ${sequence}`,
			schoolId: `school-id-${sequence}`,
			schoolName: `School-name-${sequence}`,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			totalMembers: internalMembers + externalMembers,
			internalMembers,
			externalMembers: externalMembers,
		};
	});

import { RoomStatsListResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { roomStatsItemResponseFactory } from "./roomStatsItemResponseFactory";

export const roomStatsListResponseFactory =
	Factory.define<RoomStatsListResponse>(({ params }) => {
		const data = params?.data ?? roomStatsItemResponseFactory.buildList(2);

		return {
			data,
			limit: 10,
			skip: 0,
			total: data.length,
		};
	});

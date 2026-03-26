import { roomStatsItemResponseFactory } from "./roomStatsItemResponseFactory";
import { RoomStatsListResponse } from "@api-server";
import { Factory } from "fishery";

export const roomStatsListResponseFactory = Factory.define<RoomStatsListResponse>(({ params }) => {
	const data = params?.data ?? roomStatsItemResponseFactory.buildList(2);

	return {
		data,
		limit: 10,
		skip: 0,
		total: data.length,
	};
});

import { TimestampsResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const timeStampResponse = Factory.define<TimestampsResponse>(
	({ sequence }) => ({
		lastUpdatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
	})
);

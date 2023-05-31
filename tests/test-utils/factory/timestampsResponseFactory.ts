import { Factory } from "fishery";
import { TimestampsResponse } from "@/serverApi/v3";

export const timestampsResponseFactory = Factory.define<TimestampsResponse>(
	() => ({
		lastUpdatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
	})
);

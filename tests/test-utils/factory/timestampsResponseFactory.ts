import { TimestampsResponse } from "@api-server";
import { Factory } from "fishery";

export const timestampsResponseFactory = Factory.define<TimestampsResponse>(() => ({
	lastUpdatedAt: new Date().toISOString(),
	createdAt: new Date().toISOString(),
}));

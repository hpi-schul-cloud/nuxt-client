import { Factory } from "fishery";
import { TimestampsResponse } from "@api-server";

export const timestampsResponseFactory = Factory.define<TimestampsResponse>(
	() => ({
		lastUpdatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
	})
);

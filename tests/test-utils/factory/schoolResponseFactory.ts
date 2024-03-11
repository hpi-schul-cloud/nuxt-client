import { SchoolResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { federalStateResponseFactory } from "./federalStateResponseFactory";
import { yearsResponseFactory } from "./yearsResponseFactory";

export const schoolResponseFactory = Factory.define<SchoolResponse>(
	({ sequence }) => ({
		id: `school-${sequence}`,
		name: `School${sequence}`,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		inMaintenance: false,
		isExternal: false,
		federalState: federalStateResponseFactory.build(),
		years: yearsResponseFactory.build(),
		features: [],
		instanceFeatures: [],
		systemIds: [],
	})
);

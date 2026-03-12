import { federalStateResponseFactory } from "./federalStateResponseFactory";
import { yearsResponseFactory } from "./yearsResponseFactory";
import { SchoolResponse } from "@api-server";
import { Factory } from "fishery";

export const schoolResponseFactory = Factory.define<SchoolResponse>(({ sequence }) => ({
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
}));

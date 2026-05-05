import { federalStateResponseFactory } from "@@/tests/test-utils/factory/federalStateResponseFactory";
import { yearsResponseFactory } from "@@/tests/test-utils/factory/yearsResponseFactory";
import { SchoolResponse } from "@api-server";
import { Factory } from "fishery";

export const schoolFactory = Factory.define<SchoolResponse>(({ sequence }) => ({
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
	logo: { dataUrl: "https://someUrl" },
	currentYear: {
		id: "",
		name: "",
		startDate: "",
		endDate: "",
		courseCreationInNextYear: false,
	},
}));

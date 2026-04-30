import { SchoolResponse } from "@api-server";

export const mockSchool: SchoolResponse = {
	id: "mockSchoolId",
	name: "",
	logo: {
		name: "",
		dataUrl: "//somelogourl",
	},
	fileStorageType: undefined,
	federalState: {
		id: "",
		counties: [],
		name: "",
		abbreviation: "",
		logoUrl: "",
	},
	county: {
		id: "",
		antaresKey: "",
		countyId: 0,
		name: "",
	},
	systemIds: [],
	updatedAt: "",
	createdAt: "",
	currentYear: {
		id: "",
		name: "",
		startDate: "",
		endDate: "",
		courseCreationInNextYear: false,
	},
	purpose: undefined,
	features: [],
	instanceFeatures: [],
	permissions: {},
	inMaintenance: false,
	inUserMigration: false,
	isExternal: false,
	years: {
		nextYear: {
			id: "",
			name: "",
			startDate: "",
			endDate: "",
			courseCreationInNextYear: false,
		},
		lastYear: {
			id: "",
			name: "",
			startDate: "",
			endDate: "",
			courseCreationInNextYear: false,
		},
		activeYear: {
			id: "",
			name: "",
			startDate: "",
			endDate: "",
			courseCreationInNextYear: false,
		},
		schoolYears: [
			{
				id: "",
				name: "",
				startDate: "",
				endDate: "",
				courseCreationInNextYear: false,
			},
		],
	},
};

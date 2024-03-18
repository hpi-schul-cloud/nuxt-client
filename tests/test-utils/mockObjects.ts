import { School } from "@/store/types/schools";

export const mockSchool: School = {
	id: "mockSchoolId",
	name: "",
	logo: {
		name: "",
		dataUrl: "",
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
	},
	purpose: undefined,
	features: [],
	featureObject: {
		rocketChat: false,
		videoconference: false,
		studentVisibility: false,
		ldapUniventionMigrationSchool: false,
		showOutdatedUsers: false,
		enableLdapSyncDuringMigration: false,
		nextcloud: false,
		oauthProvisioningEnabled: false,
	},
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
		},
		lastYear: {
			id: "",
			name: "",
			startDate: "",
			endDate: "",
		},
		activeYear: {
			id: "",
			name: "",
			startDate: "",
			endDate: "",
		},
		schoolYears: [
			{
				id: "",
				name: "",
				startDate: "",
				endDate: "",
			},
		],
	},
};

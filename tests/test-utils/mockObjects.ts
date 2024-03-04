import { MeResponse } from "@/serverApi/v3";
import { School } from "@/store/types/schools";

export const mockMe: MeResponse = {
	user: {
		id: "",
		firstName: "",
		lastName: "",
		customAvatarBackgroundColor: "",
	},
	school: {
		id: "",
		name: "",
		logo: {
			url: "",
			name: "",
		},
	},
	roles: [],
	permissions: [],
	language: "",
	account: {
		id: "",
	},
};

export const mockSchool: School = {
	id: "mockSchoolId",
	name: "",
	logo_name: "",
	fileStorageType: "",
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
	purpose: "",
	features: {
		rocketChat: false,
		videoconference: false,
		studentVisibility: false,
		ldapUniventionMigrationSchool: false,
		showOutdatedUsers: false,
		enableLdapSyncDuringMigration: false,
		isTeamCreationByStudentsEnabled: false,
		nextcloud: false,
		oauthProvisioningEnabled: false,
	},
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

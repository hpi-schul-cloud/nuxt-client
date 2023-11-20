import { User } from "@/store/types/auth";
import { School } from "@/store/types/schools";

export const mockUser: User = {
	_id: "",
	firstName: "",
	lastName: "",
	email: "",
	updatedAt: "",
	birthday: "",
	createdAt: "",
	preferences: {},
	schoolId: "",
	roles: [
		{
			_id: "",
			name: "test-role",
			updatedAt: "",
			createdAt: "",
			roles: [],
			permissions: [],
			displayName: "test-display-name",
			id: "",
		},
	],
	emailSearchValues: [],
	firstNameSearchValues: [],
	lastNameSearchValues: [],
	consent: {
		userConsent: {
			form: "",
			privacyConsent: true,
			termsOfUseConsent: true,
			dateOfPrivacyConsent: "",
			dateOfTermsOfUseConsent: "",
		},
	},
	forcePasswordChange: false,
	language: "",
	fullName: "",
	id: "",
	avatarInitials: "",
	avatarBackgroundColor: "",
	age: 44,
	displayName: "",
	permissions: ["test-permission"],
	accountId: "",
	schoolName: "",
	externallyManaged: false,
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
		antaresKey: "",
		id: "",
		countyId: "",
		name: "",
	},
	systems: [],
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
	documentBaseDir: "",
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
		defaultYear: {
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

import { User } from "@/store/types/auth";
import { School } from "@/store/types/schools";

export const mockUser: User = {
	_id: "",
	__v: 0,
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
			name: "",
			updatedAt: "",
			createdAt: "",
			roles: [],
			permissions: [],
			__v: 2,
			displayName: "",
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
	permissions: [],
	accountId: "",
	schoolName: "",
	externallyManaged: false,
};

export const mockSchool: School = {
	_id: "mockSchoolId",
	name: "",
	fileStorageType: "",
	federalState: "",
	county: {
		antaresKey: "",
		_id: "",
		countyId: "",
		name: "",
		id: "",
	},
	systems: [],
	updatedAt: "",
	createdAt: "",
	__v: 0,
	currentYear: "",
	purpose: "",
	features: {
		rocketChat: false,
		videoconference: false,
		studentVisibility: false,
		ldapUniventionMigrationSchool: false,
	},
	enableStudentTeamCreation: false,
	permissions: {},
	inMaintenance: false,
	inUserMigration: false,
	documentBaseDir: "",
	isExternal: false,
	id: "mockSchoolId",
	years: {},
	isTeamCreationByStudentsEnabled: false,
};

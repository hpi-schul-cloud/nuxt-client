export type Year = {
	_id: string;
	name: string;
	endDate: string;
	startDate: string;
};

export type County = {
	antaresKey: string;
	_id: string;
	countyId: string;
	name: string;
	id: string;
};

export type FederalState = {
	abbreviation: string;
	counties: County[];
	logoUrl: string;
	name: string;
	_id: string;
};

export type School = {
	_id: string;
	name: string;
	logo_name?: string;
	logo_dataUrl?: string;
	fileStorageType: string;
	federalState: string;
	county: County;
	systems: string[];
	updatedAt: string;
	createdAt: string;
	currentYear: Year;
	purpose: string;
	features: {
		rocketChat: boolean;
		videoconference: boolean;
		nextcloud: boolean;
		studentVisibility: boolean;
		ldapUniventionMigrationSchool: boolean;
		oauthProvisioningEnabled: boolean;
		showOutdatedUsers: boolean;
		enableLdapSyncDuringMigration: boolean;
	};
	enableStudentTeamCreation: boolean;
	permissions: unknown;
	inMaintenance: boolean;
	inUserMigration?: boolean;
	documentBaseDir: string;
	isExternal: boolean;
	id: string;
	officialSchoolNumber?: string;
	years: {
		schoolYears: Year[];
		activeYear: Year;
		defaultYear: Year;
		nextYear: Year;
		lastYear: Year;
	};
	language?: string;
	isTeamCreationByStudentsEnabled: boolean;
};

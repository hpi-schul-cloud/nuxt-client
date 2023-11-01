export type Year = {
	id: string;
	name: string;
	endDate: string;
	startDate: string;
	__v: number;
};

export type County = {
	id: string;
	antaresKey: string;
	countyId: string;
	name: string;
};

export type FederalState = {
	id: string;
	name: string;
	abbreviation: string;
	counties: County[];
	logoUrl: string;
	__v: number;
};

export type School = {
	id: string;
	name: string;
	fileStorageType: string;
	federalState: FederalState;
	county: County;
	systems: string[];
	updatedAt: string;
	createdAt: string;
	__v: number;
	currentYear: Year;
	purpose: string;
	features: {
		rocketChat: boolean;
		videoconference: boolean;
		studentVisibility: boolean;
		ldapUniventionMigrationSchool: boolean;
		showOutdatedUsers: boolean;
		enableLdapSyncDuringMigration: boolean;
		isTeamCreationByStudentsEnabled: boolean;
	};
	permissions: unknown;
	inMaintenance: boolean;
	inUserMigration?: boolean;
	documentBaseDir: string;
	isExternal: boolean;
	officialSchoolNumber?: string;
	years: unknown;
	language?: string;
};

export type OauthMigration = {
	enableMigrationStart: boolean;
	oauthMigrationPossible: boolean;
	oauthMigrationMandatory: boolean;
	oauthMigrationFinished?: string;
	oauthMigrationFinalFinish?: string;
};

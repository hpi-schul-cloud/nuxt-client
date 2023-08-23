export type Year = {
	_id: string;
	name: string;
	endDate: string;
	startDate: string;
	__v: number;
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
	__v: number;
	_id: string;
};

export type School = {
	_id: string;
	name: string;
	fileStorageType: string;
	federalState: string;
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
	};
	enableStudentTeamCreation: boolean;
	permissions: unknown;
	inMaintenance: boolean;
	inUserMigration?: boolean;
	documentBaseDir: string;
	isExternal: boolean;
	id: string;
	officialSchoolNumber?: string;
	years: unknown;
	language?: string;
	isTeamCreationByStudentsEnabled: boolean;
};

export type OauthMigration = {
	enableMigrationStart: boolean;
	oauthMigrationPossible: boolean;
	oauthMigrationMandatory: boolean;
	oauthMigrationFinished?: string;
	oauthMigrationFinalFinish?: string;
};

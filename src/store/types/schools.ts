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
	logo_name?: string;
	logo_dataUrl?: string;
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
		nextcloud: boolean;
		studentVisibility: boolean;
		ldapUniventionMigrationSchool: boolean;
		oauthProvisioningEnabled: boolean;
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
	years: {
		schoolYears: Year[];
		activeYear: Year;
		defaultYear: Year;
		nextYear: Year;
		lastYear: Year;
	};
	language?: string;
};

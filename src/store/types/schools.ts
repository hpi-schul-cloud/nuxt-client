export type Year = {
	id: string;
	name: string;
	endDate: string;
	startDate: string;
};

export type County = {
	id: string;
	antaresKey: string;
	countyId: number;
	name: string;
};

export type FederalState = {
	id: string;
	name: string;
	abbreviation: string;
	counties?: County[];
	logoUrl: string;
};

export type School = {
	id: string;
	name: string;
	logo_name?: string;
	logo_dataUrl?: string;
	fileStorageType?: string;
	federalState: FederalState;
	county?: County;
	systemIds: string[];
	updatedAt: string;
	createdAt: string;
	currentYear?: Year;
	purpose?: string;
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
	permissions?: unknown;
	inMaintenance?: boolean;
	inUserMigration?: boolean;
	isExternal: boolean;
	officialSchoolNumber?: string;
	years: {
		schoolYears: Year[];
		activeYear: Year;
		nextYear: Year;
		lastYear: Year;
	};
	language?: string;
};

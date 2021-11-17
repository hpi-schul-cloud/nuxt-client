export type Year = {
	_id: string;
	name: string;
	endDate: string;
	startDate: string;
	years: {};
	isTeamCreationByStudentsEnabled: boolean;
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
	currentYear: string;
	purpose: string;
	features: {
		rocketChat: boolean;
		videoconference: boolean;
		messenger: boolean;
		studentVisibility: boolean;
		messengerSchoolRoom: boolean;
		messengerStudentRoomCreate: boolean;
	};
	enableStudentTeamCreation: boolean;
	permissions: {};
	inMaintenance: boolean;
	documentBaseDir: string;
	isExternal: boolean;
	id: string;
	years: {};
	language?: string;
	isTeamCreationByStudentsEnabled: boolean;
};

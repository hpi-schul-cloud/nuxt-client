export enum SchoolExternalToolStatus {
	Latest = "Latest",
	Outdated = "Outdated",
	Unknown = "Unknown",
}

export interface SchoolExternalTool {
	id: string;
	name: string;
	status: SchoolExternalToolStatus;
	version: number;
}

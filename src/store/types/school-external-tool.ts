export enum SchoolExternalToolStatus {
	Latest,
	Outdated,
	Unknown,
}

export interface SchoolExternalTool {
	id: string,
	name: string,
	status: SchoolExternalToolStatus,
	version: number,
}

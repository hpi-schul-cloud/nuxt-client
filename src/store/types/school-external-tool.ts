export enum ExternalToolStatus {
	Latest,
	Outdated
}

export interface SchoolExternalTool {
	id: string,
	name: string,
	status: ExternalToolStatus,
}

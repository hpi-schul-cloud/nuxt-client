export enum ToolParameterType {
	String = "string",
	Number = "number",
	Boolean = "boolean",
	AutoContextid = "auto_contextid",
	AutoContextname = "auto_contextname",
	AutoSchoolid = "auto_schoolid",
	AutoSchoolnumber = "auto_schoolnumber",
	AutoMediumid = "auto_mediumid",
	AutoGroupExternaluuid = "auto_group_externaluuid",
	AutoPublisher = "auto_publisher",
}

export enum ToolParameterLocation {
	PATH = "path",
	BODY = "body",
	QUERY = "query",
	FRAGMENT = "fragment",
}

export enum ToolParameterScope {
	Global = "global",
	School = "school",
	Context = "context",
}

export interface ToolParameterEntry {
	name: string;
	value?: string;
}

export interface ToolParameter {
	name: string;
	displayName: string;
	description?: string;
	defaultValue?: string;
	regex?: string;
	regexComment?: string;
	scope: ToolParameterScope;
	location: ToolParameterLocation;
	type: ToolParameterType;
	isOptional: boolean;
	isProtected: boolean;
}

import { ToolParameter } from "./tool-parameter";

export interface ExternalToolConfigurationTemplate {
	externalToolId: string;

	name: string;

	logoUrl?: string;

	parameters: ToolParameter[];

	version: number;
}

export type SchoolExternalToolConfigurationTemplate =
	ExternalToolConfigurationTemplate;

export interface ContextExternalToolConfigurationTemplate
	extends SchoolExternalToolConfigurationTemplate {
	schoolExternalToolId: string;
}

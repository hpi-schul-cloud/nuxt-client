import { ToolParameter } from "./tool-parameter";

export interface ExternalToolConfigurationTemplate {
	externalToolId: string;

	name: string;

	logoUrl?: string;

	parameters: ToolParameter[];

	version: number;
}

export interface SchoolExternalToolConfigurationTemplate
	extends ExternalToolConfigurationTemplate {
	isDeactivated: boolean;
}

export interface ContextExternalToolConfigurationTemplate
	extends ExternalToolConfigurationTemplate {
	schoolExternalToolId: string;
}

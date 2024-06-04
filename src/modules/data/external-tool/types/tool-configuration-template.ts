import { ToolParameter } from "@/store/external-tool";

export interface ExternalToolConfigurationTemplate {
	externalToolId: string;

	name: string;

	logoUrl?: string;

	parameters: ToolParameter[];
}

export interface SchoolExternalToolConfigurationTemplate
	extends ExternalToolConfigurationTemplate {
	isDeactivated: boolean;
}

export interface ContextExternalToolConfigurationTemplate
	extends ExternalToolConfigurationTemplate {
	schoolExternalToolId: string;
}

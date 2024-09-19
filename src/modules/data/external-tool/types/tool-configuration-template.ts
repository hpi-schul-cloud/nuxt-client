import { ToolParameter } from "@/store/external-tool";
import { ToolContextType } from "@/serverApi/v3";

export interface ExternalToolConfigurationTemplate {
	externalToolId: string;

	name: string;

	baseUrl: string;

	logoUrl?: string;

	parameters: ToolParameter[];

	availableContexts: ToolContextType[];
}

export interface SchoolExternalToolConfigurationTemplate
	extends ExternalToolConfigurationTemplate {
	isDeactivated: boolean;
}

export interface ContextExternalToolConfigurationTemplate
	extends ExternalToolConfigurationTemplate {
	schoolExternalToolId: string;
}

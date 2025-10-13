import { ExternalToolMediumResponse } from "@/serverApi/v3";
import { ToolParameter } from "@/store/external-tool";

export interface ExternalToolConfigurationTemplate {
	externalToolId: string;

	name: string;

	baseUrl: string;

	logoUrl?: string;

	parameters: ToolParameter[];

	medium?: ExternalToolMediumResponse;
}

export interface SchoolExternalToolConfigurationTemplate extends ExternalToolConfigurationTemplate {
	isDeactivated: boolean;
}

export interface ContextExternalToolConfigurationTemplate extends ExternalToolConfigurationTemplate {
	schoolExternalToolId: string;
}

import { ToolParameter } from "@/store/external-tool";
import { ExternalToolMediumResponse } from "@api-server";

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

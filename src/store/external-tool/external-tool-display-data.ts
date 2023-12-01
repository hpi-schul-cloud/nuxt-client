import { ToolConfigurationStatus } from "./tool-configuration-status";

export type ExternalToolDisplayData = {
	contextExternalToolId: string;

	name: string;

	logoUrl?: string;

	openInNewTab: boolean;

	status: ToolConfigurationStatus;
};

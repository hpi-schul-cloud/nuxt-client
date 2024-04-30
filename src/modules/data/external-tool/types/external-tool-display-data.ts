import { ContextExternalToolConfigurationStatus } from "./context-external-tool-configuration-status";

export type ExternalToolDisplayData = {
	contextExternalToolId: string;

	name: string;

	description?: string;

	logoUrl?: string;

	openInNewTab: boolean;

	status: ContextExternalToolConfigurationStatus;
};

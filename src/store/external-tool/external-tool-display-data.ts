import { ToolConfigurationStatus } from "@/store/external-tool/tool-configuration-status.enum";

export type ExternalToolDisplayData = {
	contextExternalToolId: string;

	name: string;

	logoUrl?: string;

	openInNewTab: boolean;

	status: ToolConfigurationStatus;
};

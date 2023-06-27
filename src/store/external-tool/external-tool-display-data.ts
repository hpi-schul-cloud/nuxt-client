import { ToolConfigurationStatus } from "@/store/external-tool/tool-configuration-status.enum";

export type ExternalToolDisplayData = {
	id: string;
	name: string;
	logoUrl?: string | null;
	openInNewTab: boolean;
	status: ToolConfigurationStatus;
};

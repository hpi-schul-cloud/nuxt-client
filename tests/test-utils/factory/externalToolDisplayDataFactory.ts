import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { Factory } from "fishery";
import { ToolConfigurationStatus } from "@/store/external-tool";

export const externalToolDisplayDataFactory =
	Factory.define<ExternalToolDisplayData>(({ sequence }) => ({
		id: `schoolExternalTool${sequence}`,
		name: "name",
		openInNewTab: false,
		status: ToolConfigurationStatus.Latest,
	}));

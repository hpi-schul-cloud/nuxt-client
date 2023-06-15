import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { Factory } from "fishery";

export const externalToolDisplayDataFactory =
	Factory.define<ExternalToolDisplayData>(({ sequence }) => ({
		id: `schoolExternalTool${sequence}`,
		name: "name",
		openInNewTab: false,
	}));

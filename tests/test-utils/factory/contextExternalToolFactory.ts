import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import { Factory } from "fishery";

export const contextExternalToolFactory = Factory.define<ContextExternalTool>(
	({ sequence }) => ({
		id: `schoolExternalTool${sequence}`,
		name: "name",
		openInNewTab: false,
	})
);

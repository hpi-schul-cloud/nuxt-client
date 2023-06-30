import { Factory } from "fishery";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import { ContextExternalToolResponseContextTypeEnum } from "@/serverApi/v3";

export const contextExternalToolFactory = Factory.define<ContextExternalTool>(
	({ sequence }) => ({
		id: "id",
		schoolToolId: "schoolToolId",
		contextId: "contextId",
		contextType: ContextExternalToolResponseContextTypeEnum.Course,
		parameters: [],
		toolVersion: 1,
	})
);

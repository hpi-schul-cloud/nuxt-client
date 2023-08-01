import { ToolParameterEntry } from "@/store/external-tool";
import { Factory } from "fishery";

export const toolParameterEntryFactory = Factory.define<ToolParameterEntry>(
	({ sequence }) => ({
		name: `parameter${sequence}`,
	})
);

import { Factory } from "fishery";
import { ToolConfigurationListItem } from "@/store/external-tool";

export const toolConfigurationFactory =
	Factory.define<ToolConfigurationListItem>(({ sequence }) => ({
		id: `toolConfigurationListItem${sequence}`,
		name: "name",
		logoUrl: "logoUrl",
	}));

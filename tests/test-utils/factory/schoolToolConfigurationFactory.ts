import { Factory } from "fishery";
import { SchoolToolConfigurationListItem } from "@/store/external-tool";

export const schoolToolConfigurationFactory =
	Factory.define<SchoolToolConfigurationListItem>(({ sequence }) => ({
		id: `toolConfigurationListItem${sequence}`,
		name: "name",
		logoUrl: "logoUrl",
		schoolToolId: "schoolToolId",
	}));

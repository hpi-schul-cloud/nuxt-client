import { Factory } from "fishery";
import { ContextExternalToolTemplateListItem } from "@/store/external-tool";

export const contextExternalToolTemplateListItemFactory =
	Factory.define<ContextExternalToolTemplateListItem>(({ sequence }) => ({
		id: `toolConfigurationListItem${sequence}`,
		name: "name",
		logoUrl: "logoUrl",
		schoolToolId: "schoolToolId",
	}));

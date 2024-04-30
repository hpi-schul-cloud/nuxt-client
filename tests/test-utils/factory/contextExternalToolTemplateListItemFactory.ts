import { ContextExternalToolTemplateListItem } from "@data-external-tool";
import { Factory } from "fishery";

export const contextExternalToolTemplateListItemFactory =
	Factory.define<ContextExternalToolTemplateListItem>(({ sequence }) => ({
		id: `toolConfigurationListItem${sequence}`,
		name: "name",
		logoUrl: "logoUrl",
		schoolToolId: "schoolToolId",
	}));

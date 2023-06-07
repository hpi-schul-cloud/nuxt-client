import { Factory } from "fishery";
import { SchoolToolConfigurationTemplate } from "@/store/external-tool/school-tool-configuration-template";

export const schoolToolConfigurationTemplateFactory =
	Factory.define<SchoolToolConfigurationTemplate>(({ sequence }) => ({
		id: `tool${sequence}`,
		version: 1,
		name: "toolName",
		parameters: [],
		schoolToolId: "tool1",
	}));

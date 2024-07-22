import { SchoolExternalToolConfigurationTemplateResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const schoolExternalToolConfigurationTemplateResponseFactory =
	Factory.define<SchoolExternalToolConfigurationTemplateResponse>(
		({ sequence }) => ({
			externalToolId: `tool-${sequence}`,
			name: `SchoolExternalTool${sequence}`,
			baseUrl: `https://school-external-tool-${sequence}.com`,
			parameters: [],
		})
	);

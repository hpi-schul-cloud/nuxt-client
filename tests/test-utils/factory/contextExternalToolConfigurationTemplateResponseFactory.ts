import { ContextExternalToolConfigurationTemplateResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const contextExternalToolConfigurationTemplateResponseFactory =
	Factory.define<ContextExternalToolConfigurationTemplateResponse>(
		({ sequence }) => ({
			externalToolId: `external-tool-${sequence}`,
			schoolExternalToolId: `school-external-tool-${sequence}`,
			name: `SchoolExternalTool${sequence}`,
			parameters: [],
		})
	);

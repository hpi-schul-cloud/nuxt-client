import { MediaAvailableLineElementResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const mediaAvailableLineElementResponseFactory =
	Factory.define<MediaAvailableLineElementResponse>(({ sequence }) => ({
		name: `tool-${sequence}`,
		schoolExternalToolId: `school-external-tool-${sequence}`,
		description: "description",
		logoUrl: "https://logourl.de",
	}));

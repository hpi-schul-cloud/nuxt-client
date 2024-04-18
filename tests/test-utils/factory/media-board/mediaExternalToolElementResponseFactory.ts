import { MediaExternalToolElementResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "../timestampsResponseFactory";

export const mediaExternalToolElementResponseFactory =
	Factory.define<MediaExternalToolElementResponse>(({ sequence }) => ({
		id: `media-line-${sequence}`,
		timestamps: timestampsResponseFactory.build(),
		content: {
			contextExternalToolId: `context-external-tool-${sequence}`,
		},
	}));

import { timestampsResponseFactory } from "../timestampsResponseFactory";
import { MediaExternalToolElementResponse } from "@api-server";
import { Factory } from "fishery";

export const mediaExternalToolElementResponseFactory = Factory.define<MediaExternalToolElementResponse>(
	({ sequence }) => ({
		id: `media-line-${sequence}`,
		timestamps: timestampsResponseFactory.build(),
		content: {
			contextExternalToolId: `context-external-tool-${sequence}`,
		},
	})
);

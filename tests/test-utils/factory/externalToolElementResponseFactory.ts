import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { ContentElementType, ExternalToolElementResponse } from "@api-server";
import { Factory } from "fishery";

export const externalToolElementResponseFactory = Factory.define<ExternalToolElementResponse>(({ sequence }) => ({
	id: `external-tool-element-response-${sequence}`,
	type: ContentElementType.EXTERNAL_TOOL,
	content: {
		contextExternalToolId: null,
	},
	timestamps: timestampsResponseFactory.build(),
}));

import {
	ContentElementType,
	ExternalToolElementResponse,
} from "@/serverApi/v3";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "./timestampsResponseFactory";

export const externalToolElementResponseFactory =
	Factory.define<ExternalToolElementResponse>(({ sequence }) => ({
		id: `external-tool-element-response-${sequence}`,
		type: ContentElementType.EXTERNAL_TOOL,
		content: {
			contextExternalToolId: null,
		},
		timestamps: timestampsResponseFactory.build(),
	}));

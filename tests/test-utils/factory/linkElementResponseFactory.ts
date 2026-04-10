import { linkElementContentFactory } from "./linkElementContentFactory";
import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { ContentElementType, LinkElementResponse } from "@api-server";
import { Factory } from "fishery";

export const linkElementResponseFactory = Factory.define<LinkElementResponse>(({ sequence }) => ({
	id: `fileElementResponse${sequence}`,
	type: ContentElementType.LINK,
	content: linkElementContentFactory.build(),
	timestamps: timestampsResponseFactory.build(),
}));

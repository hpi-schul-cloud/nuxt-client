import { Factory } from "fishery";
import { ContentElementType, LinkElementResponse } from "@/serverApi/v3";
import { linkElementContentFactory } from "./linkElementContentFactory";
import { timestampsResponseFactory } from "./timestampsResponseFactory";

export const linkElementResponseFactory = Factory.define<LinkElementResponse>(
	({ sequence }) => ({
		id: `fileElementResponse${sequence}`,
		type: ContentElementType.Link,
		content: linkElementContentFactory.build(),
		timestamps: timestampsResponseFactory.build(),
	})
);

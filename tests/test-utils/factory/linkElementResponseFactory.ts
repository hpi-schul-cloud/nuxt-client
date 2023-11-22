import { Factory } from "fishery";
import { ContentElementType, LinkElementResponse } from "@/serverApi/v3";
import { linkElementContentFactory } from "@@/tests/test-utils/factory/linkElementContentFactory";
import { timestampsResponseFactory } from "@@/tests/test-utils";

export const linkElementResponseFactory = Factory.define<LinkElementResponse>(
	({ sequence }) => ({
		id: `fileElementResponse${sequence}`,
		type: ContentElementType.Link,
		content: linkElementContentFactory.build(),
		timestamps: timestampsResponseFactory.build(),
	})
);

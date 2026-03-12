import { richTextElementContentFactory } from "./richTextElementContentFactory";
import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { ContentElementType, RichTextElementResponse } from "@api-server";
import { Factory } from "fishery";

export const richTextElementResponseFactory = Factory.define<RichTextElementResponse>(({ sequence }) => ({
	id: `richTextElementResponse${sequence}`,
	type: ContentElementType.RICH_TEXT,
	content: richTextElementContentFactory.build(),
	timestamps: timestampsResponseFactory.build(),
}));

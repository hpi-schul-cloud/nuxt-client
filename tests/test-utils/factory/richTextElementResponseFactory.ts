import { Factory } from "fishery";
import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { richTextElementContentFactory } from "./richTextElementContentFactory";

export const richTextElementResponseFactory =
	Factory.define<RichTextElementResponse>(({ sequence }) => ({
		id: `richTextElementResponse${sequence}`,
		type: ContentElementType.RichText,
		content: richTextElementContentFactory.build(),
		timestamps: timestampsResponseFactory.build(),
	}));

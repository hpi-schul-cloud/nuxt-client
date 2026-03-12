import { Factory } from "fishery";
import { RichTextElementContent } from "@api-server";

export const richTextElementContentFactory =
	Factory.define<RichTextElementContent>(({ sequence }) => ({
		text: `text${sequence}`,
		inputFormat: "richTextCk5",
	}));

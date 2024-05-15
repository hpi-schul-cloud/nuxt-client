import { Factory } from "fishery";
import { RichTextElementContent } from "@/serverApi/v3";

export const richTextElementContentFactory =
	Factory.define<RichTextElementContent>(({ sequence }) => ({
		text: `text${sequence}`,
		inputFormat: "richTextCk5",
	}));

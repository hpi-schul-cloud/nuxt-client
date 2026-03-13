import { RichTextElementContent } from "@api-server";
import { Factory } from "fishery";

export const richTextElementContentFactory = Factory.define<RichTextElementContent>(({ sequence }) => ({
	text: `text${sequence}`,
	inputFormat: "richTextCk5",
}));

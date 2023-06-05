import { FileElementContent } from "@/serverApi/v3";
import { Factory } from "fishery";

export const fileElementContent = Factory.define<FileElementContent>(
	({ sequence }) => ({
		caption: "caption",
	})
);

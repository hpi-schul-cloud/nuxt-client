import { ContentElementType, FileElementResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { timeStampResponse } from "./timeStampResponseFactory";
import { fileElementContent } from "./fileElementContentFactory";

export const fileElementResponse = Factory.define<FileElementResponse>(
	({ sequence }) => ({
		id: `fileElementResponse${sequence}`,
		name: "name",
		type: ContentElementType.File,
		timestamps: timeStampResponse.build(),
		content: fileElementContent.build(),
	})
);

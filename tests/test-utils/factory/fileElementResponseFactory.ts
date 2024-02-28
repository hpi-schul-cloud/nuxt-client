import { ContentElementType, FileElementResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { fileElementContent } from "./fileElementContentFactory";
import { timestampsResponseFactory } from "./timestampsResponseFactory";

export const fileElementResponseFactory = Factory.define<FileElementResponse>(
	({ sequence }) => ({
		id: `fileElementResponse${sequence}`,
		type: ContentElementType.File,
		timestamps: timestampsResponseFactory.build(),
		content: fileElementContent.build(),
	})
);

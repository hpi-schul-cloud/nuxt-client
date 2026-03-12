import { ContentElementType, FileElementResponse } from "@api-server";
import { Factory } from "fishery";
import { fileElementContent } from "./fileElementContentFactory";
import { timestampsResponseFactory } from "./timestampsResponseFactory";

export const fileElementResponseFactory = Factory.define<FileElementResponse>(
	({ sequence }) => ({
		id: `fileElementResponse${sequence}`,
		type: ContentElementType.FILE,
		timestamps: timestampsResponseFactory.build(),
		content: fileElementContent.build(),
	})
);

import { ContentElementType, FileElementResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { fileElementContent } from "./fileElementContentFactory";
import { timestampsResponseFactory } from "@@/tests/test-utils/factory";

export const fileElementResponse = Factory.define<FileElementResponse>(
	({ sequence }) => ({
		id: `fileElementResponse${sequence}`,
		name: "name",
		type: ContentElementType.File,
		timestamps: timestampsResponseFactory.build(),
		content: fileElementContent.build(),
	})
);

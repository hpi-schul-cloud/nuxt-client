import { ContentElementType, H5pElementResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "./timestampsResponseFactory";

export const h5pElementResponseFactory = Factory.define<H5pElementResponse>(
	({ sequence }) => ({
		id: `h5p-element-response-${sequence}`,
		type: ContentElementType.H5p,
		content: {
			contentId: null,
		},
		timestamps: timestampsResponseFactory.build(),
	})
);

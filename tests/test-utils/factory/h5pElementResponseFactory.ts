import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { ContentElementType, H5pElementResponse } from "@api-server";
import { Factory } from "fishery";

export const h5pElementResponseFactory = Factory.define<H5pElementResponse>(({ sequence }) => ({
	id: `h5p-element-response-${sequence}`,
	type: ContentElementType.H5P,
	content: {
		contentId: null,
	},
	timestamps: timestampsResponseFactory.build(),
}));

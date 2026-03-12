import { Factory } from "fishery";
import { LtiDeepLinkResponse } from "@api-server";

export const ltiDeepLinkResponseFactory = Factory.define<LtiDeepLinkResponse>(
	() => ({
		mediaType: "mediaType",
	})
);

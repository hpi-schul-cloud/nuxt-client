import { LtiDeepLinkResponse } from "@api-server";
import { Factory } from "fishery";

export const ltiDeepLinkResponseFactory = Factory.define<LtiDeepLinkResponse>(() => ({
	mediaType: "mediaType",
}));
